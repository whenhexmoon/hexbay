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

function showUnlockBox() {
	$("#unlockBox").show();
}

function hideUnlockBox() {
	$("#unlockBox").hide();
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