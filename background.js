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
		// this works!
		setInterval(createNotification, 3000);
	}
});
