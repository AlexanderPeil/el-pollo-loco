class ThrowableObject extends MovableObject {

    // IMAGES = [
    //     './img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
    //     './img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
    //     './img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
    //     './img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    // ];
    characterDirection;

    constructor(x, y, otherDirection) {
        super().loadImage('./img/6_salsa_bottle/salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.characterDirection = otherDirection;
        this.throw();
    }

    throw() {
        this.speedY = 20;
        this.applyGravity();
        let throwInterval = setInterval(() => {
            console.log('intervall gestartet')
            if (this.characterDirection) {
                this.x -= 10;
            } else {
                this.x += 10;
            }
        }, 25);
        setTimeout(() =>{
            console.log('intervall gestoppt')
            clearInterval(throwInterval);
        }, 1000)
    }
}