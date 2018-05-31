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

function foo() {
    let now;

    // check the time every second
    setInterval(function() {
        now = Date.now();
    }, 1000);

    if (localStorage.getItem('frequency') === 'once') {
        setInterval(function() {
            let millisTill2325 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 25, 0, 0) - now;

            if (millisTill2325 < 0) {
                millisTill2325 += 86400000;
            }

            setTimeout(createNotification, millisTill2325);
        }, 1000);
    }

    if (localStorage.getItem('frequency') === 'twice') {
        setInterval(function() {
            let millisTill2325 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 25, 0, 0) - now;
            let millisTill2327 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 27, 0, 0) - now;

            if (millisTill2325 < 0) {
                millisTill2325 += 86400000;
            }

            if (millisTill2327 < 0) {
                millisTill2327 += 86400000;
            }

            setTimeout(createNotification, millisTill2325);
            setTimeout(createNotification, millisTill2327);
        }, 1000);
    }
}

// extension lifecycle

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
				}).then(function() {
					foo();
				});
			}
		});
	} else {
	    // if a user has already granted permission, open the options page
		chrome.tabs.create({
			url: './options.html'
		}).then(function() {
			foo();
		});
	}
});

// listeners
chrome.runtime.onStartup.addListener(function() {
	const frequency = localStorage.getItem('frequency');

	return new Notification(frequency);
});

chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    console.log('message received');
    // let now = Date.now();

    if (request.time === 'once') {
        chrome.alarms.create('once', {
            delayInMinutes: 0.1,
            periodInMinutes: 0.1,
        });
    }
});

chrome.alarms.onAlarm.addListener(function(alarm) {
   createNotification();
});






	/*
	// check the time every second
	setInterval(function() {
		now = Date.now();
	}, 1000);

	if (request.time === 'once') {
		setInterval(function() {
			let millisTill2320 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 20, 0, 0) - now;

			if (millisTill2320 < 0) {
				millisTill2320 += 86400000;
			}

			setTimeout(createNotification, millisTill2320);
		}, 1000);
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
			let millisTill2325 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 25, 0, 0) - now;
			let millisTill2327 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 27, 0, 0) - now;

			if (millisTill2325 < 0) {
				millisTill2325 += 86400000;
			}

			if (millisTill2327 < 0) {
				millisTill2327 += 86400000;
			}

			setTimeout(createNotification, millisTill2325);
			setTimeout(createNotification, millisTill2327);
		}, 1000);
	}
});
*/