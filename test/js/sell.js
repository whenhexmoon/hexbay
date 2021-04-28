var BN = web3.BigNumber;

const stakeMap = new Map();	// key: stakeId
let selectedStake = null;
let currentDay = new BN(0);
let dailyData = new Array(0);	// dayPayoutTotal, dayStakeSharesTotal, dayUnclaimedSatoshisTotal
let dailyDataRange = null;
let actionFrameTime = new Date();

// global counters for synchronization
let hexStakeDataCount = 0;


// hexContract, bayContract available
window.addEventListener('load', (event) => {	
	console.log('page is fully loaded');
	console.log("Your address: " + currentAccount);
	
	init();
});

function init() {
	// Unlock button click listener
	document.getElementById('btnUnlock').addEventListener("click", function() {
		console.log("Unlock Button clicked");
		unlockActionFrame();
	});
	
	// Sell button click listener
	document.getElementById('btnSell').addEventListener("click", function() {
		console.log("Sell Button clicked");
		let stakeId = selectedStake.stakeId;
		let priceInput = document.getElementById('inputHexPrice').value;
		let priceHearts = priceInput * (10 ** 8);	// HEX to Hearts; decimals 8
		stakeSell(stakeId, priceHearts);
	});
	
	// Revoke button click listener
	document.getElementById('btnRevoke').addEventListener("click", function() {
		console.log("Revoke Button clicked");
		let stakeId = selectedStake.stakeId;
		stakeRevoke(stakeId);
	});
	
	//
	document.getElementById('btnChangePrice').addEventListener("click", function() {
		console.log("Change Price Button clicked");
		let stakeId = selectedStake.stakeId;
		let priceInput = document.getElementById('inputHexPrice').value;
		let newPriceHearts = priceInput * (10 ** 8);	// HEX to Hearts; decimals 8
		stakeChangePrice(stakeId, newPriceHearts);
	});
	
	// Event listener
	initBayEvents();
}

function update() {
	// HEX
	getDailyData();
	
	// get recovery data
	if (currentAccount !== "0x0") {
		getRecoveryData(currentAccount);
	}
	
	//getDailyDataRange(0, 10);
}

function resetData() {
	toggleConnectBox();
	hideUnlockBox();
	
	// reset table size
	$('#stakeForSaleTable').removeClass("table-sm");
	$('#stakeTable').removeClass("table-sm");
	
	// reset stake entries
	$("#stakeForSaleTable > tbody").empty();
	$("#stakeTable > tbody").empty();
}

/*******************************
 * CALLBACKS
 ******************************/

function callbackRecoveryData(recoveryData) {
	let actionFrame = recoveryData[2].valueOf();
	actionFrameTime = new Date();
	actionFrameTime.setTime(actionFrame * 1000);
	
	toggleUnlockBox(recoveryData[0]);
}

function toggleUnlockBox(recovery) {
	// do we need the unlock box?
	if (recovery !== "0x0000000000000000000000000000000000000000") {
		let now = new Date();
		let diff = actionFrameTime - now;
		
		console.log(diff);
		console.log(diff <= 1000 * 86400 * 2);
		
		// time is between 0 and 2 days
		if (diff <= 1000 * 86400 * 2 && diff >= 0) {
			showWaitingTime();		// show waiting timer
		// time is between 0 and 14 days
		} else if (diff < 0 && diff >= -1 * (1000 * 86400 * 14)) {
			showUnlockedTime();		// show unlocked timer
		// user needs to unlock first
		} else {
			showUnlockButton();		// show button
		}		
		
		// show the box
		showUnlockBox();
	} else {
		hideUnlockBox();
	}
}

function showUnlockedTime() {
	$("#waitText").show();
	setUnlockClock();
}

