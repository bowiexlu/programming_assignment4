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
    
    if (padNumber === 1) {
        document.getElementById('pad1').style.display = 'flex';
        document.getElementById('pad2').style.display = 'none';
    } else {
        document.getElementById('pad1').style.display = 'none';
        document.getElementById('pad2').style.display = 'flex';
    }
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
        case 'q': 
            if (currentPad === 1) audioSrc = audios.pad1[0];
            break;
        case 'a': 
            if (currentPad === 1) audioSrc = audios.pad1[1];
            break;
        case 'z': 
            if (currentPad === 1) audioSrc = audios.pad1[2];
            break;
        case 'w': 
            if (currentPad === 1) audioSrc = audios.pad1[3];
            break;
        case 's': 
            if (currentPad === 1) audioSrc = audios.pad1[4];
            break;
        case 'x': 
            if (currentPad === 1) audioSrc = audios.pad1[5];
            break;
        case 'e': 
            if (currentPad === 1) audioSrc = audios.pad1[6];
            break;
        case 'd': 
            if (currentPad === 1) audioSrc = audios.pad1[7];
            break;
        case 'c': 
            if (currentPad === 1) audioSrc = audios.pad1[8];
            break;
        case 'r': 
            if (currentPad === 1) audioSrc = audios.pad1[9];
            break;
        case 'f': 
            if (currentPad === 1) audioSrc = audios.pad1[10];
            break;
        case 'v': 
            if (currentPad === 1) audioSrc = audios.pad1[11];
            break;
            
        case 'p': 
            if (currentPad === 2) audioSrc = audios.pad2[0];
            break;
        case 'l': 
            if (currentPad === 2) audioSrc = audios.pad2[1];
            break;
        case ',': 
            if (currentPad === 2) audioSrc = audios.pad2[2];
            break;
        case 'o': 
            if (currentPad === 2) audioSrc = audios.pad2[3];
            break;
        case 'k': 
            if (currentPad === 2) audioSrc = audios.pad2[4];
            break;
        case 'm': 
            if (currentPad === 2) audioSrc = audios.pad2[5];
            break;
        case 'i': 
            if (currentPad === 2) audioSrc = audios.pad2[6];
            break;
        case 'j': 
            if (currentPad === 2) audioSrc = audios.pad2[7];
            break;
        case 'n': 
            if (currentPad === 2) audioSrc = audios.pad2[8];
            break;
        case 'u': 
            if (currentPad === 2) audioSrc = audios.pad2[9];
            break;
        case 'h': 
            if (currentPad === 2) audioSrc = audios.pad2[10];
            break;
        case 'b': 
            if (currentPad === 2) audioSrc = audios.pad2[11];
            break;       


        default:
            console.log("Wrong Key");
            return;
    }
    
    if (audioSrc) playAudio(audioSrc);
});

// Add event listener for 'Switch to Pad 1' and 'Switch to Pad 2'
document.querySelectorAll('.pad-change').forEach((padChangeBtn, index) => {
    padChangeBtn.addEventListener('click', () => {
        if (index === 0) {
            // This is the first button (Pad 1)
            switchPad(1);
        } else {
            // This is the second button (Pad 2)
            switchPad(2);
        }
    });
});

// Call the loadAudios function 
window.onload = loadAudios;
