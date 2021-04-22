var BN = web3.BigNumber;

var BASE_HEARTS = new BN(10 ** 8);
var BASE_TSHARES = new BN(10 ** 12);

const stakeMap = new Map();	// key: stakeId
let selectedStake = null;
let currentDay = new BN(0);
let dailyData = new Array(0);	// dayPayoutTotal, dayStakeSharesTotal, dayUnclaimedSatoshisTotal

// global counters for synchronization
let hexStakeDataCount = 0;


// hexContract, bayContract available
window.addEventListener('load', (event) => {	
	console.log('page is fully loaded');
	console.log("Your address: " + currentAccount);
	
	init();
});

function init() {	
	// Buy button click listener
	document.getElementById('btnBuy').addEventListener("click", function() {
		console.log("Buy Button clicked");
		let stakeId = selectedStake.stakeId;
		let priceInput = document.getElementById('inputHexPrice').value;
		let priceHearts = priceInput * (10 ** 8);	// HEX to Hearts; decimals 8
		stakeBuy(stakeId, priceHearts);
	});
	
	// Approve button click event listener
	document.getElementById('btnApprove').addEventListener("click", function() {
		var maxValue = "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
		var amount = maxValue;
		console.log("Approving HEX: " + amount);
		approve(bayAddress, amount);
	});
	
	// Event listener
	initBayEvents();
}

function update() {
	// HEX
	getDailyData();
	//getHexStakes();
}

function resetData() {
	toggleConnectBox();
	
	// Stop event listener
	//stopEventSale();
	
	// reset table size
	$('#stakeTable').removeClass("table-sm");
	
	// reset stake entries
	$("#stakeTable > tbody").empty();
}

/*******************************
 * EVENT CALLBACKS
 ******************************/

function callbackEventForSale(stakeId, stakedHearts, stakeShares, lockedDay, stakedDays, unlockedDay, seller, priceHearts) {
	// add missing attributes to stake
	let stake = new Stake();
	stake.stakeId = stakeId;
	stake.stakedHearts = stakedHearts;
	stake.stakeShares = stakeShares;
	stake.lockedDay = lockedDay;
	stake.stakedDays = stakedDays;
	stake.unlockedDay = unlockedDay;
	stake.stakeOwner = seller;
	stake.stakePrice = priceHearts;
	stake.isForSale = true;	
	stakeMap.set(stakeId.toNumber(), stake);
	
	// add stake to table
	addStakeToTable(stake);
	let selector = ':button[value="' + stake.stakeId + '"]';
	addButtonClickListener(selector);
}

function callbackEventBuy(stakeId, stakedHearts, stakeShares, lockedDay, stakedDays, unlockedDay, seller, buyer, priceHearts) {
	// add missing attributes to stake
	let stake = stakeMap.get(stakeId.toNumber());
	stake.stakePrice = new BN(0);
	stake.isForSale = false;
	
	// current user has bought this stake
	if (buyer === currentAccount) {
		hideSpinner('#spinBtnBuy');
	}
	
	// remove stake from table
	removeStakeFromTable(stake);
}

function callbackEventRevoke(stakeId, owner) {
	// add missing attributes to stake
	let stake = stakeMap.get(stakeId.toNumber());
	stake.stakePrice = new BN(0);
	stake.isForSale = false;
	
	// remove stake from table
	removeStakeFromTable(stake);
}

function callbackEventPriceChanged(stakeId, newPrice, owner) {
	// add missing attributes to stake
	let stake = stakeMap.get(stakeId.toNumber());
	stake.stakePrice = newPrice;
	
	changeTableRowPrice(stake);
}

function addButtonClickListener(selector) {
	$(selector).click(function() {
		// reset highlighted button
		if (selectedStake) {
			let selector = ':button[value="' + selectedStake.stakeId + '"]';
			resetHighligthButton(selector);
		}
		
		let stakeId = parseInt(this.value);
		console.log("Button clicked: " + stakeId);
		selectedStake = stakeMap.get(stakeId);
		
		// change input data
		changePriceInputData();
		
		// highlight selected button
		highligthButton($(this));
	});
}

// CONTRACT INTERACTION

function getDailyData() {
	hexContract.currentDay(function (error, result) {
		if (!error) {
			currentDay = result;
			let days = currentDay;
			let count = 0;
			dailyData = new Array(days);
			console.log("days: " + days);
			
			for (let i = 0; i < days; i++) {
				hexContract.dailyData(i, function(error, result) {
					count++;
					var dayPayoutTotal, dayStakeSharesTotal, dayUnclaimedSatoshisTotal;
					
					if (!error) {
						dayPayoutTotal = result[0];
						dayStakeSharesTotal = result[1];
						dayUnclaimedSatoshisTotal = result[2];
					} else {
						console.log(error);
						dayPayoutTotal = new BN(0);
						dayStakeSharesTotal = new BN(0);
						dayUnclaimedSatoshisTotal = new BN(0);
					}
					
					dailyData[i] = {dayPayoutTotal, dayStakeSharesTotal, dayUnclaimedSatoshisTotal};
					
					// last day fetched
					if (count == days) {
						getStakesForSaleList();
					}
				});
			}			
		} else {
			console.log(error);
		}
	});
}

function getStakesForSaleList() {
	bayContract.getSalesList(function(error, result) {
		if (!error) {
			// result is a list of big number stake ids
			let stakes = result;
			console.log("List of stakes: " + stakes);
			
			// smaller the table
			changeTableSize(stakes.length);
			
			// call stake data
			for (let i = 0; i < stakes.length; i++) {
				getStakeData(stakes[i], stakes.length);
			}
		} else {
			console.log(error);
		}
	});
}

