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
            var BulletImg = new Image();
            BulletImg.src = BulletImgUrls[gamelevel - 1];
            GameArea.Bullets.push(new Bullet(
                BulletImg.width,
                BulletImg.height,
                this.x + (this.width - BulletImg.width) / 2,
                this.y - 20,
                0,
                -3,
                BulletImg,
                1,
                this.attack 
            ));
            this.CanShoot = false;
        }
    }
    StartShootingInterval() {
        this.ShootingInterval = setInterval(() => {
            this.CanShoot = true;
            //console.log(this.CanShoot);
        }, 400);
    }

}


