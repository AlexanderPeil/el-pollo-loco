class MovableObject {
    x = 120;
    y = 280;
    img;
    height = 150;
    width = 100;
    imageCache = {}; // A cache for all images
    currenImage = 0;
    speed = 0.15;
    otherDirection = false;

    // loadImage('img/test.png);
    loadImage(path) {
        this.img = new Image(); // this.img = document.geteElementById('image) <img id="image" src>
        this.img.src = path;
    }

    /**
     * Takes an array of image paths and loads them into a cache. It uses the forEach() method to iterate over each path in the array and creates a new Image object for each path.
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...] 
     */
    loadImages(arr) {
        arr.forEach((path) => {

            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    // plays an animation using a sequence of images. The function takes an array of image paths as input and cycles through the array to display each image in turn.
    // The function uses the modulo operator (%) to calculate the index of the current image to display.
    playAnimation(images) {
        let i = this.currenImage % this.IMAGES_WALKING.length; // let i = 0 % 6 (0 / 6 = 0 Rest 6 usw bis 6 / 6 = 1 Rest 0)
        let path = images[i];
        this.img = this.imageCache[path];
        this.currenImage++;
    }

    // moveRight() {
    //     console.log('Moving right');
    // }

    // Animation to some objects like chickens or clouds. 
    // It decreases x (-=) with the speed variable and it refreshes 60/sec = 60 fps.
    moveLeft() {
        setInterval( () => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}