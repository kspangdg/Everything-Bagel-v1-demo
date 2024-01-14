/**
 * Configs game menu.
 *
 * @class EB_Menu
 * @param {int} width - Width of the menu
 * @param {int} height - Height of the menu
 * @param {string} image - Background image src
 */

class EB_Menu {
    constructor(width, height, image = "", title = "", favicon = "") {
        this.menu = document.getElementById("menu");
        this.details = document.getElementById("details");
        this.width = width;
        this.height = height;
        this.imageSrc = image;
        this.title = title;
        this.favicon = favicon;
    }

    init() {
        if (this.title != '') {
            document.title = this.title;
        } else {
            document.title = "Untitled Game";
        }
        let link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        if (this.favicon != '') {
            link.href = this.favicon;
        } else {
            link.href = 'EB_core/assets/img/bagel.png';
        }
        document.getElementsByTagName('head')[0].appendChild(link);
        this.menu.style.width = this.width + "px";
        this.menu.style.height = this.height + "px";
        this.details.style.width = this.width + "px";
        if (this.imageSrc != "") {
           this.menu.style.backgroundImage = "url(" + this.imageSrc + ")"; 
        }        
    }
    hide() {
        this.menu.style.display = "none";
    }
}