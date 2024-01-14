/**
 * Game clock.
 *
 * @class EB_Clock
 * @param {int} fps - Frames per second
 */

class EB_Clock {
    constructor(fps) {
        this.fps = fps
        this.seconds = 0;
        this.i = 0
        this.frames = 0;
        this.timer_interval = 0;
        this.timer_log = [];
    }
    start() {
        this.interval_seconds = setInterval(timer, 1000);
        this.interval_frames = setInterval(update, this.fps);      
    }
    stop() {
        clearInterval(this.interval_seconds);
        clearInterval(this.interval_frames);
    }
    update() {
        this.i++
        if (this.i % 5 === 0) {
            this.timer_log.forEach((x, i) => {
                if (this.timer_interval >= x.interval + x.delay) {
                    this.timer_log.splice(i, 1);
                }
            });
            this.frames++
            this.timer_interval++
        }
    }
    timer_start(slug, delay) {
        if (!this.timer_log.find(x => x.slug === slug)) {
            this.timer_log.push({
                slug: slug,
                delay: delay,
                interval: this.timer_interval
            });
        }
    }
    timer_end(slug) {
        return !this.timer_log.find(x => x.slug === slug);
    }
}