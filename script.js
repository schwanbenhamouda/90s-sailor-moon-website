// Get references to elements
const heartIcon = document.getElementById('heartIcon');
const popupWindow = document.getElementById('popupWindow');
const closeBtn = document.getElementById('closeBtn');
const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const floppyIcon = document.getElementById('floppyIcon');
const floppyPopupWindow = document.getElementById('floppyPopupWindow');
const floppyCloseBtn = document.getElementById('floppyCloseBtn');
const mailIcon = document.getElementById('mailIcon');
const mailPopupWindow = document.getElementById('mailPopupWindow');
const mailCloseBtn = document.getElementById('mailCloseBtn');
const gameArea = document.getElementById('gameArea');
const gameScore = document.getElementById('gameScore');
const gameLives = document.getElementById('gameLives');
const magicFairySound = document.getElementById('magicFairySound');
const clockIcon = document.getElementById('clockIcon');
const clockPopupWindow = document.getElementById('clockPopupWindow');

let score = 0;
let lives = 3;
let spamImages = [];
let spamInterval;

// Add click sound functionality to all buttons and clickable elements
const clickSound = new Audio('click-sound.mp3'); // Ensure this file exists

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}

// Attach click sound to all buttons
const allButtons = document.querySelectorAll('button, .clickable-icon, .icon img');
allButtons.forEach(button => {
    button.addEventListener('click', () => {
        playClickSound();
    });
});



// Chibi Moon Mischief Timer
clockIcon.addEventListener('click', () => {
    startChibiMoonMischief();
});

function startChibiMoonMischief() {
    const chibiMoon = document.createElement('img');
    chibiMoon.src = 'chibi-moon.png'; // Ensure this image is available
    chibiMoon.alt = 'Chibi Moon';
    chibiMoon.classList.add('chibi-moon');

    // Randomly position Chibi Moon on the screen
    chibiMoon.style.position = 'absolute';
    chibiMoon.style.top = Math.random() * (window.innerHeight - 100) + 'px';
    chibiMoon.style.left = Math.random() * (window.innerWidth - 100) + 'px';

    document.body.appendChild(chibiMoon);

    // Add glitter animation around Chibi Moon
    const glitterInterval = setInterval(() => {
        const glitter = document.createElement('div');
        glitter.classList.add('glitter');
        glitter.style.position = 'absolute';
        glitter.style.top = Math.random() * (window.innerHeight - 10) + 'px';
        glitter.style.left = Math.random() * (window.innerWidth - 10) + 'px';
        glitter.style.width = '10px';
        glitter.style.height = '10px';
        glitter.style.backgroundColor = getRandomColor();
        glitter.style.borderRadius = '50%';
        glitter.style.boxShadow = '0 0 10px ' + getRandomColor();

        document.body.appendChild(glitter);

        // Remove glitter after a short time
        setTimeout(() => {
            document.body.removeChild(glitter);
        }, 1000);
    }, 200);

    // Remove Chibi Moon and glitter after 5 seconds
    setTimeout(() => {
        clearInterval(glitterInterval);
        if (document.body.contains(chibiMoon)) {
            document.body.removeChild(chibiMoon);
        }
    }, 5000);
}

function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Show the heart pop-up when clicking the heart icon
heartIcon.addEventListener('click', () => {
    popupWindow.classList.remove('hidden');
});

// Close the heart pop-up when clicking the close button
closeBtn.addEventListener('click', () => {
    popupWindow.classList.add('hidden');
});

// Add responses to Yes/No buttons
yesBtn.addEventListener('click', () => {
    alert("That's so cute! 💖");
    popupWindow.classList.add('hidden');
});

noBtn.addEventListener('click', () => {
    alert("No worries! You're awesome anyway! 😊");
    popupWindow.classList.add('hidden');
});

// Play sound on clicking icons
const icons = document.querySelectorAll('.icon img, #heartIcon');
icons.forEach(icon => {
    icon.addEventListener('click', () => {
        magicFairySound.play();
    });
});

// Open the floppy pop-up and play its sound
floppyIcon.addEventListener('click', () => {
    floppyPopupWindow.classList.remove('hidden');
    playFloppySound();
});

// Close the floppy pop-up and stop its sound
floppyCloseBtn.addEventListener('click', () => {
    floppyPopupWindow.classList.add('hidden');
    stopFloppySound();
});

function playFloppySound() {
    const floppySound = document.getElementById('floppySound');
    floppySound.loop = true;
    floppySound.play();
}

function stopFloppySound() {
    const floppySound = document.getElementById('floppySound');
    floppySound.pause();
    floppySound.currentTime = 0;
}

// Open mail popup
mailIcon.addEventListener('click', () => {
    mailPopupWindow.classList.remove('hidden');
    startSpamEffect();
    magicFairySound.play();
});

// Close mail popup
mailCloseBtn.addEventListener('click', () => {
    mailPopupWindow.classList.add('hidden');
    resetGame();
    clearInterval(spamInterval);
});

// Start spam effect
function startSpamEffect() {
    spamInterval = setInterval(() => {
        if (lives <= 0) {
            clearInterval(spamInterval);
            alert('Game Over!');
        } else {
            createSpamImage();
        }
    }, 1000);
}

// Create spam image and add to game area
function createSpamImage() {
    const spamImage = document.createElement('img');
    spamImage.src = 'spam.png';
    spamImage.alt = 'Spam';
    spamImage.classList.add('spam-image');

    // Fallback for missing image
    spamImage.onerror = () => {
        spamImage.src = 'fallback.png';
    };

    // Random position for the spam image
    spamImage.style.position = 'absolute';
    spamImage.style.top = Math.random() * (gameArea.offsetHeight - 50) + 'px'; 
    spamImage.style.left = Math.random() * (gameArea.offsetWidth - 50) + 'px';

    gameArea.appendChild(spamImage);

    // Click event to delete spam
    spamImage.addEventListener('click', () => {
        if (gameArea.contains(spamImage)) {
            gameArea.removeChild(spamImage);
            score++;
            gameScore.innerText = `Score: ${score}`;
        }
    });

    // Auto-remove spam after 3 seconds (lose a life)
    setTimeout(() => {
        if (gameArea.contains(spamImage)) {
            gameArea.removeChild(spamImage);
            lives--;
            gameLives.innerText = `Lives: ${lives}`;
        }
    }, 3000);

    spamImages.push(spamImage);
}

// Reset the game
function resetGame() {
    score = 0;
    lives = 3;
    gameScore.innerText = `Score: ${score}`;
    gameLives.innerText = `Lives: ${lives}`;

    spamImages.forEach(image => {
        if (gameArea.contains(image)) {
            gameArea.removeChild(image);
        }
    });
    spamImages = [];
}

// Make pop-up windows draggable
function makeDraggable(popup) {
    const header = popup.querySelector('.popup-header');
    let isDragging = false;
    let offsetX, offsetY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - popup.offsetLeft;
        offsetY = e.clientY - popup.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            popup.style.left = e.clientX - offsetX + 'px';
            popup.style.top = e.clientY - offsetY + 'px';
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
}

// Apply draggable functionality to all pop-ups
const popups = [mailPopupWindow, floppyPopupWindow, popupWindow, clockPopupWindow];
popups.forEach(popup => {
    if (typeof makeDraggable === 'function') {
        makeDraggable(popup);
    }
});
