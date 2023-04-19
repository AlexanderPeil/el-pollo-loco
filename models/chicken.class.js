class Chicken extends MovableObject {
    y = 357;
    width = 70;
    height = 70;

    offset = {
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    IMAGE_DEAD = [
        './img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGE_DEAD);
        this.x = 600 + Math.random() * 2700;
        this.speed = 0.15 + Math.random() * 0.5;
        this.animate();
    }


    animate() {
        this.move = setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);

        this.walking = setInterval(() => {
            if (this.isDead()) {
                this.loadImage(this.IMAGE_DEAD);
                this.deadChicken()
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 150);
    }

    deadChicken() {
        setTimeout(() => {
            clearInterval(this.move);
            clearInterval(this.walking);
        }, 50);
    }
}