// 1. SELECTING ALL THE PARTS NEEDED //
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
        timeLeft = userMinutes * 60; // Set new time //
        updateDisplay();             // Refresh the screen //
        settingsModal.classList.add('hidden'); // Close the box //
        console.log("Timer updated to: " + userMinutes + " minutes");
    } else {
        alert("Please enter a number between 1 and 60.");
    }
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
            alert("Mindful break time!");
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
