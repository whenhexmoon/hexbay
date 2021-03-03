/**
 * Referral module. Watches for a ref in the URL and sets or retrieve a cookie value.
 */

 // Look for an URL variable named ref. Return the ref address or 0x0
function getRefFromUrl() {
	var url_string = window.location.href;
	var url = new URL(url_string);
	var ref = url.searchParams.get('ref');
	
	// ref exists in url
	if (ref) {
		console.log("Referral available: " + ref);
		return ref;
	} else {
		console.log("Referral unavailable");
		return '0x0';
	}
}

// Set a cookie value named "ref" to the refs address
function setRefCookie(ref) {	
	document.cookie = 'ref=' + ref;
}

// Retrieve the cookie value of "ref" which is an ethereum address or 0x0
function getRefCookie() {
	var name = 'ref' + '=';
	var cookie = document.cookie;
	
	if (cookie.indexOf(name) == 0) {
      return cookie.substring(name.length, cookie.length);
    } else {
		return '0x0';
	}
}

// watch if ref is available in url and cookie and replace if the user self refers
function smartRef() {
	// get ref from url
	let refUrl = getRefFromUrl().toLowerCase();
	let refCookie = getRefCookie().toLowerCase();
	
	// ref exists in url
	if (refUrl !== "0x0") {
		// never override refs, except self ref
		if (refCookie === "0x0" || refUrl === currentAccount.toLowerCase()) {
			// write cookie
			setRefCookie(refUrl);
		}
	}
	
	// return ref
	return getRefCookie();
}