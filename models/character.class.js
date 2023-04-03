class Character extends MovableObject {
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

    IMAGES_JUMPING = [
        './img/2_character_pepe/3_jump/J-31.png',
        './img/2_character_pepe/3_jump/J-32.png',
        './img/2_character_pepe/3_jump/J-33.png',
        './img/2_character_pepe/3_jump/J-34.png',
        './img/2_character_pepe/3_jump/J-35.png',
        './img/2_character_pepe/3_jump/J-36.png',
        './img/2_character_pepe/3_jump/J-37.png',
        './img/2_character_pepe/3_jump/J-38.png',
        './img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_DEAD = [
        './img/2_character_pepe/5_dead/D-51.png',
        './img/2_character_pepe/5_dead/D-52.png',
        './img/2_character_pepe/5_dead/D-53.png',
        './img/2_character_pepe/5_dead/D-54.png',
        './img/2_character_pepe/5_dead/D-55.png',
        './img/2_character_pepe/5_dead/D-56.png',
        './img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_HURT = [
        './img/2_character_pepe/4_hurt/H-41.png',
        './img/2_character_pepe/4_hurt/H-42.png',
        './img/2_character_pepe/4_hurt/H-43.png'
    ];

    world; // So we can use the variable of the class world (i.e. keyboard)
    walking_sound = new Audio('./audio/running.mp3');
    jumping_sound = new Audio('./audio/jump.mp3');

    constructor() { 	// If somewhere new Character is called then this function will execute
        super().loadImage(this.IMAGES_WALKING[0]); // super() = from over class movableObject
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.applyGravity();
        this.animate();
    }

    animate() {

        setInterval(() => {
            this.walking_sound.pause(); // The sound will play only if you push the walk button else it won't play
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x || this.world.keyboard.D && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.LEFT && this.x > 0 || this.world.keyboard.A && this.x > 0) {
                this.moveLeft();
                this.otherDirection = true;
                if (!this.isAboveGround()) {
                    this.walking_sound.play();
                }
            }

            if (this.world.keyboard.UP && !this.isAboveGround() || this.world.keyboard.SPACE && !this.isAboveGround()) {
                this.jump();
            }

            if (this.world.keyboard.E) {
                // this.throw();
            }

            this.world.camera_x = -this.x + 100; // The character starts 100px right
        }, 1000 / 60);


        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
            } else {

                if (this.world.keyboard.RIGHT || this.world.keyboard.D || this.world.keyboard.LEFT || this.world.keyboard.A) {
                    // Walk animation
                    this.playAnimation(this.IMAGES_WALKING);
                }
            }
        }, 50);
    }

    jump() {
        this.speedY = 20;
        this.jumping_sound.play();
    }
}