/**/
var PlaneLife = 4 ;
var PlaneAttack = 5;
var PlaneShootingInterval;
var PlaneCanShoot;
var PlaneImgUrls = ["Image\\Plane\\Plane_1.png","Image\\Plane\\Plane_2.png","Image\\Plane\\Plane_3.png"];
var PlaneImg = new Image();

var HeartImgUrl = "Resources\\Heart.png";
var HeartImg = new Image();
HeartImg.src = HeartImgUrl;

class Plane extends ImgComponent{
    constructor(width, height, x, y, speedX, speedY, img, life, attack) {
        super(width, height, x, y, speedX, speedY, img);
        this.life = life;
        this.attack = attack;
        this.MoveRight = false;
        this.MoveLeft = false;
        this.CanShoot = false;
        this.ShootingInterval = null;
      }
    newPos(){
        super.newPos();
        if (this.MoveRight == true){
            this.x -= 10;
            //console.log(this.x);
            if (this.x < 0){
                this.x = 0;
            }
        }
        else if(this.MoveLeft == true){
            this.x += 10;
            //console.log(this.x);
            if (this.x > GameArea.canvas.width-this.img.width){
                this.x = GameArea.canvas.width-this.img.width;
            }
        }
    }
    update(){
        super.update();
        let ctx = GameArea.context;
        if (this.life > 0){
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(this.x, this.y-5, this.img.width * this.life/this.totallife, 2);
        }
        //console.log(this.CanShoot);
        if (this.CanShoot == true){
            Bullets.push(new Bullet(5,   
                                    20, 
                                    this.x+(this.img.width-5)/2, 
                                    this.y-20,
                                    0,
                                    -3,
                                    BulletRGBColor,
                                    this.attack
                                    ));
            this.CanShoot = false;
        }
    }
    StartShootingInterval(){
        this.ShootingInterval= setInterval(() => {
            this.CanShoot = true;
            //console.log(this.CanShoot);
        }, 300);
    }

}


