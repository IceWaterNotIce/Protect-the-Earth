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
        var rockbottom = GameArea.canvas.height;
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
        var myright = this.x + (this.img.width);
        var mytop = this.y;
        var mybottom = this.y + (this.img.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.img.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.img.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}

class ImgComponent extends Component{
    constructor(width, height, x, y, speedX, speedY, img) {
        super(width, height, x, y, speedX, speedY);
        this.img = img;
    }
    update() {
        let ctx = GameArea.context;
        ctx.drawImage(this.img, this.x, this.y);
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
        let ctx = GameArea.context;
        ctx.fillStyle = this.textRGBColor;
        ctx.font = this.textFont;
        ctx.fillText(this.text, this.x, this.y);
    }
}

class RectComponent extends Component{
    constructor(width, height, x, y, speedX, speedY, rectRGBColor) {
        super(width, height, x, y, speedX, speedY);
        this.rectRGBColor = rectRGBColor;
    }
    update = function() {
        let ctx = GameArea.context;
        ctx.fillStyle = this.rectRGBColor;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
