---
---



var Bullets = [];

class Bullet extends ImgComponent{
    constructor(width, height, x, y, speedX, speedY, img, globalAlpha, attack) {
    super(width, height, x, y, speedX, speedY, img, globalAlpha);
    this.attack = attack;
    }
    update(){
        super.update();
    }
}