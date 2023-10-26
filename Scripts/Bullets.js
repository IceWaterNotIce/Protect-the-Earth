var BulletImg = new Image(); 
BulletImg.src = "Resources\\Bullet.png";

var Bullets = [];

class Bullet extends ImgComponent{
    constructor(width, height, x, y, speedX, speedY, img, attack) {
    super(width, height, x, y, speedX, speedY, img);
    this.attack = attack;
    }
    update(){
        super.update();
    }
}