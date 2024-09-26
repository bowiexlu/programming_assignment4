// Array to hold audios from JSON file
let audios = {
    pad1: [],
    pad2: []
};
// Track the current active pad (1 or 2)
let currentPad = 1;

// Load audios from JSON file
async function loadAudios() {
    try {
        let response = await fetch("audios.json");
        let data = await response.json();
        audios.pad1 = data.pad1;
        audios.pad2 = data.pad2; 

        displayAudios();

    } catch (error) {
        console.error("Error loading audio files:", error);
    }
}

// Display audio function
function displayAudios() {
    const pad1Container = document.getElementById('pad1');
    const pad2Container = document.getElementById('pad2');

    // Clear previous buttons
    pad1Container.innerHTML = '';
    pad2Container.innerHTML = '';

    // Loop through pad1 audios and create buttons
    audios.pad1.forEach((audioSrc, index) => {
        const button = document.createElement('div');
        button.classList.add('btn');
        button.id = `pad1-btn-${index}`;
        button.innerText = `Pad 1 - ${index + 1}`;
        button.addEventListener('click', () => playAudio(audioSrc));
        pad1Container.appendChild(button);
    });

    // Loop through pad2 audios and create buttons
    audios.pad2.forEach((audioSrc, index) => {
        const button = document.createElement('div');
        button.classList.add('btn');
        button.id = `pad2-btn-${index}`;
        button.innerText = `Pad 2 - ${index + 13}`;
        button.addEventListener('click', () => playAudio(audioSrc));
        pad2Container.appendChild(button);
    });

    // Initially hide pad2, show pad1
    switchPad(1);
}

// Switch between pads (Pad 1 and Pad 2)
function switchPad(padNumber) {
    currentPad = padNumber;
    document.getElementById('pad1').style.display = padNumber === 1 ? 'flex' : 'none';
    document.getElementById('pad2').style.display = padNumber === 2 ? 'flex' : 'none';
}

// Play audio function
function playAudio(audioSrc) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = audioSrc;
    audioPlayer.play();
}

// Set up keypress event listener using a switch statement
document.addEventListener('keypress', (event) => {
    let audioSrc;
    switch (event.key) {
        case 'q': // Map 'q' key to first sound in pad1
            if (currentPad === 1) audioSrc = audios.pad1[0];
            break;
        case 'w': // Map 'w' key to second sound in pad1
            if (currentPad === 1) audioSrc = audios.pad1[1];
            break;
        case 'e': // Map 'e' key to third sound in pad1
            if (currentPad === 1) audioSrc = audios.pad1[2];
            break;
        case 'a': // Map 'a' key to first sound in pad2
            if (currentPad === 2) audioSrc = audios.pad2[0];
            break;
        case 's': // Map 's' key to second sound in pad2
            if (currentPad === 2) audioSrc = audios.pad2[1];
            break;
        case 'd': // Map 'd' key to third sound in pad2
            if (currentPad === 2) audioSrc = audios.pad2[2];
            break;
        // Add more key mappings for remaining buttons...
        default:
            console.log("Key not mapped to any sound");
            return;
    }
    
    if (audioSrc) playAudio(audioSrc);
});

// Call the loadAudios function when the page is loaded
window.onload = loadAudios;
