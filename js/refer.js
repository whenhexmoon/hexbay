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
	initRefEvents();
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