class Component{
    constructor(width, height, x, y, speedX, speedY) {
        this.width = width;
        this.height = height;
        this.speedX = speedX;
        this.speedY = speedY;    
        this.x = x;
        this.y = y;
        this.gravity = 0;
        this.gravitySpeed = 0;
    }
    newPos() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }
    overBottom() {
        var rockbottom = window.GameArea.canvas.height;
        if (this.y > rockbottom) {
            return true;
        }
    }
    overTop() {
        var rocktop = 0;
        if (this.y < rocktop) {
            return true;
        }
    }
    crashWith(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

class ImgComponent extends Component{
    constructor(width, height, x, y, speedX, speedY, img, globalAlpha) {
        super(width, height, x, y, speedX, speedY);
        this.img = img;
        this.globalAlpha = globalAlpha;
    }
    update() {
        let ctx = window.GameArea.context;
        ctx.globalAlpha = this.globalAlpha;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}

class TextComponent extends Component{
    constructor(width, height, x, y, speedX, speedY, text, textRGBColor, textFont) {
        super(width, height, x, y, speedX, speedY);
        this.text = text;
        this.textRGBColor = textRGBColor;
        this.textFont = textFont;
    }
    update() {
        let ctx = window.GameArea.context;
        ctx.fillStyle = this.textRGBColor;
        ctx.font = this.textFont;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class RectComponent extends Component{
    constructor(width, height, x, y, speedX, speedY, rectRGBColor, rectAlpha) {
        super(width, height, x, y, speedX, speedY);
        this.rectRGBColor = rectRGBColor;
        this.rectAlpha = rectAlpha;
    }
    update = function() {
        let ctx = window.GameArea.context;
        ctx.fillStyle = this.rectRGBColor;
        ctx.globalAlpha = this.rectAlpha;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}