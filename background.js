const quotes = ['Trying and failing is better than never starting.', 'You deserve to be where you are.', 'Don\'t be afraid to fail.', 'Keep grinding!', 'Take a break; grab some coffee.', 'bim', 'bop', 'fam', 'faz', 'fap'];
let handle;

function selectRandomString() {
	return quotes[Math.floor(Math.random() * quotes.length)];
}

function createNotification() {
	const quote = selectRandomString();

	return new Notification(quote);
}

let interval = 1000 * 3;

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
	clearInterval(handle);
	interval = request.interval;

	handle = setInterval(createNotification, interval);
});