function setUnlockClock() {
    let now = new Date();
	let unlockedTime = ( actionFrameTime + (14*86400*1000) ) - now;
	unlockedTime = unlockedTime / 1000;
	
	var h = parseInt( unlockedTime / 3600 )
    var m = parseInt( unlockedTime / 60 ) % 60;
    var s = parseInt(unlockedTime % 60, 10);
	h = (h < 10) ? ('0' + h) : h;
	m = (m < 10) ? ('0' + m) : m;
	s = (s < 10) ? ('0' + s) : s;
	
	if (unlockedTime >= 0) {
		var result = h + ":" + m + ":" + s;
		document.getElementById('unlockedTime').innerHTML = result;
    
		setTimeout(setUnlockClock, 1000);
	} else {
		toggleUnlockBox();
	}
}

function showWaitingTime() {
	$("#unlockText").show();
	setWaitClock();
}

function setWaitClock() {
    let now = new Date();
	let waitTime = actionFrameTime - now;
	waitTime = waitTime / 1000;
	
	var h = parseInt( waitTime / 3600 )
    var m = parseInt( waitTime / 60 ) % 60;
    var s = parseInt(waitTime % 60, 10);
	h = (h < 10) ? ('0' + h) : h;
	m = (m < 10) ? ('0' + m) : m;
	s = (s < 10) ? ('0' + s) : s;
	
	if (waitTime >= 0) {
		var result = h + ":" + m + ":" + s;
		document.getElementById('waitTime').innerHTML = result;
    
		setTimeout(setWaitClock, 1000);
	} else {
		toggleUnlockBox();
	}
}
 
function callbackEventForSale(stakeId, stakedHearts, stakeShares, lockedDay, stakedDays, unlockedDay, seller, priceHearts) {
	// account available
	if (currentAccount) {
		// seller is this user
		if (currentAccount === seller) {
			hideSpinner('#spinBtnSell');
			
			// add missing attributes to stake
			let stake = stakeMap.get(stakeId.toNumber());
			stake.stakePrice = priceHearts;
			stake.isForSale = true;
			
			swapTableRow(stake);
		}
	} else {
		hideSpinner('#spinBtnSell');
	}
}

function callbackEventActionFrameUnlock(staker, time) {	
	// account available
	if (currentAccount) {
		staker = staker.toLowerCase();
		
		// is current user
		if (staker === currentAccount.toLowerCase()) {
			hideSpinner('#spinBtnUnlock');
		}
	}
}

function callbackEventRevoke(stakeId, owner) {
	// account available
	if (currentAccount) {
		// revoker is this user
		if (currentAccount === owner) {
			hideSpinner('#spinBtnRevoke');
			
			// add missing attributes to stake
			let stake = stakeMap.get(stakeId.toNumber());
			stake.stakePrice = new BN(0);
			stake.isForSale = false;
			
			swapTableRow(stake);
		}
	} else {
		hideSpinner('#spinBtnRevoke');
	}
}

function callbackEventPriceChanged(stakeId, newPrice, owner) {
	// account available
	if (currentAccount) {
		// revoker is this user
		if (currentAccount === owner) {
			hideSpinner('#spinBtnPrice');
			
			// add missing attributes to stake
			let stake = stakeMap.get(stakeId.toNumber());
			stake.stakePrice = newPrice;
			
			changeTableRowPrice(stake);
		}
	} else {
		hideSpinner('#spinBtnPrice');
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
		
		// change input data
		changePriceInputData()
		
		// highlight selected button
		highligthButton($(this));
	});
}

function getHexStakes() {
	hexContract.stakeCount(currentAccount, function(error, result) {
		if(!error) {
			var amount = result;
			console.log("Amount of HEX stakes: " + result);
			
			// smaller the table
			changeTableSize(amount);
			
			for (var i = 0; i < amount; i++) {
				getHexStakeData(i, currentAccount, amount);
			}
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
				getStakeData(stakes[i].toNumber(), stakes.length);
			}
		} else {
			console.log(error);
		}
	});
}

