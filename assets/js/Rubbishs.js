

class Rubbish extends ImgComponent {
    constructor(width, height, x, y, speedX, speedY, img, globalAlpha, Maxlife) {
        super(width, height, x, y, speedX, speedY, img, globalAlpha);
        this.life = Maxlife;
        this.Maxlife = Maxlife;
    }
    update() {
        super.update();
        let ctx = GameArea.context;
        if (this.life > 0) {
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(this.x, this.y - 5, this.width * this.life / this.Maxlife, 2);
        }
    }
}