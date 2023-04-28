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
function startGame() {
    setTimeout(() => {
        initLevel();
        hideElements();
        mobileButtons();
        showButtons();
        snoreSound.volume = 1;
        game_music.currentTime = 0;
        game_music.play();
        // win_sound.volume = 1;
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
    }, 500);
}


function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}


function stopGame() {
    intervalIds.forEach(clearInterval);
}

function showButtons() {
    document.getElementById('mute-sound').classList.remove('d-none');
    document.getElementById('fullscreen-btn').classList.remove('d-none');
    document.getElementById('controls-ingame').classList.remove('d-none');
}


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


function hideElements() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('button-container').classList.add('d-none');
    // document.getElementById('start-btn').classList.add('d-none');
    // document.getElementById('controls').classList.add('d-none');
}


function restartGame() {
    document.getElementById('restart-container').classList.add('d-none');
    death_sound.pause();
    clearAllIntervals();
    startGame();
}


function gameWon() {
    document.getElementById('game-won-container').classList.remove('d-none');
    document.getElementById('canvas').classList.add('d-none');
    document.getElementById('mute-sound').classList.add('d-none');
    document.getElementById('unmute-sound').classList.add('d-none');
    document.getElementById('fullscreen-btn').classList.add('d-none');
    document.getElementById('mobile-btns-bottom').classList.add('d-none');
    document.getElementById('controls').classList.add('d-none');
    document.getElementById('controls-ingame').classList.add('d-none');
    document.getElementById('exit-fullscreen').classList.add('d-none');
}


function mainMenu() {
    window.location.reload();
}


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
}


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
}


function openControls() {
    document.getElementById('controls-container').classList.remove('d-none');
    document.getElementById('game-container').classList.add('d-none');
    document.getElementById('mobile-btns-bottom').classList.add('d-none');
    document.getElementById('mobile-btns-bottom').classList.add('d-none');
}


function closeControlsContainer() {
    document.getElementById('controls-container').classList.add('d-none');
    document.getElementById('game-container').classList.remove('d-none');
    document.getElementById('mobile-btns-bottom').classList.remove('d-none');
    document.getElementById('mobile-btns-bottom').classList.remove('d-none');
}


function openStoryContainer() {
    document.getElementById('story-container').classList.remove('d-none');
    document.getElementById('game-container').classList.add('d-none');
    document.getElementById('mobile-btns-bottom').classList.add('d-none');
    document.getElementById('mobile-btns-bottom').classList.add('d-none');
}


function closeStoryContainer() {
    document.getElementById('story-container').classList.add('d-none');
    document.getElementById('game-container').classList.remove('d-none');
    document.getElementById('mobile-btns-bottom').classList.remove('d-none');
    document.getElementById('mobile-btns-bottom').classList.remove('d-none');
}


function fullscreen() {
    let gameContainer = document.getElementById('game-container');
    enterFullscreen(gameContainer);
}


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


function fullscreenStyle() {
    document.getElementById('restart-container').classList.add('canvasFullscreen');
    document.getElementById('game-won-container').classList.add('canvasFullscreen');
    document.getElementById('canvas').classList.add('canvasFullscreen');
    document.getElementById('fullscreen-btn').classList.add('d-none');
    document.getElementById('exit-fullscreen').classList.remove('d-none');
}


function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitRequestFullscreen) {
        document.webkitRequestFullscreen();
    }
    removeFullscreenStyle();
}


function removeFullscreenStyle() {
    document.getElementById('restart-container').classList.remove('canvasFullscreen');
    document.getElementById('game-won-container').classList.remove('canvasFullscreen');
    document.getElementById('canvas').classList.remove('canvasFullscreen');
    document.getElementById('fullscreen-btn').classList.remove('d-none');
    document.getElementById('exit-fullscreen').classList.add('d-none');
}


function clearAllIntervals() {
    for (let i = 1; i < 9999; i++)  window.clearInterval(i);
}


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

    // console.log(e);
});


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

    // console.log(e);
});


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
}