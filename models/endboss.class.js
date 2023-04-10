class Endboss extends MovableObject {

    height = 400;
    width = 250;
    y = 60;
    speed = 20;

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

    hadFirstContact = false;

    constructor() {
        super().loadImage(this.IMAGES_ALERT[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.x = 3800;
        this.animate();
    }


    animate() {
        let i = 0;
        setInterval(() => {
            this.startEndbossFight(i);
            i++;
            if (this.endbossReached()) {
                i = 0;
                this.hadFirstContact = true;
            }
        }, 150);
    }


    startEndbossFight(i) {
        if (i < 15) {
            this.playAnimation(this.IMAGES_ALERT);
        } else if (!this.isDead() && !this.endbossIsHurt() && this.endbossFightBegins()) {
            this.playAnimation(this.IMAGES_WALKING);
            this.moveLeft();
        } else if (this.endbossIsHurt()) {
            this.playAnimation(this.IMAGES_HURT);
        } else if (this.isDead()) {
            this.deathRoutine();
        }
    }


    endbossFightBegins() {
        return world.character.x > world.level.endboss[0].x - 1000;
    }


    endbossReached() {
        return world.character.x > 3800 && !hadFirstContact;
    }


    deathRoutine() {
        this.playAnimation(this.IMAGES_DEAD);        
        win_sound.play();
    }
}