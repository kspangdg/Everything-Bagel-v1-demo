/**
 * A class for creating sprites
 * 
 * @class EB_Sprite
 * @param {object} position - The position of the sprite in X and Y coordinates
 * @param {object} size - The size of the sprite in width and height
 * @param {object} velocity - The velocity of the sprite in X and Y coordinates
 * @param {string} image_src - The source of the image for the sprite
 * @param {int} frames_max - The number of frames in the sprite image
 * @param {object} collision_box - The collision box for the sprite. See EB_core/classes/sprite.js for more information.
 * @param {object} hit_box - The hit box for the sprite
 * @param {bool} hit_box.active - If the hit box is active
 * @param {object} hit_box.offset - The offset of the hit box in X and Y coordinates
 * @param {int} hit_box.width - The width of the hit box
 * @param {int} hit_box.height - The height of the hit box
 * @param {object} sprites - The sprites for the sprit
 */

class EB_Player extends EB_Sprite {
    constructor({
      position,
      size = {w: 0, h: 0},
      velocity = {x: 0, y: 0},
      image_src,
      frames_max = 1,
      collision_box = {
        active: false,
        offset: {x: 0, y: 0},
        width: 0,
        height : 0
      },
      hit_box = {
        active: false,
        offset: {x: 0, y: 0},
        width: 0,
        height : 0
      },
      sprites
    }) {
      super({
        position,
        size,
        image_src,
        frames_max,
        collision_box
      })

      this.velocity = velocity
      this.hit_box = hit_box
      this.size = size
      this.health = 100
      this.frames_current = 0
      this.frames_elapsed = 0
      this.frames_hold = 5
      this.sprites = sprites
      this.pause_animate = false
      this.dead = false
      this.flip = false
      this.jump = false
      this.jump_timer = 0
      this.attack = false
      this.fall = false
      this.hit = false
  
      for (const sprite in this.sprites) {
        sprites[sprite].image = new Image()
        sprites[sprite].image.src = sprites[sprite].image_src
      }
    }
  
    update() {
      this.draw()
      let x = this.position.x - this.hit_box.offset.x;
      let y = this.position.y - this.hit_box.offset.y;

      // Hit box
      if ((this.hit_box.width > 0 || this.hit_box.height > 0) && this.hit_box.active) {
        if (!this.flip) {
          x = (this.position.x) + (this.image.width / this.frames_max) - this.hit_box.offset.x - this.hit_box.width;
        }
        // Get outline
        this.hit_box['left'] = x;
        this.hit_box['top'] = y;
        this.hit_box['right'] = x + this.hit_box.width;
        this.hit_box['bottom'] = y + this.hit_box.height;
        // Draw rectangle
        game.context.beginPath();
        game.context.rect( x, y, this.hit_box.width, this.hit_box.height);
        if (game.debug) game.context.stroke();
      }

      // fill
      game.context.beginPath();
      game.context.rect( this.collision_box.left, this.collision_box.top - 30, this.collision_box.width / 100 * this.health, 5);
      game.context.fillStyle = "red";
      game.context.fill();

      // health bar
      game.context.beginPath();
      game.context.rect(this.collision_box.left, this.collision_box.top - 30, this.collision_box.width, 5);
      game.context.stroke();

      if (this.hit && !this.dead) {
        game.context.font = "16px Arial";
        game.context.fillStyle = "red";
        game.context.textAlign = "center";
        game.context.fillText("-10",this.collision_box.left + (this.collision_box.width / 2 ) - 2, this.collision_box.top - 35);
      }

      if (!this.pause_animate) this.animate()
   
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
    }
    
    switch_sprite(sprite) {
      switch (sprite) {
        case 'idle_right':
          if (this.image !== this.sprites.idle_right.image) {
            this.image = this.sprites.idle_right.image
            this.frames_max = this.sprites.idle_right.frames_max
            this.frames_current = 0
          }
          break
        case 'run_right':
            if (this.image !== this.sprites.run_right.image) {
                this.image = this.sprites.run_right.image
                this.frames_max = this.sprites.run_right.frames_max
                this.frames_current = 0
            }
            break
        case 'jump_right':
            if (this.image !== this.sprites.jump_right.image) {
                this.image = this.sprites.jump_right.image
                this.frames_max = this.sprites.jump_right.frames_max
                this.frames_current = 0
            }
            break
        case 'fall_right':
            if (this.image !== this.sprites.fall_right.image) {
                this.image = this.sprites.fall_right.image
                this.frames_max = this.sprites.fall_right.frames_max
                this.frames_current = 0
            }
            break
        case 'attack_right':
            if (this.image !== this.sprites.attack_right.image) {
                this.image = this.sprites.attack_right.image
                this.frames_max = this.sprites.attack_right.frames_max
                this.frames_current = 0
            }
            break
        case 'dead_right':
            if (this.image !== this.sprites.dead_right.image) {
                this.image = this.sprites.dead_right.image
                this.frames_max = this.sprites.dead_right.frames_max
                this.frames_current = 0
            }
            break
      }
    }
  }