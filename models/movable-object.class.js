class MovableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 3;
    energy = 50;
    lastHit = 0;
    coins = 0;
    bottles = 0;
    timePassed; 

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } 
        }, 1000 / 25);
    }


    isAboveGround() {
        if (this instanceof ThrowableObject) { 
            return true;
        } else {
            return this.y < 155;
        }
    }


    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }


    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }


    isHurt() {
        this.timePassed = new Date().getTime() - this.lastHit; 
        this.timePassed = this.timePassed / 1000;                         
        return this.timePassed < 1;    
    }


    addCoin() {
        this.coins += 10;
    }


    addBottle() {
        this.bottles += 10;
    }


    hurtEndboss() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    

    endbossIsHurt() {
        let timePassed = new Date().getTime() - this.lastHit; 
        timePassed = timePassed / 1000;                         
        return timePassed < 1;    
    }


    isDead() {
        return this.energy == 0;
    }


    chickenKilled() {
        return this.energy = 0;
    }


    // plays an animation using a sequence of images. The function takes an array of image paths as input and cycles through the array to display each image in turn.
    // The function uses the modulo operator (%) to calculate the index of the current image to display.
    playAnimation(images) {
        let i = this.currenImage % images.length; // let i = 0 % 6 (0 / 6 = 0 Rest 6 usw bis 6 / 6 = 1 Rest 0)
        let path = images[i];
        this.img = this.imageCache[path];
        this.currenImage++;
    }


    moveRight() {
        this.x += this.speed;
    }

    // Animation to some objects like chickens or clouds. 
    // It decreases x (-=) with the speed variable and it refreshes 60/sec = 60 fps.
    moveLeft() {
        this.x -= this.speed;
    }
}