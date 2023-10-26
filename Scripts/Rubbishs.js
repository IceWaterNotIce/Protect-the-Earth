var RubbishImgUrl = "Resources\\Rubbish.png";
var RubbishImg = new Image();
RubbishImg.src = RubbishImgUrl;
var Rubbishs = [];

class Rubbish extends ImgComponent{
    constructor(width, height, x, y, speedX, speedY, img, Maxlife) {
        super(width, height, x, y, speedX, speedY, img);
        this.life = Maxlife;
        this.Maxlife = Maxlife;
      }
    update(){
        super.update();
        let ctx = GameArea.context;
        if (this.life > 0){
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(this.x, this.y-5, this.img.width * this.life/this.Maxlife, 2);
        }
    }
}