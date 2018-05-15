let onceADay = document.querySelector('.once-a-day');
let twiceADay = document.querySelector('.twice-a-day');

onceADay.addEventListener('click', function() {
	// chrome.storage.sync.set({ interval: 1000 * 60 * 60 * 24 }, function() {
	chrome.storage.sync.set({ interval: 1000 * 3 }, function() {
		console.log('storage is set to three seconds');
	});
});

twiceADay.onclick = function() {
	// chrome.storage.sync.set({ interval: 1000 * 60 * 60 * 12 }, function() {
	chrome.storage.sync.set({ interval: 1000 * 10 }, function() {
		console.log('storage is set to ten seconds');
	});
};
