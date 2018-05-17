const quotes = ['Trying and failing is better than never starting.', 'You deserve to be where you are.', 'Don\'t be afraid to fail.', 'Keep grinding!', 'Take a break; grab some coffee.', 'bim', 'bop', 'fam', 'faz', 'fap'];

function selectRandomString() {
	return quotes[Math.floor(Math.random() * quotes.length)];
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

chrome.extension.onRequest.addListener(function(request, sender, sendResponse) {
	let now = new Date();

	if (request.time === 'once') {
		let millisTill1030 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30, 0, 0) - now;

		if (millisTill1030 < 0) {
			millisTill1030 += 86400000;
		}

		setTimeout(createNotification, millisTill1030);
	}

	if (request.time === 'twice') {
		let millisTill1030 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30, 0, 0) - now;
		let millisTill330 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30, 0, 0) - now;

		if (millisTill330 < 0) {
			millisTill330 += 86400000;
		}

		if (millisTill1030 < 0) {
			millisTill330 += 86400000;
		}

		setTimeout(createNotification, millisTill1030);
		setTimeout(createNotification, millisTill330);
	}
});