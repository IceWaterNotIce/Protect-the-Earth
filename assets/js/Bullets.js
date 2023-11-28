---
---

import * as SpiritsLib from "./Spirits.js";

export class Bullet extends SpiritsLib.ImgComponent{
    constructor(width, height, x, y, speedX, speedY, img, globalAlpha, attack) {
    super(width, height, x, y, speedX, speedY, img, globalAlpha);
    this.attack = attack;
    }
    update(){
        super.update();
    }
}