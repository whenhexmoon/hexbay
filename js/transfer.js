var BN = web3.BigNumber;

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
	// Transfer button click event listener
	document.getElementById('btnTransfer').addEventListener("click", function() {
		let receiver = document.getElementById('inputTransferAddress').value;
		let stakeId = selectedStake.stakeId;
		stakeTransfer(stakeId, receiver);
	});
	
	// Event listener
	initTransferEvents();
}

function update() {		
	// HEX
	getDailyData();
	
	// Bay
	getStakeCount(currentAccount);
}

function resetData() {
	toggleConnectBox();
	
	// reset table size
	$('#stakeTable').removeClass("table-sm");
	
	// reset stake entries
	$("#stakeTable > tbody").empty();
}

function callbackEventStakeTransferred(stakeId, from, to) {
	from = from.toLowerCase();
	to = to.toLowerCase();
	
	// user has transferred a stake
	if (from === currentAccount.toLowerCase()) {
		// remove stake from table
		let key = stakeId.toNumber().valueOf();
		let stake = stakeMap.get(key);
		
		if (stake) {
			removeStakeFromTable(stake);
			stakeMap.delete(key);
		}
		
		// remove button spinner
		hideSpinner('#spinBtnTransfer');
		
	// user has got transferred a stake
	} else if (to === currentAccount.toLowerCase()) {
		// add stake to table
		getStakeData(stakeId, 1);
	}
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
		
		// highlight selected button
		highligthButton($(this));
	});
}

function getStakeCount(address) {
	bayContract.stakeCount(address, function(error, result) {
		if(!error) {
			var amount = result;
			console.log("Amount of Bay stakes: " + result);
		} else {
			console.log(error);
		}
	});
}

function getStakeList(address) {
	bayContract.stakeList(address, function(error, result) {
		if(!error) {
			let stakes = result;
			console.log("List of stakes: " + stakes);
			
			// smaller the table
			changeTableSize(stakes.length);
			
			// call stake data
			for (let i = 0; i < stakes.length; i++) {
				getStakeData(stakes[i].toNumber().valueOf(), stakes.length);
			}
		} else {
			console.log(error);
		}
	});
}

function getDailyData() {
	hexContract.currentDay(function (error, result) {
		if (!error) {
			currentDay = result;
			let days = currentDay.toNumber();
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
						getStakeList(currentAccount);
					}
				});
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
		// this is one of the users stake		
		if(!error && result[0].toLowerCase() === currentAccount.toLowerCase()) {
			let stake = new Stake();
			stake.stakeOwner = result[0];
			stake.stakeIndexUser = result[1].toNumber();
			stake.stakeIndexContract = result[2].toNumber();
			stake.stakeTransferred = result[3];
			stake.stakeIndexTrade = result[4].toNumber();
			stake.stakePrice = result[5];
			stake.isForSale = result[6];
			stakeMap.set(id, stake);
			
			getHexStakeData(stake.stakeIndexContract, bayAddress, amount);
			//
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
			hexStakeDataCount = 0;
		}
	});
}

function addStakeToTable(stake) {
	var start = stake.lockedDay.add(1);
	var end = stake.stakedDays.add(start);
	var progress = (currentDay.add(2).sub(start)).div(end);
	var progNumber = numeral(progress.toNumber())
	var progFormat = formatPercentage(progNumber);
	
	var principal = stake.stakedHearts.div(10 ** 8);
	var principalNumber = numeral(principal.toNumber());
	var principalFormat = formatHex(principalNumber);
	
	var tshares = stake.stakeShares.div(10 ** 12);
	var tsharesNumber = numeral(tshares.toNumber());
	var tsharesFormat = formatShares(tsharesNumber);
	
	var interest = stake.interest;
	var interestNumber = numeral(interest.toNumber());
	var interestFormat = formatHex(interestNumber);
	
	var currentValNumber = numeral(principal.add(interest).toNumber());
	var currentValFormat = formatHex(currentValNumber);
	
	var stakeId = stake.stakeId;
	var button = '<button type="button" value="' + stakeId + '" class="btn btn-sm text-uppercase" style="background-color: #6c757d; color: white; padding-top: 1px; padding-bottom: 1px;">Select</button>';
	//var button = 'Button';
	
	$('#stakeTable').append(
		'<tr>' +
		'<td class="align-middle">' + start + '</td>' +
		'<td class="align-middle">' + end + '</td>' +
		'<td class="align-middle">' + progFormat + '</td>' +
		'<td class="align-middle">' + principalFormat + ' HEX' + '</td>' +
		'<td class="align-middle">' + tsharesFormat + '</td>' +
		'<td class="align-middle">' + interestFormat + ' HEX' + '</td>' +
		'<td class="align-middle">' + currentValFormat + ' HEX' + '</td>' +
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