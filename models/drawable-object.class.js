class DrawableObject {
    img;
    imageCache = {};
    currenImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;


        // loadImage('img/test.png);
        loadImage(path) {
            this.img = new Image(); // this.img = document.geteElementById('image) <img id="image" src>
            this.img.src = path;
        }


        drawFrame(ctx) {

            if (this instanceof Character || this instanceof Chicken || this instanceof SmallChicken) {
                ctx.beginPath();
                ctx.lineWidth = '5';
                ctx.strokeStyle = 'blue';
                ctx.rect(this.x, this.y, this.width, this.height);
                ctx.stroke();
            }
        }
    
    
        draw(ctx) {
            ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
        }


    /**
     * Takes an array of image paths and loads them into a cache. It uses the forEach() method to iterate over each path in the array and creates a new Image object for each path.
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...] 
     */
    loadImages(arr) {
        arr.forEach((path) => {

            let img = new Image();
            img.src = path;
            img.style = 'transform: scaleX(-1)';
            this.imageCache[path] = img;
        });
    }
}