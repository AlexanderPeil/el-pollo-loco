let canvas;
let world;
let keyboard = new Keyboard();


function startGame() {
    setTimeout(() => {
        initLevel();
        hideElements();
        canvas = document.getElementById('canvas');
        world = new World(canvas, keyboard);
    }, 500);
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