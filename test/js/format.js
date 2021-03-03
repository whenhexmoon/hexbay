function formatHex(hex) {
	if (hex.value() >= 1000000) {	// 1 million
		return hex.format('0.000a').toUpperCase();
	}
	
	return hex.format('0,0');
}

function formatShares(shares) {
	if (shares.value() >= 1000) {
		return shares.format('0,0');
	}
	
	if (shares.value() < 0.000001) {
		return '0.00';
	}
	
	return shares.format('0.00');
}

function formatPercentage(percent) {
	if (percent.value() >= 1.0) {
		var hundred = numeral(1);
		return hundred.format('0%');
	}
	
	return percent.format('0.00%');
}

function formatOwner(stake) {
	if (stake) {
		var owner = stake.stakeOwner;
		
		if (owner.toLowerCase() === currentAccount.toLowerCase()) {
			return "You";
		} else {
			//e.g. "0x1234...5678";
			owner = owner.substring(2, 6) + "..." + owner.substring(36, 40);
			return "0x" + owner.toUpperCase();
		}
	} else {
		return "0x0";
	}
}