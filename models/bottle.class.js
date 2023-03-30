class Bottle extends MovableObject {
    width = 100;
    height = 100;
    // y = 340;

    BOTTLE_IMAGES = [
        './img/6_salsa_bottle/salsa_bottle.png'
    ];

    constructor() {
        super().loadImage(this.BOTTLE_IMAGES[0]);
        // this.loadImages(this.BOTTLE_IMAGES);

        this.x = 200 + Math.random() * 2800;
        this.y = 120 + Math.random() * 200;
    }
}