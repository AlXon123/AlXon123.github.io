let timer;
let audioContext;
let oscillator;

function setupAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    oscillator = audioContext.createOscillator();
    oscillator.type = 'sine'; 
    oscillator.connect(audioContext.destination);
}

function startMetronome() {
    const bpmInput = document.getElementById('bpmInput');
    const bpm = bpmInput.value;

    if (!bpm || isNaN(bpm)) {
        alert('Please enter a valid BPM value.');
        return;
    }

    const interval = 60000 / bpm;

    setupAudioContext();

    timer = setInterval(() => {
        playTickSound();
        console.log('Tick');
    }, interval);
}

function stopMetronome() {
    clearInterval(timer);
    oscillator.stop(); 
}

function playTickSound() {
    const tickOscillator = audioContext.createOscillator();
    tickOscillator.type = 'sine';
    tickOscillator.connect(audioContext.destination);
    
    tickOscillator.start();
    tickOscillator.stop(audioContext.currentTime + 0.1);
}

document.getElementById('startBtn').addEventListener('click', startMetronome);
document.getElementById('stopBtn').addEventListener('click', stopMetronome);

document.addEventListener('DOMContentLoaded', function() {
    var bpmInput = document.getElementById('bpmInput');
    var bpmValue = document.getElementById('bpmValue');

    bpmInput.addEventListener('input', function() {
        var currentBPM = bpmInput.value;
        bpmValue.textContent = currentBPM + ' BPM';
    });
});
