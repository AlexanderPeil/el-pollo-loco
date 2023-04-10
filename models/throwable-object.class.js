class ThrowableObject extends MovableObject {

    ROTATING_IMAGES = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        './img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ]

    characterDirection;
    bottle_splash = new Audio('./audio/bottle-splash.mp3');


    constructor(x, y, otherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.ROTATING_IMAGES);
        this.loadImages(this.IMAGES_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.characterDirection = otherDirection;
        this.throw();
        this.animateBottle();
    }


    throw() {
        this.speedY = 15;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            if (this.characterDirection) {
                this.x -= 15;
            } else {
                this.x += 15;
            }
        }, 25);
        setTimeout(() =>{
            clearInterval(throwInterval);
        }, 1000)
    }


    animateBottle() {
        this.splash = setInterval(() => {
            if (this.y > 350 || world.collidesWithEndboss) {
                this.collisionAnimation();
            } else {
                this.playAnimation(this.ROTATING_IMAGES);
            }
        }, 1000 / 60);
        
        setInterval(() => world.collidesWithEndboss = false, 100);
    }


    collisionAnimation() {
        this.playAnimation(this.IMAGES_SPLASH);
        this.x = 0;
        this.bottle_splash.play();
        clearInterval(this.splash);
    }
}