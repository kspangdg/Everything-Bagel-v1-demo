/**
 * A class for creating sprites
 * 
 * @class EB_Sprite
 * @param {object} position - The position of the sprite in X and Y coordinates
 * @param {int} angle - The angle of the sprite in degrees
 * @param {int} width - The width of the sprite
 * @param {int} height - The height of the sprite
 * @param {string} image_src - The source of the image for the sprite
 * @param {int} frames_max - The number of frames in the sprite image
 * @param {object} collision_box - The collision box for the sprite
 * @param {bool} collision_box.active - If the collision box is active
 * @param {object} collision_box.offset - The offset of the collision box in X and Y coordinates
 * @param {int} collision_box.width - The width of the collision box
 * @param {int} collision_box.height - The height of the collision box
 */

class EB_Sprite {
    constructor({
      position = {x: 0, y: 0},
      angle = 0,
      size = {w: 0, h: 0},
      image_src = '',
      frames_max = 1,
      collision_box = {
        active: false,
        offset: {x: 0, y: 0},
        width: 0,
        height : 0
      }
    }) {
      this.position = position;
      this.angle = angle;
      this.size = size;
      this.image_src = image_src;
      if (this.image_src != '') {
        this.image = new Image();
        this.image_loaded = false;
        this.image.onload = () => {
          this.image_loaded = true;
        }
        this.image.src = this.image_src;
        this.frames_max = frames_max;
        this.frames_current = 0;
        this.frames_elapsed = 0;
        this.frames_hold = 5;
        this.flip = false;
      }
      this.collision_box = collision_box;
    }
  
    draw() {
      if (this.image_src != '') {
        // if (this.angle) {
        //   game.context.save();
        //   game.context.translate((this.image.width / this.frames_max) / 2, this.image.height / 2);
        //   game.context.rotate(this.angle);
        //   x = (this.position.x * -1) - ((this.image.width / this.frames_max) / 2);
        //   y = (this.position.y * -1) - (this.image.height / 2);
        // }
        if (this.flip) {
          game.context.save();
          game.context.translate(this.position.x + (this.image.width / this.frames_max), this.position.y);
          game.context.scale(-1, 1);
        }
        game.context.drawImage(
          this.image,
          this.frames_current * (this.image.width / this.frames_max),
          0,
          this.image.width / this.frames_max,
          this.image.height,
          (this.flip ? 0 : this.position.x),
          (this.flip ? 0 : this.position.y),
          (this.image.width / this.frames_max),
          this.image.height
        )
        if (this.flip) game.context.restore()
        if (game.debug) debug();
        if (this.collision_box.active) {
          this.update_collision_box();
          game.context.beginPath();
          game.context.rect(this.collision_box.x, this.collision_box.y, this.collision_box.width, this.collision_box.height);
          if (game.debug) game.context.stroke();
        }
      } else {
        game.context.beginPath();
        game.context.rect(this.position.x, this.position.y, this.size.w, this.size.h);
        game.context.stroke();
        if (this.collision_box.active) {
          this.update_collision_box();
          game.context.beginPath();
          game.context.rect(this.collision_box.x, this.collision_box.y, this.collision_box.width, this.collision_box.height);
          if (game.debug) game.context.stroke();
        }        
      }
    }
  
    animate() {
      this.frames_elapsed++
      if (this.frames_elapsed % this.frames_hold === 0) {
          if (this.frames_current < this.frames_max - 1) {
            this.frames_current++
          } else {
            this.frames_current = 0
          }
      }
    }

    debug() {
      game.context.beginPath();
      game.context.rect(
        this.position.x,
        this.position.y,
        (this.image.width / this.frames_max), 
        this.image.height
      );
      game.context.stroke();
    }

    update_collision_box() {
      this.collision_box['x'] = this.position.x + this.collision_box.offset.x;
      this.collision_box['y'] = this.position.y + this.collision_box.offset.y;
      if (this.collision_box.width == 0 || this.collision_box.height == 0) {
        this.collision_box.width = this.size.w;
        this.collision_box.height = this.size.h;
      }
      this.collision_box['left'] = this.position.x + this.collision_box.offset.x;
      this.collision_box['top'] = this.position.y + this.collision_box.offset.y;
      this.collision_box['right'] = (this.position.x + this.collision_box.offset.x) + this.collision_box.width;
      this.collision_box['bottom'] = (this.position.y + this.collision_box.offset.y) + this.collision_box.height;
    }
  
    update() {
      this.draw()
      if (this.image_src != '') this.animate()
    }
  }