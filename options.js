let onceDaily = document.querySelector('.once-daily');
let twiceDaily = document.querySelector('.twice-daily');

document.addEventListener('DOMContentLoaded', function() {
    // grab the current time
    const now = Date.now();

    // set up a desired time at which to run
	let msTill1030 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30, 0, 0) - now;

	if (msTill1030 < 0) {
		msTill1030 += 86400000;
	}

	const delayInMinutes = msTill1030 / 1000 / 60;
	console.log('********************  ' + delayInMinutes + '  ********************');

    onceDaily.addEventListener('click', function() {
        chrome.alarms.create('once', {
            delayInMinutes: delayInMinutes, periodInMinutes: 1440
        });
    });

    twiceDaily.addEventListener('click', function() {
        chrome.alarms.create('once', {
            delayInMinutes: 0.1, periodInMinutes: 0.2
        });
    });
});
