class DrawableObject {
    img;
    imageCache = {};
    currenImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }


    // drawFrame(ctx) {
    //     if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken || this instanceof Bottle || this instanceof Endboss) {
    //         ctx.beginPath();
    //         ctx.lineWidth = '5';
    //         ctx.strokeStyle = 'transparent';
    //         ctx.rect(this.x, this.y, this.width, this.height);
    //         ctx.stroke();
    //     }
    // }


    draw(ctx) {
        // try {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        //     } catch (error) {
        //         console.warn('Error loading image', error);
        //         console.log('Could not load image', this.img.src);
        //     }
    }


    /**
     * Takes an array of image paths and loads them into a cache. It uses the forEach() method to iterate over each path in the array and creates a new Image object for each path.
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...] 
     */
    loadImages(arr) {   // arr for path of the images (string)
        arr.forEach((path) => {

            let img = new Image();  
            img.src = path;         
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;   
        });
    }
}