/* 
 * // Basic
 * result[0] = address stakeOwner;             // owner address, used to dereferenciate any stake id
 * result[1] = uint256 stakeIndexUser;         // stake position of 'stakeListIds'
 * result[2] = uint256 stakeIndexContract;     // stake position of HEX
 * // Trading
 * result[3] = uint256 stakeIndexTrade;        // stake position if stake is for sale
 * result[4] = uint256 stakePrice;             // price for this stake when selling
 * result[5] = bool isForSale;                 // state if stake is for sale or not
 */
function getStakeData(id, amount) {	
	bayContract.stakeData(id, function(error, result) {
		if(!error) {
			let stake = new Stake();
			stake.stakeOwner = result[0];
			stake.stakeIndexUser = result[1].toNumber();
			stake.stakeIndexContract = result[2].toNumber();
			stake.stakeTransferred = result[3];
			stake.isForSale = result[4];
			stake.stakeIndexTrade = result[5].toNumber();
			stake.stakePrice = result[6];
			stakeMap.set(id.toNumber(), stake);
			
			getHexStakeData(stake.stakeIndexContract, bayAddress, amount);
		} else {
			console.log(error);
		}
	});
}

/* 
 * result[0] = uint40 stakeId;
 * result[1] = uint72 stakedHearts;
 * result[2] = uint72 stakeShares;
 * result[3] = uint16 lockedDay;
 * result[4] = uint16 stakedDays;
 * result[5] = uint16 unlockedDay;
 * result[6] = bool isAutoStake;
 */
function getHexStakeData(index, staker, amount) {
	hexContract.stakeLists(staker, index, function(error, result) {
		hexStakeDataCount++;
		
		if(!error) {
			let stakeId = result[0].toNumber();
			let stake = stakeMap.get(stakeId);
			// if stake does not exist in map creat one
			if (stake == undefined) {
				stake = new Stake();
				stakeMap.set(stakeId, stake);
			}				
			
			stake.stakeId = stakeId;
			stake.stakedHearts = result[1];
			stake.stakeShares = result[2];
			stake.lockedDay = result[3];
			stake.stakedDays = result[4];
			stake.unlockedDay = result[5];
			stake.isAutoStake = result[6];
			stake.interest = calcInterest(stake);
			
			addStakeToTable(stake);
			
			// add button click listener
			let selector = ':button[value="' + stake.stakeId + '"]';
			addButtonClickListener(selector);
		} else {
			console.log(error);
		}
		
		// all stakes retrieved, generate overall stats
		if (hexStakeDataCount == amount) {
			console.log("All stakes retrieved: " + amount);
		}
	});
}

function changePriceInputData() {
	let price = selectedStake.stakePrice.div(BASE_HEARTS);
	document.getElementById('inputHexPrice').value = price;
}

function changeTableRowPrice(stake) {
	let selector = ':button[value="' + stake.stakeId + '"]';
	let price = stake.stakePrice.div(BASE_HEARTS);
	let priceNumber = numeral(price.toNumber());
	let priceFormat = formatHex(priceNumber);
	
	// get table row and cells
	let rowIndex = $(selector).closest('tr')[0].rowIndex;
	let cellPrice = $('#stakeForSaleTable')[0].rows[rowIndex].cells[5];
	cellPrice.innerHTML = priceFormat + ' HEX';
}

function addStakeToTable(stake) {
	var start = stake.lockedDay.add(new BN(1));
	var end = stake.stakedDays.add(start);
	var progress = (currentDay.add(new BN(2)).sub(start)).div(end);
	var progNumber = numeral(progress.toNumber())
	var progFormat = formatPercentage(progNumber);
	
	var ownerFormat = formatOwner(stake);
	
	var principal = stake.stakedHearts.div(BASE_HEARTS);
	var principalNumber = numeral(principal.toNumber());
	var principalFormat = formatHex(principalNumber);
	
	var tshares = stake.stakeShares.div(BASE_TSHARES);
	var tsharesNumber = numeral(tshares.toNumber());
	var tsharesFormat = formatShares(tsharesNumber);
	
	var interest = stake.interest;
	var interestNumber = numeral(interest.toNumber());
	var interestFormat = formatHex(interestNumber);
	
	var currentValNumber = numeral(principal.add(interest).toNumber());
	var currentValFormat = formatHex(currentValNumber);
	
	var price = stake.stakePrice.div(BASE_HEARTS);
	var priceNumber = numeral(price.toNumber());
	var priceFormat = formatHex(priceNumber);
	
	var stakeId = stake.stakeId;
	var button = '<button type="button" value="' + stakeId + '" class="btn btn-sm text-uppercase" style="background-color: #6c757d; color: white; padding-top: 1px; padding-bottom: 1px;">Select</button>';
	//var button = 'Button';
	
	$('#stakeTable').append(
		'<tr>' +
		'<td class="align-middle">' + end + '</td>' +
		'<td class="align-middle">' + progFormat + '</td>' +
		'<td class="align-middle">' + ownerFormat + '</td>' +
		'<td class="align-middle">' + tsharesFormat + '</td>' +
		'<td class="align-middle">' + currentValFormat + ' HEX' + '</td>' +
		'<td class="align-middle">' + priceFormat + ' HEX' + '</td>' +
		'<td>' + button + '</td>' +
		'</tr>'
	);
}

function removeStakeFromTable(stake) {
	let selector = ':button[value="' + stake.stakeId + '"]';
	
	// remove Stake from sellable stakes table
	$(selector).closest('tr').remove();
}

function changeTableSize(amount) {
	// smaller the table
	if (amount > 10) {
		$('#stakeTable').addClass("table-sm");
	} else {
		$('#stakeTable').removeClass("table-sm");
	}
}