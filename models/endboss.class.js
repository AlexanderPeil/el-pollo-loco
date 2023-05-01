class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    speed = 25;

    offset = {
        top: 90,
        bottom: 40,
        left: 40,
        right: 40
    }


    IMAGES_ALERT = [
        './img/4_enemie_boss_chicken/2_alert/G5.png',
        './img/4_enemie_boss_chicken/2_alert/G6.png',
        './img/4_enemie_boss_chicken/2_alert/G7.png',
        './img/4_enemie_boss_chicken/2_alert/G8.png',
        './img/4_enemie_boss_chicken/2_alert/G9.png',
        './img/4_enemie_boss_chicken/2_alert/G10.png',
        './img/4_enemie_boss_chicken/2_alert/G11.png',
        './img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    IMAGES_ATTACK = [
        './img/4_enemie_boss_chicken/3_attack/G13.png',
        './img/4_enemie_boss_chicken/3_attack/G14.png',
        './img/4_enemie_boss_chicken/3_attack/G15.png',
        './img/4_enemie_boss_chicken/3_attack/G16.png',
        './img/4_enemie_boss_chicken/3_attack/G17.png',
        './img/4_enemie_boss_chicken/3_attack/G18.png',
        './img/4_enemie_boss_chicken/3_attack/G19.png',
        './img/4_enemie_boss_chicken/3_attack/G20.png'
    ]

    IMAGES_WALKING = [
        './img/4_enemie_boss_chicken/1_walk/G1.png',
        './img/4_enemie_boss_chicken/1_walk/G2.png',
        './img/4_enemie_boss_chicken/1_walk/G3.png',
        './img/4_enemie_boss_chicken/1_walk/G4.png'
    ];

    IMAGES_HURT = [
        './img/4_enemie_boss_chicken/4_hurt/G21.png',
        './img/4_enemie_boss_chicken/4_hurt/G22.png',
        './img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        './img/4_enemie_boss_chicken/5_dead/G24.png',
        './img/4_enemie_boss_chicken/5_dead/G25.png',
        './img/4_enemie_boss_chicken/5_dead/G26.png'
    ]


    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3800;
        this.startEndbossFight();
    }


    /**
     * Begins the endboss fight sequence and repeatedly executes actions until the endboss is defeated or the character dies
     */
    startEndbossFight() {
        setStoppableInterval(() => {
            if (this.distanceCharacterEndboss() >= 500 && !this.endbossIsHurt()) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.distanceCharacterEndboss() < 40 && !this.endbossIsHurt()) {
                this.playAnimation(this.IMAGES_ATTACK);
            } else if (this.endbossIsHurt()) {
                this.playAnimation(this.IMAGES_HURT);
                deadChicken.play();
            } else if (this.isDead()) {
                this.deathRoutine();
            } else if (!this.isDead() && !this.endbossIsHurt() && this.endbossFightBegins()) {
                this.endbossIsWalking();
            }
        }, 150);
    }


    /**
     * Check if the endboss fight begins, which occurs when the character reaches a certain distance to the endboss.
     * @returns {boolean} True if the character is close enough to the endboss.
     */
    endbossFightBegins() {
        return world.character.x > world.level.endboss[0].x - 1000;
    }


    /**
     * Calculates the distance between the character and the end boss.
     * @returns {number} The distance between the character and the end boss.
     */
    distanceCharacterEndboss() {
        return this.x - world.character.x;
    }


    /**
     * Plays the animation for the endboss walking, moves the endboss to the left, 
     * sets the "endbossReached" variable to true and starts the boss music while pausing the game music.
     */
    endbossIsWalking() {
        this.playAnimation(this.IMAGES_WALKING);
        this.moveLeft();
        endbossReached = true;
        boss_music.play();
        game_music.pause();
    }


    /**
     * Plays the death animation, pauses the game music, plays the win sound effect, and stops the game.
     * After a delay, the gameWon() function is called, and the snore sound effect and win sound effect are muted.
     */
    deathRoutine() {
        this.playAnimation(this.IMAGES_DEAD);
        boss_music.pause();
        win_sound.play();
        setTimeout(() => {
            clearAllIntervals();
            gameWon();
        }, 500);

        setTimeout(() => snoreSound.volume = 0, 1000);
        setTimeout(() => win_sound.volume = 0, 3000);
    }
}