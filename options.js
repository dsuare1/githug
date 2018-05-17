let onceADay = document.querySelector('.once-a-day');
let twiceADay = document.querySelector('.twice-a-day');

onceADay.addEventListener('click', function() {
	// chrome.storage.sync.set({ interval: 1000 * 60 * 60 * 24 }, function() {
	// chrome.storage.sync.set({ interval: 1000 * 3 }, function() {
	console.log('storage is set to five seconds');
	// });
	chrome.extension.sendRequest({
		interval: 1000 * 5
	});
});

twiceADay.onclick = function() {
	// chrome.storage.sync.set({ interval: 1000 * 60 * 60 * 12 }, function() {
	// chrome.storage.sync.set({ interval: 1000 * 10 }, function() {
	console.log('storage is set to ten seconds');
	// });
	chrome.extension.sendRequest({
		interval: 1000 * 10
	}, function() {
		console.log('request sent');
	});
};
