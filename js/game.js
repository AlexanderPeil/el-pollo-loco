let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];
walking_sound = new Audio('./audio/running.mp3');
jumping_sound = new Audio('./audio/jump.mp3');
hurt_sound = new Audio('./audio/hurt.mp3');
death_sound = new Audio('./audio/death-sound.mp3');
win_sound = new Audio('./audio/win.mp3');
bottle_splash = new Audio('./audio/bottle-splash.mp3');
bottleSound = new Audio('./audio/bottle.mp3');
coinSound = new Audio('./audio/coin.mp3');
deadChicken = new Audio('./audio/chicken.mp3');
throwSound = new Audio('./audio/throw.mp3');
snoreSound = new Audio('./audio/snore.mp3');
game_music = new Audio('./audio/game-music.mp3');
game_music.loop = true;


// Time must be increased after I'm finished with the game
/**
 * Starts the game by initializing the level, hiding elements, setting up mobile buttons, 
 * showing game buttons, playing background music, and creating a new world object.
 */
function startGame() {
    setTimeout(() => {
        initLevel();
        hideElements();
        mobileButtons();
        showButtons();
        snoreSound.volume = 1;
        game_music.currentTime = 0;
        game_music.play();
        game_music.volume = 0.5;
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
    }, 500);
}


/**
 * Sets up a stoppable interval that calls a function repeatedly with a specified time interval.
 * @param {Function} fn - The function to be called repeatedly. 
 * @param {number} time - The time interval in milliseconds. 
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


/**
 * Stops all stoppable intervals that were previously set up using the setStoppableInterval function.
 */
function stopGame() {
    intervalIds.forEach(clearInterval);
}


/**
 * Shows game buttons by removing the 'd-none' class from their respective HTML elements.
 */
function showButtons() {
    document.getElementById('mute-sound').classList.remove('d-none');
    document.getElementById('fullscreen-btn').classList.remove('d-none');
    document.getElementById('controls-ingame').classList.remove('d-none');
}


/**
 * Shows the death screen by adding/removing specific classes to/from HTML elements after a delay of 500ms.
 */
function deathScreen() {
    setTimeout(() => {
        document.getElementById('canvas').classList.add('d-none');
        document.getElementById('mute-sound').classList.add('d-none');
        document.getElementById('unmute-sound').classList.add('d-none');
        document.getElementById('fullscreen-btn').classList.add('d-none');
        document.getElementById('mobile-btns-bottom').classList.add('d-none');
        document.getElementById('restart-container').classList.remove('d-none');
        document.getElementById('controls-ingame').classList.add('d-none');
        document.getElementById('exit-fullscreen').classList.add('d-none');
    }, 500);
}


/**
 * Hides elements of the start screen and shows the canvas
 */
function hideElements() {
      document.getElementById('start-screen').classList.add('d-none');
      document.getElementById('canvas').classList.remove('d-none');
      document.getElementById('button-container').classList.add('d-none');
      document.getElementById('startscreen-container').classList.add('mobile-height');
      document.getElementById('startscreen-container').classList.remove('mobile-height');
  }
  

/**
 * Restarts the game by hiding the death screen and calling the startGame function to initialize the game.
 */  
function restartGame() {
    document.getElementById('restart-container').classList.add('d-none');
    death_sound.pause();
    clearAllIntervals();
    startGame();
}


/**
 * Displays the "game won" screen and hides various elements of the game interface.
 */
function gameWon() {
    document.getElementById('game-over-screen-img').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('mute-sound').classList.add('d-none');
    document.getElementById('unmute-sound').classList.add('d-none');
    document.getElementById('fullscreen-btn').classList.add('d-none');
    document.getElementById('mobile-btns-bottom').classList.add('d-none');
    document.getElementById('controls').classList.add('d-none');
    document.getElementById('controls-ingame').classList.add('d-none');
    document.getElementById('exit-fullscreen').classList.add('d-none');

    setTimeout(() => {
        document.getElementById('game-over-screen-img').classList.add('d-none');
        document.getElementById('game-won-container').classList.remove('d-none');
    }, 2000);
}


/**
 * Reloads the current page, effectively returning the user to the main menu and resetting the game.
 */
function mainMenu() {
    window.location.reload();
}


/**
 * Mutes all sounds in the game by setting their volume to 0.
 * Also shows the "unmute sound" button.
 */
function muteSound() {
    document.getElementById('unmute-sound').classList.remove('d-none');
    walking_sound.volume = 0;
    jumping_sound.volume = 0;
    hurt_sound.volume = 0;
    death_sound.volume = 0;
    win_sound.volume = 0;
    bottle_splash.volume = 0;
    bottleSound.volume = 0;
    coinSound.volume = 0;
    deadChicken.volume = 0;
    throwSound.volume = 0;
    snoreSound.volume = 0;
    game_music.volume = 0;
}


/**
 * The unmuteSound() function in the code is used to unmute the game sounds.
 * Also it shows the "mute" button.
 */