function getDailyDataRange(start, end) {
	hexContract.dailyDataRange(start, end, function(error, result) {
		if (!error) {
			console.log(result);
			dailyDataRange = processDailyRangeData(result);
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
 * result[0] = address owner;             	// owner address, used to dereferenciate any stake id
 * result[1] = uint40 indexUser;         	// stake position of 'stakeListIds'
 * result[2] = uint40 indexContract;     	// stake position of HEX
 * result[3] = bool isForSale;              // state if stake is for sale or not
 * // Trading
 * result[4] = uint256 indexTrade;        	// stake position if stake is for sale
 * result[5] = uint256 price;             	// price for this stake when selling
 */
function getStakeData(id, amount) {	
	bayContract.stakeData(id, function(error, result) {
		if(!error) {
			let stake = new Stake();
			stake.owner = result[0];
			stake.indexUser = result[1].toNumber();
			stake.indexContract = result[2].toNumber();
			stake.isForSale = result[3];
			stake.indexTrade = result[4].toNumber();
			stake.price = result[5];
			stakeMap.set(id, stake);
			
			getHexStakeData(stake.indexContract, bayAddress, amount);
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
	if (selectedStake.isForSale) {
		let price = selectedStake.price.div(10 ** 8);
		document.getElementById('inputHexPrice').value = price;
	} else {
		let price = selectedStake.stakedHearts.div(10 ** 8);
		document.getElementById('inputHexPrice').value = price;
	}
}

function changeTableRowPrice(stake) {
	let selector = ':button[value="' + stake.stakeId + '"]';
	let price = stake.price.div(10 ** 8);
	let priceNumber = numeral(price.toNumber());
	let priceFormat = formatHex(priceNumber);
	
	// get table row and cells
	let rowIndex = $(selector).closest('tr')[0].rowIndex;
	let cellPrice = $('#stakeForSaleTable')[0].rows[rowIndex].cells[5];
	cellPrice.innerHTML = priceFormat + ' HEX';
}

function swapTableRow(stake) {
	let selector = ':button[value="' + stake.stakeId + '"]';
	
	// remove stake from table
	removeStakeFromTable(stake, selector);
	
	// add stake to stakes for sale table
	addStakeToTable(stake);
	addButtonClickListener(selector);
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
	
	// stake is for sale
	if (stake.isForSale) {
		var price = stake.price.div(10 ** 8);
		var priceNumber = numeral(price.toNumber());
		var priceFormat = formatHex(priceNumber);
		
		$('#stakeForSaleTable').append(
			'<tr>' +
			'<td class="align-middle">' + start + '</td>' +
			'<td class="align-middle">' + end + '</td>' +
			'<td class="align-middle">' + progFormat + '</td>' +
			'<td class="align-middle">' + tsharesFormat + '</td>' +
			'<td class="align-middle">' + currentValFormat + ' HEX' + '</td>' +
			'<td class="align-middle">' + priceFormat + ' HEX' + '</td>' +
			'<td>' + button + '</td>' +
			'</tr>'
		);
	} else {		
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
}

function removeStakeFromTable(stake, selector) {	
	// remove Stake from sellable stakes table
	$(selector).closest('tr').remove();
}

function changeTableSize(amount) {
	// smaller the table
	if (amount > 10) {
		$('#stakeTable').addClass("table-sm");
		$('#stakeForSaleTable').addClass("table-sm");
	} else {
		$('#stakeTable').removeClass("table-sm");
		$('#stakeForSaleTable').removeClass("table-sm");
	}
}

function processDailyRangeData(data) {
    return data.map((satoshisSharesHearts) => {
		let b = new BN(satoshisSharesHearts.toString());
		const dayPayoutTotal = new BN(b.maskn(80).toString());
		b = b.shrn(80);
		const dayStakeSharesTotal = new BN(b.maskn(80).toString());
		b = b.shrn(80);
		const dayUnclaimedSatoshisTotal = new BN(b.toString());
		return {
			dayStakeSharesTotal,
			dayPayoutTotal,
			dayUnclaimedSatoshisTotal,
		};
    });
}