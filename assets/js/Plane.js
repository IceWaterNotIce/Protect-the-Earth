---
---

var PlaneLife = 4;
var PlaneAttack = 5;
var PlaneShootingInterval;
var PlaneCanShoot;
var PlaneImgUrls = ["{{ site.url }}{{ site.baseurl }}/assets/img\\Plane\\Plane_1.png", "{{ site.url }}{{ site.baseurl }}/assets/img\\Plane\\Plane_2.png", "{{ site.url }}{{ site.baseurl }}/assets/img\\Plane\\Plane_3.png"];
var PlaneImg = new Image();

var HeartImgUrl = "{{ site.url }}{{ site.baseurl }}/assets/img\\ui\\Heart_1.png";
var HeartImg = new Image();
HeartImg.src = HeartImgUrl;

class Plane extends ImgComponent {
    constructor(width, height, x, y, speedX, speedY, img, globalAlpha, life, attack) {
        super(width, height, x, y, speedX, speedY, img, globalAlpha);
        this.life = life;
        this.attack = attack;
        this.MoveRight = false;
        this.MoveLeft = false;
        this.CanShoot = false;
        this.ShootingInterval = null;
    }
    newPos() {
        super.newPos();
        if (this.MoveRight == true) {
            this.x -= 10;
            //console.log(this.x);
            if (this.x < 0) {
                this.x = 0;
            }
        }
        else if (this.MoveLeft == true) {
            this.x += 10;
            //console.log(this.x);
            if (this.x > GameArea.canvas.width - this.width) {
                this.x = GameArea.canvas.width - this.width;
            }
        }
    }
    update() {
        super.update();
        //console.log(this.CanShoot);
        if (this.CanShoot == true) {
            Bullets.push(new Bullet(5,
                20,
                this.x + (this.width - 5) / 2,
                this.y - 20,
                0,
                -3,
                BulletRGBColor,
                this.attack
            ));
            this.CanShoot = false;
        }
    }
    StartShootingInterval() {
        this.ShootingInterval = setInterval(() => {
            this.CanShoot = true;
            //console.log(this.CanShoot);
        }, 300);
    }

}


