var BulletRGBColor = "#FF00FF";

var Bullets = [];

class Bullet extends RectComponent{
    constructor(width, height, x, y, speedX, speedY, rectRGBColor, attack) {
    super(width, height, x, y, speedX, speedY, rectRGBColor);
    this.attack = attack;
    }
    update(){
        super.update();
    }
}