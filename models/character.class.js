class Character extends MovableObject{
    height = 280;
    y = 155;
    speed = 10;
    IMAGES_WALKING = [
        './img/2_character_pepe/2_walk/W-21.png',
        './img/2_character_pepe/2_walk/W-22.png',
        './img/2_character_pepe/2_walk/W-23.png',
        './img/2_character_pepe/2_walk/W-24.png',
        './img/2_character_pepe/2_walk/W-25.png',
        './img/2_character_pepe/2_walk/W-26.png'
    ];

    world;
    walking_sound = new Audio('./audio/running.mp3');

constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);

    this.animate();
}

animate() {

    setInterval( () => {
        this.walking_sound.pause(); // The sound will play only if you push the walk button else it won't play
        if(this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x || this.world.keyboard.D && this.x < this.world.level.level_end_x) {
            this.x += this.speed;
            this.otherDirection = false;
            this.walking_sound.play();
        }

        if(this.world.keyboard.LEFT && this.x > 0 || this.world.keyboard.A && this.x > 0) {
            this.x -= this.speed;
            this.otherDirection = true;
            this.walking_sound.play();
        }
        this.world.camera_x = -this.x + 100; // The character starts 100px right
    }, 1000/60);


    setInterval( () => {

        if(this.world.keyboard.RIGHT || this.world.keyboard.D || this.world.keyboard.LEFT || this.world.keyboard.A) {
            // Walk animation
            this.playAnimation(this.IMAGES_WALKING);
        }

    }, 50);
}

    jump() {

    }
}