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

chrome.runtime.onInstalled.addListener(function() {
	if (Notification.permission !== "granted") {
		Notification.requestPermission();
	}

	if (Notification.permission !== "granted") {
		Notification.requestPermission();
	} else {
		chrome.tabs.create({
			url: './options.html'
		});
	}
});

chrome.runtime.onStartup.addListener(function() {
	return new Notification('browser started');
});

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	let now = new Date();

	if (request.time === 'once') {
		setInterval(function() {
			let millisTill1030 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30, 0, 0) - now;

			if (millisTill1030 < 0) {
				millisTill1030 += 86400000;
			}

			setTimeout(createNotification, millisTill1030);
		}, 1000 * 60);
	}

	if (request.time === 'twice') {
		setInterval(function() {
			// let millisTill1030 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30, 0, 0) - now;
			// let millisTill330 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30, 0, 0) - now;

			// if (millisTill330 < 0) {
			// 	millisTill330 += 86400000;
			// }

			// if (millisTill1030 < 0) {
			// 	millisTill330 += 86400000;
			// }

			// setTimeout(createNotification, millisTill1030);
			// setTimeout(createNotification, millisTill330);
			let millisTill1540 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 40, 0, 0) - now;
			let millisTill1542 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 42, 0, 0) - now;

			if (millisTill1540 < 0) {
				millisTill1540 += 86400000;
			}

			if (millisTill1542 < 0) {
				millisTill1542 += 86400000;
			}

			setTimeout(createNotification, millisTill1540);
			setTimeout(createNotification, millisTill1542);
		}, 1000 * 60);

	}
});