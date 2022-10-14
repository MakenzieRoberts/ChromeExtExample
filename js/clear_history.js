// https://stackoverflow.com/questions/1891738/how-to-modify-current-url-location-in-chrome-via-extensions/29148469#29148469

/* ******************* Change URL (CROSS COMPATIBLE(?)): ****************** */

// You can use chrome.tabs.query too

// chrome.tabs.query({currentWindow: true, active: true}, function (tab) {
//       chrome.tabs.update(tab.id, {url: your_new_url});
// });

/* ************************************ * *********************************** */
// To do:
// DONE - Make sure that on saving a new prefix, it deletes the old one from memory first.
// Check if https has been added, if not, add it
// Also allow suffixes to be added, MAYBE i COULD HAVE TWO INPUT FIELDS, ONE FOR PREFIX AND ONE FOR SUFFIX
// Figure out how to add a placeholder for when the field is empty ("https://<your-prefix>/" or "https://<your-prefix>/content/<your-suffix>")

chrome.browserAction.onClicked.addListener(function (tab) {
	const log = chrome.extension.getBackgroundPage().console.log;
	// chrome.storage.sync.get(
	// 	{
	// 		sites: "supersecretsite.com",
	// 		popup: false,
	// 	},
	// 	deleteBySites
	// );

	//https://developer.chrome.com/docs/extensions/reference/tabs/
	// https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/tabs/query
	chrome.storage.sync.get(
		{
			sites: "https://<your-prefix>/",
			popup: false,
		},
		setPrefix
	);

	// !NOTE: We need to get the data from user input and put it in front of the url
	//!REMEMBER: 'sites' is just the var we're using for the prefix query the user will input, relic from original code
	function setPrefix(storage) {
		let prefix = storage.sites;
		log(storage);
		chrome.tabs.query({ currentWindow: true, active: true }, function (tab) {
			let currentURL = tab[0].url;
			let combinedOutput = prefix + currentURL;
			console.log(combinedOutput);
			chrome.tabs.update(tab.id, { url: combinedOutput });

			// console.log(chrome.tabs.getCurrent(tab.url));

			//
		});
	}
	// chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
	// 	console.log(tabs[0].url);
	// 	let currentURL = tabs[0].url;
	// 	console.log(currentURL);
	// 	chrome.tabs.update(tabs.id, { url: your_new_url });
	// 	console.log(tabs[0].url);
	// 	// console.log(chrome.tabs.getCurrent(tab.url));

	// 	//
	// });
});

function announceSites(storage) {
	var query = storage.sites;
	console.log(query);
	return query;
}

// function deleteBySites(storage) {
// 	var allSites = storage.sites.split("\n");
// 	numSites = allSites.length;
// 	for (var i = 0; i < allSites.length; i++) {
// 		deleteBySite(allSites[i], storage.popup);
// 	}
// }

// function deleteBySite(site, popup) {
// 	chrome.history.search(
// 		{
// 			text: site,
// 			startTime: 0,
// 			maxResults: 999999,
// 		},
// 		function (results) {
// 			var itemsDeleted = 0;
// 			for (itemsDeleted; itemsDeleted < results.length; itemsDeleted++) {
// 				chrome.history.deleteUrl({
// 					url: results[itemsDeleted].url,
// 				});
// 			}

// 			if (popup) {
// 				siteDeleted(site, itemsDeleted);
// 			}
// 		}
// 	);
// }

// var numSites = 0;
// var sitesProcessed = 0;
// var siteString = "Scrub complete:\n";
// function siteDeleted(site, count) {
// 	sitesProcessed++;
// 	siteString += count + "x " + site + "\n";
// 	if (sitesProcessed >= numSites) {
// 		alert(siteString);
// 		sitesProcessed = 0;
// 		siteString = "Scrub complete:\n";
// 	}
// }
