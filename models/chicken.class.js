class Chicken extends MovableObject{
    y = 357;
    width = 70;
    height = 70;
    IMAGES_WALKING = [
        './img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        './img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    constructor() {
        // super() is for the methods of the super-class
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        // And this we use to change variables of the super-class
        this.loadImages(this.IMAGES_WALKING);
                // Math random is a random number between 0 - 1 (i.e. 0.17)
        this.x = 600 + Math.random() * 2700; 
        this.speed = 0.15 + Math.random() * 0.5;

        this.animate();
        
    }


    animate() {
        this.moveLeft();

        setInterval( () => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 150);
    }
}