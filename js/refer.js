var BN = web3.BigNumber;

let refStats = [new Set(), 0, new BN(0)];

// hexContract, bayContract available
window.addEventListener('load', (event) => {	
	console.log('page is fully loaded');
	console.log("Your address: " + currentAccount);
	
	init();
});

function init() {	
	// Copy button click listener
	document.getElementById('btnCopy').addEventListener("click", function() {		
		copyLink();
	});
	
	// Event listener
	initReferralUsed();
}

function update() {	
	// show your ref link
	showRefLink();
}

function resetData() {
	toggleConnectBox();
	
	// Stop event listener
	//stopEventForSale();
	//stopEventRevoke();
	
	resetRefLink();
	
	// reset table size
	$('#refTable').removeClass("table-sm");
	
	// reset stake entries
	$("#refTable > tbody").empty();
}

function callbackEventReferralUsed(staker, referral, amount) {
	calcUserStats(staker, amount);
	addRefToTable(staker, amount);

}

function showRefLink() {
	let link = "hexbay.win/?ref=";
	
	// input field
	$('#inputRefLink').val(link + currentAccount);
}

function resetRefLink() {
	// input field
	$('#inputRefLink').val("");	
}

function copyLink() {
	let input = document.getElementById("inputRefLink");
		
	// select the text field
	input.select();
	input.setSelectionRange(0, 99999); /* For mobile devices */
	
	/* Copy the text inside the text field */
	document.execCommand("copy");

	/* Alert the copied text */
	alert("Copied " + input.value);
}

function addRefToTable(staker, amount) {
	
	var addressFormat = formatAddress(staker);
	
	var amount = amount.div(10 ** 8);
	var amountNumber = numeral(amount.toNumber());
	var amountFormat = formatHex(amountNumber);
	
	$('#refTable').append(
		'<tr>' +
		'<td class="align-middle">' + addressFormat + '</td>' +
		'<td class="align-middle">' + amountFormat + ' HEX' + '</td>' +
		'</tr>'
	);
}

function calcUserStats(staker, amount) {
	let addresses = refStats[0];
	let stakes = refStats[1] + 1;
	amount = refStats[2].add(amount);
	
	addresses.add(staker.toLowerCase());
	
	refStats = [addresses, stakes, amount];	// Array with 3 values

	let refStatsFormat = formatRefStats(refStats);
	showRefStats(refStatsFormat);
}

function formatRefStats() {
	let addresses = refStats[0].size;
	let stakes = refStats[1];
	
	let amount = refStats[2];
	amount = amount.div(10 ** 8);
	let rewardNumber = numeral(amount.toNumber());
	let reward = formatHex(rewardNumber);
	
	return [addresses, stakes, reward];
}

function showRefStats(stats) {
	// Addresses
	$('#statRefsUnique').text(stats[0]).show();
	
	// Stakes
	$('#statRefsTotal').text(stats[1]).show();
	
	// Reward
	$('#statReward').text(stats[2] + " HEX").show();
}