class ThrowableObject extends MovableObject {

    ROTATING_IMAGES = [
        './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    characterDirection;

    constructor(x, y, otherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.ROTATING_IMAGES);
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
        setInterval(() => {
            this.playAnimation(this.ROTATING_IMAGES);
        })
    }
}