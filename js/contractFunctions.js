// spender is always this contract
function approve(spender, amount) {
	hexContract.approve(spender, amount, function(error, result) {
		if(!error) {
			console.log("Approved: " + amount);
			// show button spinner
			showSpinner('#spinBtnApprove');
		} else {
			console.log(error);
		}
	});
}

// mint 1 million HEX for given address
function mintHearts(receiver) {
	hexContract.mintHearts(receiver, function(error, result) {
		if(!error) {
			console.log("Minting: 1M HEX");
			// show button spinner
			showSpinner('#spinBtnMint');
		} else {
			console.log(error);
		}
	});
}

// Contract Base
function stakeStart(hearts, days, referral) {
	bayContract.stakeStart(hearts, days, referral, function(error, result) {
		if(!error) {
			console.log("Staked Hearts: " + hearts + " for days: " + days + " with ref: " + referral);
			// show button spinner
			showSpinner('#spinBtnStake');
		} else {
			console.log(error);
		}
	});
}

function stakeEnd(stakeIndexUser, stakeId) {
	bayContract.stakeEnd(stakeIndexUser, stakeId, function(error, result) {
		if (!error) {
			console.log("Stake End " + stakeId + " at index " + stakeIndexUser);
		} else {
			console.log(error);
		}
	});
}

function stakeTransfer(stakeId, receiver) {
	bayContract.stakeTransfer(stakeId, receiver, function(error, result) {
		if (!error) {
			console.log("Stake " + stakeId + " transferring to " + receiver);
			showSpinner('#spinBtnTransfer');
		} else {
			console.log(error);
		}
	});
}

// Contract Trade
function stakeBuy(stakeId, priceHearts) {
	bayContract.stakeBuy(stakeId, priceHearts, function(error, result) {
		if (!error) {
			console.log("Stake " + stakeId + " buy for: " + priceHearts);
			// show button spinner
			showSpinner('#spinBtnBuy');
		} else {
			console.log(error);
		}
	});
}

function stakeSell(stakeId, priceHearts) {
	bayContract.stakeSell(stakeId, priceHearts, function(error, result) {
		if(!error) {
			console.log("Stake " + stakeId + " for sale: " + priceHearts);
			// show button spinner
			showSpinner('#spinBtnSell');
		} else {
			console.log(error);
		}
	});
}

function stakeRevoke(stakeId) {
	bayContract.stakeRevoke(stakeId, function(error, result) {
		if(!error) {
			console.log("Stake " + stakeId + " revoked");
			// show button spinner
			showSpinner('#spinBtnRevoke');
		} else {
			console.log(error);
		}
	});
}

function stakeChangePrice(stakeId, newPriceHearts) {
	bayContract.stakeChangePrice(stakeId, newPriceHearts, function(error, result) {
		if(!error) {
			console.log("Stake " + stakeId + " change price: " + newPriceHearts);
			// show button spinner
			showSpinner('#spinBtnPrice');
		} else {
			console.log(error);
		}
	});
}