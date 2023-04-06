class World {
    character = new Character();
    level = level1;
    canvas; // *1 We need this canvas in this class in the function draw() for clearRect 
    ctx;
    keyboard;
    camera_x = 0;
    statusbarHealth = new StatusbarHealth();
    throwableObjects = [];
    statusbarBottle = new Bottlebar();
    statusbarCoin = new Coinbar();
    bottleSound = new Audio('./audio/bottle.mp3');
    coinSound = new Audio('./audio/coin.mp3');
    deadChicken = new Audio('./audio/chicken.mp3');

    // *2
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d'); // *2 We get this canvas from the game.js with the params in the constructor
        this.canvas = canvas; // *1 This canvas is the canvas variable above the constructor. 
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    // We "give" the variable world to the class character. So you can use 
    // the variable keyboard in the class character
    setWorld() {
        this.character.world = this;    // So we "give" the variable wold to the character class
    }


    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.collectBottles();
            this.collectCoins();
        }, 1000 / 25);
    }


    checkThrowObjects() {
        if (this.keyboard.E && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.character.otherDirection);
            this.throwableObjects.push(bottle);
            this.character.bottles -= 10;
        }
    }


    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isHurt()) {
                if (this.character.isAboveGround()) {
                    this.killChicken(enemy);
                } else {
                    this.character.hit();
                    this.statusbarHealth.setPercentage(this.character.energy);
                }
            }
        });
    }


    killChicken(enemy) {
        this.character.speedY = 18;
        this.deadChicken.play();
        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 100);
    }


    deleteEnemy(enemy) {
        let i = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(i, 1);
    }


    checkHitEndboss() {
        if (bottle.isColliding(endboss)) {
            endboss.hitEndboss(endboss.energy);
        }
    }


    collectBottles() {
        this.level.bottles.forEach((bottle) => {
            if (this.character.isColliding(bottle) && this.character.bottles < 50) {
                this.bottleCollected(bottle);
                this.bottleSound.play();
                this.character.addBottle();
                this.statusbarBottle.setPercentage(this.character.bottles);
            }
        });
    }


    collectCoins() {
        this.level.coins.forEach((coin) => {
            if (this.character.isColliding(coin)) {
                this.coinCollected(coin);
                this.coinSound.play();
                this.character.addCoin();
                this.statusbarCoin.setPercentage(this.character.coins);
            }
        })
    }


    bottleCollected(bottle) {
        let i = this.level.bottles.indexOf(bottle);
        this.level.bottles.splice(i, 1);
    }


    coinCollected(coin) {
        let i = this.level.coins.indexOf(coin);
        this.level.coins.splice(i, 1);
    }


    draw() {
        // *1 clearRect clears the canvas too draw the next image. 
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);// Pushes draw the ctx to the left side
        // Then we draw our elements in the ctx
        this.addObjectsToMap(this.level.backgroundObjects);

        this.ctx.translate(-this.camera_x, 0);
        // --------- Space for fixed objects -----
        this.addToMap(this.statusbarHealth);
        this.addToMap(this.statusbarBottle);
        this.addToMap(this.statusbarCoin);
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.endboss);
        this.addObjectsToMap(this.level.clouds);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.camera_x, 0); // Finally we push the ctx back to the right

        let self = this;
        requestAnimationFrame(function () { // The function will start async and draw will repeat as
            self.draw();                // many fps as the vido card its quality is good.
        });
    }


    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }


    /**
     * Checks if otherDirection is true (when push button <- or A) so the character walks into the other direction.
     *  First it saves the current state if the canvas (ctx.save()).
     * Then it translates the canvas along the x-axis (ctx.translate) and scales it horizontally by x-axis (ctx.scale).
     * Finally the method sets the x property of mo its negative value.
     * @param {object} mo - A param for a movable object (like the character)
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);


        // To restore otherDirection (false)
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }


    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}