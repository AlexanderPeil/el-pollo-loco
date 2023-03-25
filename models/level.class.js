class Level {
    enemies;
    clouds;
    bottles;
    backgroundObjects;
    level_end_x = 3500;
    // The constructor will start first 
    constructor(enemies, clouds, bottles, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.bottles = bottles;
        this.backgroundObjects = backgroundObjects;
    };
}