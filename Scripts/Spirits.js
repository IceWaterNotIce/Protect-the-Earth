function component(width, height, x, y, speedX, speedY, type, img, color, life, attack) {
    this.type = type;
    this.score = 0;
    this.width = width;
    this.height = height;
    this.speedX = speedX;
    this.speedY = speedY;    
    this.x = x;
    this.y = y;
    this.img = img;
    this.life = life;
    this.totallife = life;
    this.attack = attack;
    this.gravity = 0;
    this.gravitySpeed = 0;

    this.update = function() {
        if (this.MoveRight == true){
            this.x -= 10;
            if (this.x < 0){this.x = 0;}
        }
        else if(this.MoveLeft == true){
            this.x += 10;
            if (this.x > GameArea.canvas.width-this.img.width){this.x = GameArea.canvas.width-this.img.width;}
        }
        ctx = GameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.font = "30px serif"
            ctx.fillText(this.text, this.x, this.y);
        } else if (this.type == "img"){
            //console.log(y);
            ctx.drawImage(this.img, this.x, this.y);
            if (this.life > 0){
                ctx.fillStyle = "#FF0000";
                ctx.fillRect(this.x, this.y-5, this.img.width * this.life/this.totallife, 2);
            }
        }
        else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    this.newPos = function() {
        this.gravitySpeed += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY + this.gravitySpeed;
    }
    this.overBottom = function() {
        var rockbottom = GameArea.canvas.height;
        if (this.y > rockbottom) {
            return true;
        }
    }
    this.overTop = function() {
        var rocktop = 0;
        if (this.y < rocktop) {
            return true;
        }
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.img.width);
        var mytop = this.y;
        var mybottom = this.y + (this.img.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.img.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.img.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}