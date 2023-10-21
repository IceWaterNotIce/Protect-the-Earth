/**/

var Plane;
var PlaneShootingInterval;
var PlaneCanShoot;
var PlaneImgUrl = "Resources\\Plane.png";
var PlaneImg = new Image();
PlaneImg.src = PlaneImgUrl;

var HeartImgUrl = "Resources\\Heart.png";
var HeartImg = new Image();
HeartImg.src = HeartImgUrl;

function plane(width, height,x, y, speedX, speedY, type, img, color, life, attack){
    Plane = new component(width, height, x, y, speedX, speedY, type, img, color, life, attack);
    Plane.MoveRight = false;
    Plane.MoveLeft = false;
}

function PlaneShootBullet(){
    PlaneCanShoot = true;
}



