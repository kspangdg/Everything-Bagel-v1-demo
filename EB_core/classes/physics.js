/**
 * Game Physics Engine.
 * 
 * @class EB_Physics
 * @param {number} gravity - The gravity of the game.
 */

class EB_Physics {
    constructor(gravity) {
        this.gravity = gravity;
    }
    collision(i1, i2) {
        let item_1 = i1.collision_box;
        let item_2 = i2.collision_box;
        let collision = {x: false, y: false, any: false, top: false, bottom: false, left: false, right: false};
        if ((item_1.right >= item_2.left && item_1.left < item_2.left)) {
            collision.x = true;
            collision.right = true;
        }
        if ((item_1.right <= item_2.right && item_1.left >= item_2.left) || (item_1.right >= item_2.right && item_1.left <= item_2.left)) {
            collision.x = true;
            collision.right = true;
            collision.left = true;
        }
        if ((item_1.right > item_2.right && item_1.left <= item_2.right)) {
            collision.x = true;
            collision.left = true;
        }
        if ((item_1.bottom >= item_2.top && item_1.top < item_2.top)) {
            collision.y = true;
            collision.bottom = true;
        }
        if ((item_1.bottom <= item_2.bottom && item_1.top >= item_2.top) || (item_1.bottom >= item_2.bottom && item_1.top <= item_2.top)) {
            collision.y = true;
            collision.top = true;
            collision.bottom = true;
        }
        if ((item_1.bottom > item_2.bottom && item_1.top <= item_2.bottom)) {
            collision.y = true;
            collision.top = true;
        }
        if (collision.x && collision.y) collision.any = true; 
        if (!collision.y) {
            collision.left = false;
            collision.right = false;
        }
        if (!collision.x) {
            collision.top = false;
            collision.bottom = false;
        }
        return collision;
    }
    excelerate(sprite, max_speed, increment) {
        let right = sprite.velocity.x;
        let left = sprite.velocity.x;
        let up = sprite.velocity.y;
        let down = sprite.velocity.y;
        if (up <= max_speed) up += increment;
        if (down >= max_speed * -1) down -= increment;
        if (right <= max_speed) right += increment;
        if (left >= max_speed * -1) left -= increment;
        return {left: left, right: right, up: up, down: down}
    }
}