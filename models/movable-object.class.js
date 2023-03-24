class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {};
    currenImage = 0;
    speed = 0.15;
    otherDirection = false;

    // loadImage('img/test.png);
    loadImage(path) {
        this.img = new Image(); // this.img = document.geteElementById('image) <img id="image" src>
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...] 
     */
    loadImages(arr) {
        arr.forEach((path) => {

            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }


    playAnimation(images) {
        let i = this.currenImage % this.IMAGES_WALKING.length; // let i = 0 % 6 (0 / 6 = 0 Rest 6 usw bis 6 / 6 = 1 Rest 0)
        let path = images[i];
        this.img = this.imageCache[path];
        this.currenImage++;
    }

    // moveRight() {
    //     console.log('Moving right');
    // }


    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}