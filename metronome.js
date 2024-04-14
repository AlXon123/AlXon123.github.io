let audioContext;
let metronomeSound;
let timer;

function setupAudioContext() {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
}

function loadMetronomeSound() {
    const request = new XMLHttpRequest();
    request.open('GET', 'metronome-85688.mp3', true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
        audioContext.decodeAudioData(request.response, function(buffer) {
            metronomeSound = buffer;
        });
    };

    request.send();
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
    loadMetronomeSound();

    timer = setInterval(() => {
        playMetronomeSound();
        console.log('Tick');
    }, interval);
}

function stopMetronome() {
    clearInterval(timer);
}

function playMetronomeSound() {
    const source = audioContext.createBufferSource();
    source.buffer = metronomeSound;
    source.connect(audioContext.destination);
    source.start();
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