function unmuteSound() {
    document.getElementById('unmute-sound').classList.add('d-none');
    document.getElementById('mute-sound').classList.remove('d-none');
    walking_sound.volume = 1;
    jumping_sound.volume = 1;
    hurt_sound.volume = 1;
    death_sound.volume = 1;
    win_sound.volume = 1;
    bottle_splash.volume = 1;
    bottleSound.volume = 1;
    coinSound.volume = 1;
    deadChicken.volume = 1;
    throwSound.volume = 1;
    snoreSound.volume = 1;
    game_music.volume = 0.5;
}


/**
 * Opens the controls menu, hiding the game container and mobile buttons.
 */
function openControls() {
    document.getElementById('controls-container').classList.remove('d-none');
    document.getElementById('game-container').classList.add('d-none');
    // document.getElementById('mobile-btns-bottom').classList.add('hide');
}


/**
 * Closes the controls menu, shows the mobile buttons.
 */
function closeControlsContainer() {
    document.getElementById('controls-container').classList.add('d-none');
    document.getElementById('game-container').classList.remove('d-none');
    // document.getElementById('mobile-btns-bottom').classList.remove('hide');
}


/**
 * Shows the story container and hides the game container and mobile buttons at the bottom.
 */
function openStoryContainer() {
    document.getElementById('story-container').classList.remove('d-none');
    document.getElementById('game-container').classList.add('d-none');
    document.getElementById('mobile-btns-bottom').classList.add('d-none');
    document.getElementById('mobile-btns-bottom').classList.add('d-none');
}


/**
 * Closes the story container and shows the game container.
 */
function closeStoryContainer() {
    document.getElementById('story-container').classList.add('d-none');
    document.getElementById('game-container').classList.remove('d-none');
    document.getElementById('mobile-btns-bottom').classList.remove('d-none');
    document.getElementById('mobile-btns-bottom').classList.remove('d-none');
}


/**
 * Toggles fullscreen mode for the game container element.
 */
function fullscreen() {
    let gameContainer = document.getElementById('game-container');
    enterFullscreen(gameContainer);
}


/**
 * Requests fullscreen mode for a given element.
 * @param {HTMLElement} element - The element to enter fullscreen mode. 
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    }
    fullscreenStyle();
}


/**
 * Applies CSS styling to elements when the game enters fullscreen mode.
 */
function fullscreenStyle() {
    document.getElementById('restart-container').classList.add('canvasFullscreen');
    document.getElementById('game-won-container').classList.add('canvasFullscreen');
    document.getElementById('canvas').classList.add('canvasFullscreen');
    document.getElementById('fullscreen-btn').classList.add('d-none');
    document.getElementById('exit-fullscreen').classList.remove('d-none');
}


/**
 * Exits fullscreen mode and removes fullscreen styles from elements.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitRequestFullscreen) {
        document.webkitRequestFullscreen();
    }
    removeFullscreenStyle();
}


/**
 * Removes the fullscreen styles from various elements on the page.
 * Restores the fullscreen button and hides the exit fullscreen button.
 */
function removeFullscreenStyle() {
    document.getElementById('restart-container').classList.remove('canvasFullscreen');
    document.getElementById('game-won-container').classList.remove('canvasFullscreen');
    document.getElementById('canvas').classList.remove('canvasFullscreen');
    document.getElementById('fullscreen-btn').classList.remove('d-none');
    document.getElementById('exit-fullscreen').classList.add('d-none');
}


/**
 * Clears all JavaScript intervals with IDs between 1 and 9999.
 */
function clearAllIntervals() {
    for (let i = 1; i < 9999; i++)  window.clearInterval(i);
}


/**
 * Adds an event listener to the window object that listens for keydown events
 * and sets the corresponding value in the keyboard object to true if the keycode matches.
 * @param {Object} e - The event object.
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 65) {
        keyboard.A = true;
    }

    if (e.keyCode == 83) {
        keyboard.S = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }

    if (e.keyCode == 87) {
        keyboard.W = true;
    }

    if (e.keyCode == 69) {
        keyboard.E = true;
    }
});


/**
 * Event listener for keyup events that sets the corresponding property to false in the keyboard object.
 * @param {KeyboardEvent} e - The keyboard event object
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 65) {
        keyboard.A = false;
    }

    if (e.keyCode == 83) {
        keyboard.S = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }

    if (e.keyCode == 87) {
        keyboard.W = false;
    }

    if (e.keyCode == 69) {
        keyboard.E = false;
    }
});


/**
 * Initializes mobile controls for the game.
 */
function mobileButtons() {
    document.getElementById("canvas").addEventListener("touchstart", (e) => {
        e.preventDefault();
    });

    document.getElementById("btn-left").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.LEFT = true;
    });

    document.getElementById("btn-left").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    });

    document.getElementById("btn-right").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.RIGHT = true;
    });

    document.getElementById("btn-right").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    });

    document.getElementById("btn-jump").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.UP = true;
    });

    document.getElementById("btn-jump").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.UP = false;
    });

    document.getElementById("btn-throw").addEventListener("touchstart", (e) => {
        e.preventDefault();
        keyboard.E = true;
    });

    document.getElementById("btn-throw").addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.E = false;
    });

    document.getElementById('mobile-btns-bottom').classList.remove('d-none');
}