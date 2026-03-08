// 1. SELECTING ALL THE PARTS NEEDED //
const alertAudio = document.getElementById('alert-audio');
const alertSelect = document.getElementById('alert-select');
const bgSelect = document.getElementById('bg-select');

const timerDisplay = document.getElementById('timer-display');
const timerInput = document.getElementById('timer-input');
const settingsModal = document.getElementById('settings-modal');

// Buttons //
const openSettingsBtn = document.getElementById('open-settings');
const closeSettingsBtn = document.getElementById('close-settings');
const saveSettingsBtn = document.getElementById('save-settings');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// 2. SETTING THE INITIAL STATE //
let timeLeft = 25 * 60; // Start with 25 minutes converted to seconds //
let timerId = null;

// 3. UPDATING THE SCREEN //
// Convert seconds into a MM:SS format //
function updateDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`; // Make sure "5:1" looks like "05:01" //
}

// 4. THE SETTINGS FLOW (Critical User Flow) //
// Open the popup //
openSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.remove('hidden');
});

// Close the popup without saving //
closeSettingsBtn.addEventListener('click', () => {
    settingsModal.classList.add('hidden');
});

// Save changes (Data retrieval) //
saveSettingsBtn.addEventListener('click', () => {
    const userMinutes = parseInt(timerInput.value); // Get number from input //
    
    if (userMinutes > 0 && userMinutes <= 60) {

        const selectedSound = alertSelect.value;
        
        if (selectedSound === 'ding') {
            alertAudio.src = 'Sounds/Ding sound.mp3';
        } else if (selectedSound === 'chime') {
            alertAudio.src = 'Sounds/Glass Chime sound.mp3';
        } else if (selectedSound === 'bird') {
            alertAudio.src = 'Sounds/Bird Chirp sound.mp3';
        }

        timeLeft = userMinutes * 60; // Set new time //
        updateDisplay();             // Refresh the screen //
        settingsModal.classList.add('hidden'); // Close the box //
        
    } else {
        alert("Please enter a number between 1 and 60.");
    }

    // 1. Remove old backgrounds
    document.body.classList.remove('forest', 'mountain', 'river');
    
    // 2. Add the new background based on selection
    document.body.classList.add(bgSelect.value);
    
    settingsModal.classList.add('hidden');
});

// 5. TIMER CONTROLS //
startBtn.addEventListener('click', () => {
    if (timerId !== null) return; // Don't start if it's already running //
    
    timerId = setInterval(() => {
        timeLeft--;
        updateDisplay();
        
        if (timeLeft <= 0) {
            clearInterval(timerId);
            timerId = null;
            alertAudio.play();
            // Use a tiny delay (100ms) for the alert. //
            setTimeout(() => {
                alert("Time to rest your eyes!");
            }, 100);
        }
    }, 1000);
});

pauseBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerId);
    timerId = null;
    timeLeft = 25 * 60; // Reset to default //
    updateDisplay();
});
