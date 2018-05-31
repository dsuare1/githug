let onceDaily = document.querySelector('.once-daily');
let twiceDaily = document.querySelector('.twice-daily');

onceDaily.addEventListener('click', function() {
	localStorage.setItem('frequency', 'once');
	chrome.extension.sendRequest({
		time: 'once'
	}, function() {
		// Do nothing
	});
});

twiceDaily.addEventListener('click', function() {
	localStorage.setItem('frequency', 'twice');
	chrome.extension.sendRequest({
		time: 'twice'
	}, function() {
		// Do nothing
	});
});
