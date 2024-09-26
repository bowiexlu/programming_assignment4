// Array to hold audios from JSON file
let audios = {
    pad1: [],
    pad2: []
};
// Track the current active pad (1 or 2)
let currentPad = 1;

const keysPad1 = ['q', 'a', 'z', 'w', 's', 'x', 'e', 'd', 'c', 'r', 'f', 'v'];
const keysPad2 = ['p', 'l', ',', 'o', 'k', 'm', 'i', 'j', 'n', 'u', 'h', 'b'];

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

    // Use a loop to create buttons for pad1
    for (let i = 0; i < audios.pad1.length; i++) {
        const button = document.createElement('div');
        button.classList.add('btn');
        button.id = `pad1-btn-${i}`;
        button.innerText = `Pad 1 - ${keysPad1[i]}`;
        button.addEventListener('click', () => playAudio(audios.pad1[i]));
        pad1Container.appendChild(button);
    }

    // Use a loop to create buttons for pad2
    for (let i = 0; i < audios.pad2.length; i++) {
        const button = document.createElement('div');
        button.classList.add('btn');
        button.id = `pad2-btn-${i}`;
        button.innerText = `Pad 2 - ${keysPad2[i]}`;
        button.addEventListener('click', () => playAudio(audios.pad2[i]));
        pad2Container.appendChild(button);
    }

    // Initially hide pad2, show pad1
    switchPad(1);
}

// Switch between pads (Pad 1 and Pad 2)
function switchPad(padNumber) {
    currentPad = padNumber;
    
    if (padNumber === 1) {
        document.getElementById('pad1').style.display = 'flex';
        document.getElementById('pad2').style.display = 'none';
    } else {
        document.getElementById('pad1').style.display = 'none';
        document.getElementById('pad2').style.display = 'flex';
    }
}

// Function to toggle between pads when the button is clicked
function togglePad() {
    if (currentPad === 1) {
        switchPad(2); // Switch to Pad 2
    } else {
        switchPad(1); // Switch to Pad 1
    }
}

// Play audio function
function playAudio(audioSrc) {
    const audioPlayer = document.getElementById('audio-player');
    audioPlayer.src = audioSrc;
    audioPlayer.play();
}

// Set up keypress event listener using a loop for efficiency
document.addEventListener('keypress', (event) => {
    let audioSrc = null;
    const key = event.key;

    if (currentPad === 1) {
        const index = keysPad1.indexOf(key);
        if (index !== -1) {
            audioSrc = audios.pad1[index];
        }
    } else if (currentPad === 2) {
        const index = keysPad2.indexOf(key);
        if (index !== -1) {
            audioSrc = audios.pad2[index];
        }
    }

    if (audioSrc) {
        playAudio(audioSrc);
    } else {
        console.log("Wrong Key");
    }
});

// Add event listener for 'Switch to Pad 1' and 'Switch to Pad 2'
document.querySelectorAll('.pad-change').forEach((padChangeBtn, index) => {
    padChangeBtn.addEventListener('click', () => {
        if (index === 0) {
            switchPad(1);
        } else {
            switchPad(2);
        }
    });
});

// Call the loadAudios function 
window.onload = loadAudios;