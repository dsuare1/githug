let onceDaily = document.querySelector('.once-daily');
let twiceDaily = document.querySelector('.twice-daily');

onceDaily.addEventListener('click', function() {
	chrome.extension.sendRequest({
		time: 'once'
	}, function() {
		// Do nothing
	});
});

twiceDaily.addEventListener('click', function() {
	chrome.extension.sendRequest({
		time: 'twice'
	}, function() {
		// Do nothing
	});
});
