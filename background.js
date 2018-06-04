const quotes = ['Trying and failing is better than never starting.', 'You deserve to be where you are.', 'Don\'t be afraid to fail.'];
// tracking array to keep state of chosen quotes
let chosenQuotes = [];
let randomQuote;

function selectRandomString() {
	// if all random quotes have been chosen, empty the tracking array
	if (chosenQuotes.length === quotes.length) {
		chosenQuotes = [];
	}

	// choose a random quote
	randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

	// check it against the 'chosenQuotes' array
	const inChosenQuotes = chosenQuotes.indexOf(randomQuote) !== -1;

	// if inChosenQuotes is false, add it to the array and return it
	if (!inChosenQuotes) {
		chosenQuotes.push(randomQuote);

		return randomQuote;
	} else {
		// if randomQuote is already in chosenQuotes, call the function recursively
		return selectRandomString();
	}
}

function createNotification() {
	const quote = selectRandomString();

	return new Notification(quote);
}

// initialization
chrome.runtime.onInstalled.addListener(function() {
	// if a user has not already granted permission
	if (Notification.permission !== "granted") {
		// ask for permission
		Notification.requestPermission().then(function(permission) {
			// check the resolved promise value; if granted...
			if (permission === 'granted') {
				// ...open the options page
				chrome.tabs.create({
					url: './options.html'
				});
			}
		});
	} else {
	    // if a user has already granted permission, open the options page
		chrome.tabs.create({
			url: './options.html'
		});
	}
});

chrome.alarms.onAlarm.addListener(function() {
   createNotification();
});
