// hexContract, bayContract available
window.addEventListener('load', (event) => {	
	console.log('page is fully loaded');
	console.log("Your address: " + currentAccount);
	
	init();
});

function init() {	
	// Copy button click listener
	document.getElementById('btnMint').addEventListener("click", function() {
		let receiver = $('#inputMintAddress').val();
		mintHearts(receiver);
	});
	
	// Event listener
	initMintEvents();
}

function update() {
	$('#inputMintAddress').val(currentAccount);
}

function resetData() {
	toggleConnectBox();
	
	// Stop event listener
	//stopEventForSale();
	//stopEventRevoke();
	
	resetMintAddress();
	
	// reset table size
	$('#mintTable').removeClass("table-sm");
	
	// reset stake entries
	$("#mintTable > tbody").empty();
}

function resetMintAddress() {
	// input field
	$('#inputMintAddress').val("");	
}

function callbackEventMinted(from, to, value) {
	// tokens have been minted
	if (from === "0x0000000000000000000000000000000000000000") {
		// current user has minted tokens
		if (to === currentAccount) {
			// show event in table
			hideSpinner('#spinBtnMint');
		}
	}
}