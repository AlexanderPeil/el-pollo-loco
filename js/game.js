let canvas;
let world;
let keyboard = new Keyboard();
let intervalIds = [];

// Time must be increased after I'm finished with programming the game
function startGame() {
    setTimeout(() => {
        initLevel();
        hideElements();
        mobileButtons();
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


function hideElements() {
    document.getElementById('start-screen').classList.add('d-none');
    document.getElementById('canvas').classList.remove('d-none');
    document.getElementById('start-btn').classList.add('d-none');
}


window.addEventListener('keydown', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if(e.keyCode == 65) {
        keyboard.A = true;
    }

    if(e.keyCode == 83) {
        keyboard.S = true;
    }

    if(e.keyCode == 68) {
        keyboard.D = true;
    }

    if(e.keyCode == 87) {
        keyboard.W = true;
    }

    if(e.keyCode == 69) {
        keyboard.E = true;
    }

    // console.log(e);
});


window.addEventListener('keyup', (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if(e.keyCode == 65) {
        keyboard.A = false;
    }

    if(e.keyCode == 83) {
        keyboard.S = false;
    }

    if(e.keyCode == 68) {
        keyboard.D = false;
    }

    if(e.keyCode == 87) {
        keyboard.W = false;
    }

    if(e.keyCode == 69) {
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