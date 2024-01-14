/**
 * A class for creating backgrounds
 * 
 * @class EB_Background
 * 
 * @param {object} position - The position of the sprite in X and Y coordinates
 * @param {string} image_src - The source of the image for the sprite
 * @param {bool} loop - If the background should loop
 * @param {int} frames_max - The number of frames in the sprite image
 * @param {int} parallax - The parallax of the background
 * 
 */
class EB_Background extends EB_Sprite {
    constructor({ position, image_src, loop = false, frames_max = 1, parallax = 1}) {
      super({ position,image_src,frames_max,})
      this.loop = loop
      this.width = game.width
      this.height = game.height
      this.frames_current = 0
      this.frames_elapsed = 0
      this.frames_hold = 5
      this.parallax = parallax
    }

    draw() {
        game.context.drawImage(
          this.image,
          this.frames_current * (this.image.width / this.frames_max),
          0,
          this.image.width / this.frames_max,
          this.image.height,
          this.position.x,
          this.position.y,
          (this.image.width / this.frames_max),
          this.image.height
        );
        if (this.loop) {
            game.context.drawImage(
                this.image,
                this.frames_current * (this.image.width / this.frames_max),
                0,
                this.image.width / this.frames_max,
                this.image.height,
                this.position.x + this.width,
                this.position.y,
                (this.image.width / this.frames_max),
                this.image.height
            ); 
            game.context.drawImage(
                this.image,
                this.frames_current * (this.image.width / this.frames_max),
                0,
                this.image.width / this.frames_max,
                this.image.height,
                this.position.x - this.width,
                this.position.y,
                (this.image.width / this.frames_max),
                this.image.height
            );           
        }
    }
    update() {
        this.draw();
        if ((this.position.x < -(this.width) || this.position.x > this.width) && this.loop) {
            this.position.x = 0;
        }
    }
    position_x(speed) {
        this.position.x += speed * this.parallax;
    }
    position_y(speed) {
        this.position.y += speed * this.parallax;
    }
}