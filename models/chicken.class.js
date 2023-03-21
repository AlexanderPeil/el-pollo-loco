class Chicken extends MovableObject{
    y = 357;
    width = 70;
    height = 70;

    constructor() {
        super().loadImage('./img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 200 + Math.random() * 500; // Number between 200 and 700
    }
}