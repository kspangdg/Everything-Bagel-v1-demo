/**
 * Configures game canvas, fps, basic meta.
 *
 * @class EB_Config
 * @param {dom element} canvas - Create or point to canvas element (e.g. document.createElement("canvas"))
 * @param {int} width - Width of the canvas
 * @param {int} height - Height of the canvas
 */

class EB_Config {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.width = width;
        this.height = height;
        this.context = this.canvas.getContext("2d");
        this.level = 1,
        this.mode = 1, // 1 = easy, 2 = medium, 3 = hard
        this.debug;
        this.mute = false;
    }

    start() {
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);        
    }
    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}