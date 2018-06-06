const once = document.querySelector('.once');
const twice = document.querySelector('.twice');

function calculateMsTill() {
	// cache the current timestamp
	const now = new Date();

	// calculate the number of milliseconds until 10:30AM
	let msTill1030 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 10, 30, 0, 0) - now;

	// calculate the number of milliseconds until 3:30PM
	let msTill1530 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 15, 30, 0, 0) - now;

	// if the event occurs after 10:30AM, set the time until 10:30AM the next day
	if (msTill1030 < 0) {
		msTill1030 += 86400000;
	}

	// if the event occurs after 3:30PM, set the time until 3:30PM the next day
	if (msTill1530 < 0) {
		msTill1530 += 86400000;
	}

	// return an object with both values, to be used as needed
	return {
		msTill1030: msTill1030,
		msTill1530: msTill1530,
	}
}

document.addEventListener('DOMContentLoaded', function() {
    once.addEventListener('click', function() {
    	const time = calculateMsTill();

    	const delayInMinutes = time.msTill1030 / 1000 / 60;

        chrome.alarms.create('once', {
            delayInMinutes: delayInMinutes, periodInMinutes: 1440
        });
    });

    twice.addEventListener('click', function() {
		const time = calculateMsTill();

		const delayInMinutes1030 = time.msTill1030 / 1000 / 60;
		const delayInMinutes1530 = time.msTill1530 / 1000 / 60;

        chrome.alarms.create('twice - am', {
            delayInMinutes: delayInMinutes1030, periodInMinutes: 1440
        });

        chrome.alarms.create('twice - pm', {
        	delayInMinutes: delayInMinutes1530, periodInMinutes: 1440
		});
    });
});
