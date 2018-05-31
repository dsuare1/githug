let onceDaily = document.querySelector('.once-daily');
let twiceDaily = document.querySelector('.twice-daily');

document.addEventListener('DOMContentLoaded', function() {
    onceDaily.addEventListener('click', function() {
        chrome.alarms.create('once', {
            delayInMinutes: 1440, periodInMinutes: 0.2
        });
    });

    twiceDaily.addEventListener('click', function() {
        chrome.alarms.create('once', {
            delayInMinutes: 0.1, periodInMinutes: 0.2
        });
    });
});
