---
---

import * as SpiritsLib from "{{ site.url }}{{ site.baseurl }}/assets/js/Spirits.js";

export class Bullet extends SpiritsLib.ImgComponent{
    constructor(width, height, x, y, speedX, speedY, img, globalAlpha, attack) {
    super(width, height, x, y, speedX, speedY, img, globalAlpha);
    this.attack = attack;
    }
    update(){
        super.update();
    }
}