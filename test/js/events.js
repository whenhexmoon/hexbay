// EVENTS

// Init Event Listener
function initHexEvents() {
	const hexEvents = hexContract.allEvents();
	
	// watch for changes
	console.log("Start watching for hex events");
	hexEvents.watch(function(error, event){
		if (!error) {
			switch (event.event) {
				case "StakeStart" :
					eventStakeStart(event);
					break;
				case "StakeEnd" :
					eventStakeEnd(event);
					break;
				case "Approval" :
					eventApprove(event);
					break;
				default :
			}
		} else {
			console.log(error);
		}
	});
}

function initBayEvents() {
	const bayEvents = bayContract.allEvents();
	
	// watch for changes
	console.log("Start watching for bay events");
	bayEvents.watch(function(error, event){
		console.log("Bay event triggered");
		if (!error) {
			switch (event.event) {
				case "RecoverySet" :
					eventRecoverySet(event);
					break;
				case "RecoveryModeChange" :
					eventRecoveryModeChange(event);
					break;
				case "StakeRecover" :
					eventStakeRecover(event);
					break;
				case "StakeForSale" :
					eventStakeForSale(event);
					break;
				case "StakeBuy" :
					eventStakeBuy(event);
					break;
				case "StakeRevoke" :
					eventStakeRevoke(event);
					break;
				case "StakePriceChange" :
					eventStakePriceChange(event);
					break;
				default :
			}
		} else {
			console.log(error);
		}
	});
}

function initRefEvents() {
	/*hexContract.StakeStart({}, { fromBlock: 0, toBlock: 'latest' }).get((error, eventResult) => {
		if (error) {
			console.log('Error in myEvent event handler: ' + error);
		} else {
			console.log('StakeStart: ' + JSON.stringify(eventResult));
		}
	});*/
}

function initMintEvents() {
	const mintEvents = hexContract.Transfer();
	
	console.log("Start watching for mint events");
	mintEvents.watch(function(error, event) {
		console.log("HEX mint event triggered");
		if (!error) {
			eventMinted(event);
		} else {
			console.log(error);
		}
	});
}

function initRecoverySetEvents() {	
	var recoverySetEvents = bayContract.RecoverySet(
		{recovery: currentAccount.toLowerCase()},
		{fromBlock: 0, toBlock: 'latest'} 
	);
	
	console.log("Get past recovery set events");
	
	// would get all past logs again.
	var subscription = recoverySetEvents.get(function(error, logs){ 
		if (!error) {
			// iterate all staker addresses
			logs.forEach(event => callbackPastRecoverySetEvents(event.args.staker));
		} else {
			console.log(error);
		}
		
		subscription.stopWatching(stoppedWatching(subscription));
	});
}

function stoppedWatching(subscription) {
	console.log("Stopped watching for past recovery set events");
	console.log(subscription);
}

function initTransferEvents() {
	const transferEvents = bayContract.StakeTransfer();
	
	console.log("Start watching for stake transfer events");
	transferEvents.watch(function(error, event) {
		console.log("Bay transfer event triggered");
		if (!error) {
			eventStakeTransfer(event);
		} else {
			console.log(error);
		}
	});
}

function eventRecoverySet(event) {
	console.log("RecoverySet event triggered");
	let args = event.args;
	let staker = args.staker;
	let recovery = args.recovery;
	callbackEventRecoverySet(staker, recovery);
}

function eventRecoveryModeChange(event) {
	console.log("RecoveryModeChange event triggered");
	let args = event.args;
	let recovery = args.recovery;
	let staker = args.staker;
	let modeActive = args.recoveryModeActive;
	callbackEventRecoveryModeChange(recovery, staker, modeActive);
}

function eventStakeRecover(event) {
	console.log("StakeRecover event triggered");
	let args = event.args;
	let stakeId = args.stakeId;
	let from = args.from;
	let to = args.to;
	let recovery = args.recovery;
	callbackEventStakeRecover(stakeId, from, to, recovery);
}

function eventStakeStart(event) {
	console.log("StakeStart event triggered");
	let args = event.args;
	let stakerAddr = args.stakerAddr;
	let stakeId = args.stakeId;
	callbackEventStakeStart(stakerAddr, stakeId);
}

function eventStakeEnd(event) {
	console.log("StakeEnd event triggered");
	let args = event.args;
	let stakerAddr = args.stakerAddr;
	let stakeId = args.stakeId;
	console.log(args);
	callbackEventStakeEnd(stakerAddr, stakeId);
}

function eventStakeTransfer(event) {
	let args = event.args;
	let stakeId = args.stakeId;
	let from = args.from;
	let to = args.to;
	callbackEventStakeTransferred(stakeId, from, to);
}

function eventApprove(event) {
	console.log("Approve event triggered");
	let args = event.args;
	let owner = args.owner;
	let spender = args.spender;
	let value = args.value;
	callbackEventApprove(owner, spender, value);
}

function eventMinted(event) {
	let args = event.args;
	let from = args.from;
	let to = args.to;
	let value = args.value;
	callbackEventMinted(from, to, value);
}

/* event StakeForSale(uint40 stakeId, uint72 stakedHearts, uint72 stakeShares, uint16 lockedDay, uint16 stakedDays, uint16 unlockedDay, address indexed seller, uint256 priceHearts); */
function eventStakeForSale(event) {
	console.log("StakeForSale event triggered");
	let args = event.args;
	let stakeId = args.stakeId;
	let stakedHearts = args.stakedHearts;
	let stakeShares = args.stakeShares;
	let lockedDay = args.lockedDay;
	let stakedDays = args.stakedDays;
	let unlockedDay = args.unlockedDay;
	let seller = args.seller;
	let priceHearts = args.priceHearts;
	callbackEventForSale(stakeId, stakedHearts, stakeShares, lockedDay, stakedDays, unlockedDay, seller, priceHearts);
}

/* event StakeBuy(uint40 stakeId, uint72 stakedHearts, uint72 stakeShares, uint16 lockedDay, uint16 stakedDays, uint16 unlockedDay, address indexed seller, address indexed buyer, uint256 priceHearts); */
function eventStakeBuy(event) {
	console.log("StakeBuy event triggered");
	let args = event.args;
	let stakeId = args.stakeId;
	let stakedHearts = args.stakedHearts;
	let stakeShares = args.stakeShares;
	let lockedDay = args.lockedDay;
	let stakedDays = args.stakedDays;
	let unlockedDay = args.unlockedDay;
	let seller = args.seller;
	let buyer = args.buyer
	let priceHearts = args.priceHearts;
	callbackEventBuy(stakeId, stakedHearts, stakeShares, lockedDay, stakedDays, unlockedDay, seller, buyer, priceHearts);
}

/* event StakeRevoke(uint40 stakeId, address indexed owner); */
function eventStakeRevoke(event) {
	console.log("StakeRevoke event triggered");
	let args = event.args;
	let stakeId = args.stakeId;
	let owner = args.owner;
	callbackEventRevoke(stakeId, owner);
}

/* event StakePriceChange(uint40 stakeId, uint256 newPriceHearts, address indexed owner); */
function eventStakePriceChange(event) {
	console.log("StakePriceChange event triggered");
	let args = event.args;
	let stakeId = args.stakeId;
	let newPrice = args.newPriceHearts;
	let owner = args.owner;
	callbackEventPriceChanged(stakeId, newPrice, owner);
}