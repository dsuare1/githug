const once = document.querySelector('.once');
const twice = document.querySelector('.twice');

function calculateMsTill(hour, minute) {
	const now = new Date();

	let msTillHour =  new Date(now.getFullYear(), now.getMonth(), now.getDate(), hour, minute, 0, 0) - now;

	return msTillHour < 0 ? msTillHour + 86400000 : msTillHour;
}

function calculateAlarm(frequency) {
	// instantiate undefined variable for possible use later
	let msTill1530;

	// calculate the number of milliseconds until 10:30AM
	let msTill1030 = calculateMsTill(10, 30);

	// if frequency is twice, calculate the number of milliseconds until 3:30PM also
	if (frequency === 'twice') {
		msTill1530 = calculateMsTill(15, 30);
	}

	// return an object with both values, to be used as needed
	const result = {
		msTill1030,
	};

	if (typeof msTill1530 !== 'undefined') {
		result.msTill1530 = msTill1530;
	}

	return result;
}

function displayCheckMarkAndMessage() {
	const checkMarkContainer = document.getElementById('check-mark-container');

	checkMarkContainer.style.display = 'block';
}

function closeTab() {
	chrome.tabs.getCurrent(function(tab) {
		setTimeout(function() {
			chrome.tabs.remove(tab.id);
		}, 1500);
	});
}

document.addEventListener('DOMContentLoaded', function() {
	once.addEventListener('click', function() {
		const time = calculateAlarm('once');

		const delayInMinutes = time.msTill1030 / 1000 / 60;

		chrome.alarms.create('once', {
			delayInMinutes: delayInMinutes, periodInMinutes: 1440
		});

		displayCheckMarkAndMessage();

		return closeTab();
	});

	twice.addEventListener('click', function() {
		const time = calculateAlarm('twice');

		const delayInMinutes1030 = time.msTill1030 / 1000 / 60;
		const delayInMinutes1530 = time.msTill1530 / 1000 / 60;

		chrome.alarms.create('twice - am', {
			delayInMinutes: delayInMinutes1030, periodInMinutes: 1440
		});

		chrome.alarms.create('twice - pm', {
			delayInMinutes: delayInMinutes1530, periodInMinutes: 1440
		});

		displayCheckMarkAndMessage();

		return closeTab();
	});
});
