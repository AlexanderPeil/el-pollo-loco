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
    enbosshealthBar = new EndbossHealthBar();
    bottleSound = new Audio('./audio/bottle.mp3');
    coinSound = new Audio('./audio/coin.mp3');
    deadChicken = new Audio('./audio/chicken.mp3');
    throwSound = new Audio('./audio/throw.mp3');
    intervalIds = [];
    collidesWithEndboss = false;

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
            this.checkCollisionsWithChicken();
            this.checkCollisionsWithEndboss()
            this.checkThrowObjects();
            this.collectBottles();
            this.collectCoins();
            this.killEnemyWithBottle();
        }, 1000 / 25);
    }


    checkThrowObjects() {
        if (this.keyboard.E && this.character.bottles > 0) {
            let bottle = new ThrowableObject(this.character.x , this.character.y , this.character.otherDirection);
            this.throwSound.play();
            this.throwableObjects.push(bottle);
            this.character.bottles -= 10;
            this.statusbarBottle.setPercentage(this.character.bottles);
        }
    }


    checkCollisionsWithChicken() {
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

    checkCollisionsWithEndboss() {
        this.level.endboss.forEach((endboss) => {
            if (this.character.isColliding(endboss)) {
                this.character.hit();
                this.statusbarHealth.setPercentage(this.character.energy);
            }
        });
    }


    killChicken(enemy) {
        this.character.speedY = 30;
        this.deadChicken.play();
        enemy.chickenKilled();

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }


    killChickenWithBottle() {   
        this.throwableObjects.forEach((bottle) => {
            this.level.enemies.forEach(enemy => {
                if (bottle.isColliding(enemy)) {
                    this.chickenKilledWithBottle(enemy);
                }
            });
        });
    }


    chickenKilledWithBottle(enemy) {
        this.deadChicken.play();
        enemy.chickenKilled();

        setTimeout(() => {
            this.deleteEnemy(enemy);
        }, 500);
    }


    killEnemyWithBottle() {
        this.hitEndboss();
        this.killChickenWithBottle();
    }


    hitEndboss() {
        this.throwableObjects.forEach((bottle) => {
            this.level.endboss.forEach(endboss => {
                if (bottle.isColliding(endboss)) {
                    this.collidesWithEndboss = true;
                    endboss.hurtEndboss();
                    this.enbosshealthBar.setPercentage(world.level.endboss[0].energy);
                }
            });
        });
    }


    deleteEnemy(enemy) {
        let i = this.level.enemies.indexOf(enemy);
        this.level.enemies.splice(i, 1);
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
        this.addToMap(this.enbosshealthBar);
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