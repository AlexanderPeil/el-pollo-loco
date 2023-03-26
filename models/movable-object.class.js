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
    speedY = 0;
    acceleration = 1;


    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 25);
    }


    isAboveGround() {
        return this.y < 155;
    }

    // loadImage('img/test.png);
    loadImage(path) {
        this.img = new Image(); // this.img = document.geteElementById('image) <img id="image" src>
        this.img.src = path;
    }


    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    };


    drawFrame(ctx) {

        if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '5';
            ctx.strokeStyle = 'blue';
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }

    // Character is colliding chicken
    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
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

    moveRight() {
        this.x += this.speed;
    }

    // Animation to some objects like chickens or clouds. 
    // It decreases x (-=) with the speed variable and it refreshes 60/sec = 60 fps.
    moveLeft() {
        this.x -= this.speed;
    }

    jump() {
        this.speedY = 20;
    }
}