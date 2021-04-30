class Stake {	
	constructor() {
		this.stakedHearts = 0;
		this.stakeShares = 0;
		this.lockedDay = 0;
		this.stakedDays = 0;
		this.unlockedDay = 0;
		this.interest = 0;
		this.isAutoStake = false;
		this.owner = "0x0";
		this.indexUser = 0;
		this.indexContract = 0;
		this.indexTrade = 0;
		this.price = 0;
		this.isForSale = false;
	}
	
	toString() {
		return
		"stakedHearts: " + this.stakedHearts +
		", stakeShares: " + this.stakeShares +
		", lockedDay: " + this.lockedDay +
		", stakedDays: " + this.stakedDays +
		", unlockedDay: " + this.unlockedDay +
		", isAutoStake: " + this.isAutoStake +
		", stakeOwner: " + this.owner +
		", stakeIndexUser: " + this.indexUser +
		", stakeIndexContract: " + this.indexContract +
		", stakeIndexTrade: " + this.indexTrade +
		", stakePrice: " + this.price +
		", isForSale: " + this.isForSale;
	}
}

function calcInterest(stake) {
	let result = new BN(0);
	//console.log("Start stake day: " + stake.lockedDay);

	for (let i = 0; i < dailyData.length; i++) {
		let data = dailyData[i];
		
		if (data) {
			if (data.dayStakeSharesTotal.toNumber().valueOf() != 0 && i >= stake.lockedDay) {
				let day = data.dayPayoutTotal.div(data.dayStakeSharesTotal);
				day = day.mul(stake.stakeShares);
				day = day.div(new BN("100000000"));
				
				try {
					result = result.plus(day);
				} catch (e) {
					console.log("Result: " + result.toNumber() + " Day: " + day.toNumber());
					console.log(e);
				}
			}
		} else {
			console.log("Info: Daily data for day " + (+i+1) + " not fetched");
		}
	}
	
	//console.log("Result: " + result.toNumber());
	return result;
}

function showSpinner(id) {
	$(id).css("display", "inline-block");
}

function hideSpinner(id) {
	$(id).css("display", "none");
}

function showConnectBox() {
	$("#connectBox").show(500);
}

function hideConnectBox() {
	$("#connectBox").hide(500);
}

function toggleConnectBox() {
	if (currentAccount === "0x0") {
		showConnectBox();
	} else {
		hideConnectBox();
	}
}

function toggleUnlockBox(recovery) {
	// do we need the unlock box?
	if (recovery !== "0x0000000000000000000000000000000000000000") {
		let now = new Date();
		let diff = actionFrameTime - now;
		
		// time is between 0 and 2 days
		if (diff <= 1000 * 86400 * 2 && diff >= 0) {
			hideUnlocked();
			hideUnlock();
			showWait();		// show waiting text and timer
			setWaitClock();
		// time is between 0 and 14 days active
		} else if (diff < 0 && diff >= -1 * (1000 * 86400 * 14)) {
			hideWait();
			hideUnlock();
			showUnlocked();		// show unlocked text and timer
			setUnlockClock();
		// user needs to unlock first
		} else {
			hideUnlocked();
			hideWait();
			showUnlock();		// show button
		}		
		
		// show the box
		showUnlockBox();
	} else {
		hideUnlockBox();
	}
}

function showUnlock() {
	$('#unlock').show();
}

function showUnlocked() {
	$('#unlocked').show();
}

function showWait() {
	$('#wait').show();
}

function hideUnlock() {
	$('#unlock').hide();
}

function hideUnlocked() {
	$('#unlocked').hide();
}

function hideWait() {
	$('#wait').hide();
}

function setUnlockClock() {
    let now = new Date();
	let unlockedTime = ( actionFrameTime.valueOf() + (14*86400*1000) ) - now.valueOf();
	unlockedTime = unlockedTime / 1000;
	
	var d = parseInt( unlockedTime / (24*3600));
	var h = parseInt( unlockedTime / 3600) % 24;
    var m = parseInt( unlockedTime / 60 ) % 60;
    var s = parseInt(unlockedTime % 60, 10);
	d = (d < 10) ? ('0' + d) : d;
	h = (h < 10) ? ('0' + h) : h;
	m = (m < 10) ? ('0' + m) : m;
	s = (s < 10) ? ('0' + s) : s;
	
	if (unlockedTime >= 0) {
		var result = d + ":" + h + ":" + m + ":" + s;
		document.getElementById('unlockedTime').innerHTML = result;
    
		setTimeout(setUnlockClock, 1000);
	} else {
		toggleUnlockBox();
	}
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

function showUnlockBox() {
	$("#unlockBox").show();
}

function hideUnlockBox() {
	$("#unlockBox").hide();
}

function showUnlockButton() {
	$('#unlockButton').show();
}

function hideUnlockButton() {
	$('#unlockButton').hide();
}

function highligthButton(button) {
	// Change background color of button element
	button.css("background-color", "#007bff");
	
	// Change text of button element
    button.html("Selected");
}

function resetHighligthButton(selector) {
	// Change background color of button element
	$(selector).css("background-color", "#6c757d");
	
	// Change text of button element
    $(selector).html("Select");
}