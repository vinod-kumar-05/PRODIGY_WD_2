let startTime;
let running = false;
let laps = [];

function startPause() {
    if (!running) {
        start();
    } else {
        pause();
    }
}

function start() {
    startTime = new Date().getTime() - (laps.reduce((acc, lap) => acc + lap, 0) || 0);
    running = true;
    document.getElementById('startPause').innerText = 'Pause';
    update();
}

function pause() {
    running = false;
    document.getElementById('startPause').innerText = 'Resume';
}

function reset() {
    running = false;
    startTime = null;
    laps = [];
    document.getElementById('startPause').innerText = 'Start';
    update();
    updateLaps();
}

function lap() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        laps.push(lapTime);
        updateLaps();
    }
}

function update() {
    if (running) {
        const currentTime = new Date().getTime() - startTime;
        const formattedTime = formatTime(currentTime);
        document.getElementById('display').innerText = formattedTime;
        setTimeout(update, 10);
    }
}

function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = time % 1000;

    return (
        pad(hours) + ':' +
        pad(minutes) + ':' +
        pad(seconds) + '.' +
        padMilliseconds(milliseconds)
    );
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function padMilliseconds(num) {
    return num.toString().padStart(3, '0');
}

function updateLaps() {
    const lapsElement = document.getElementById('laps');
    lapsElement.innerHTML = '';
    laps.forEach((lapTime, index) => {
        const lapItem = document.createElement('li');
        lapItem.innerText = `Lap ${index + 1}: ${formatTime(lapTime)}`;
        lapsElement.appendChild(lapItem);
    });
}