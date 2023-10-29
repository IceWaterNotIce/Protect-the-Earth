/*
    JavaScript document of The Game << Protect The World >>
*/

//#region Game Vars

var GameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        //console.log("HelloWorld");
        if (deviceType === "Mobile"){
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        if (deviceType === "Tablet"){
            if ( window.innerWidth >  window.innerHeight){
                this.canvas.width = 500;
                this.canvas.height = window.innerHeight;
            } else {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }
        }
        if (deviceType === "Desktop"){
            this.canvas.width = 500;
            this.canvas.height = window.innerHeight;
        }
        document.body.appendChild(this.canvas);
        document.body.style.textAlign = 'center';
        this.context = this.canvas.getContext("2d");
        // 
        this.canvas.style.border = "1px solid";
        this.interval = setInterval(loop, 20);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

//#region Plane control
document.addEventListener("keydown", function(e){
    //console.log(e.key);
    if (e.key == "A" || e.key == "a"){ 
        plane.MoveRight = true;
        plane.MoveLeft = false;
    }
    else if (e.key == "D" || e.key == "d"){ 
        plane.MoveRight = false;
        plane.MoveLeft = true;
    }
    if (e.key === " " && !plane.ShootingInterval){
        plane.StartShootingInterval();
        //console.log(plane.ShootingInterval);
    }
    e.preventDefault();
})

document.addEventListener("keyup", function(e){
    //console.log(e.key);
    if (e.key === "A" || e.key === "a"){ 
        plane.MoveRight = false;
    }
    else if (e.key === "D" || e.key === "d"){ 
        plane.MoveLeft = false;
    }
    if (e.key === " "){
        clearInterval(plane.ShootingInterval);
        plane.ShootingInterval = null;
    }
    e.preventDefault();
})

GameArea.canvas.addEventListener("touchstart", process, false);
GameArea.canvas.addEventListener("touchmove", process, false);
GameArea.canvas.addEventListener("touchcancel", process, false);
GameArea.canvas.addEventListener("touchend", process, false);
function process(ev) {
    // Use the event's data to call out to the appropriate gesture handlers
    console.log(ev.touches);
  }
//#endregion

//#region Game function
document.addEventListener("DOMContentLoaded", function() {
    startgame();
});

var Control_rod;
var Shoot_icon;
var GameScore;

function startgame(){        
    GameArea.start();
    PlaneImg.src = PlaneImgUrls[0];
    plane = new Plane(0, 0, GameArea.canvas.width/2, 2*GameArea.canvas.height/3, 0, 0, PlaneImg, 4, 5);
    if (deviceType == "Mobile"){
        var Control_rod_img = new Image();
        Control_rod_img.src = "Image\\UI\\Control_rod_1.png";
        Control_rod = new ImgComponent(0, GameArea.canvas.height - Control_rod_img.height, 0, 0, Control_rod_img);  
        var Shoot_icon_img = new Image();
        Shoot_icon_img.src = "Image\\UI\\Shoot_icon_1.PNG";
        Shoot_icon = new ImgComponent(0, GameArea.canvas.height - Shoot_icon_img.height, 0, 0, Shoot_icon_img);
    }
    GameScore = new TextComponent(0, 0, 2*GameArea.canvas.width/4, 50, 0, 0, "text", "#000000", "40px Arial");
    GameScore.score = 0;
}

function loop(){
    //#region Clear
    GameArea.clear();
    // delete bullet if it collide with Rubbish
    // delete rubbish if it's life < 0
    for (let i = 0; i < Bullets.length; i += 1) {
        for (let j = 0; j < Rubbishs.length; j += 1) {
            //console.log(Bullets[i].crashWith(Rubbishs[j]));
            if (Bullets[i].crashWith(Rubbishs[j]) == true) {
                Rubbishs[j].life -= Bullets[i].attack;
                GameScore.score += Bullets[i].attack;
                Bullets.splice(i, 1);
                if(Rubbishs[j].life <= 0){
                    Rubbishs.splice(j, 1);
                };
                break;
            }
        }
    }
    // delete rubbish if it collide with Plane
    for (let j = 0; j < Rubbishs.length; j += 1) {
        //console.log(Bullets[i].crashWith(Rubbishs[j]));
        if (plane.crashWith(Rubbishs[j]) == true) {
            plane.life -= 1;
            Rubbishs.splice(j, 1);
            if (plane.life == 0){
                endgame();
            }
            break;
        }
    }
    //delete rubbish and bullet if it go outside canvas
    for (let i = 0; i < Bullets.length; i += 1) {
        //console.log(Rubbishs[i].y);
        if(Bullets[i].overTop() === true){
            Bullets.splice(i, 1);
            //console.log("aaa");
        }
    }
    for (let i = 0; i < Rubbishs.length; i += 1) {
        //console.log(Rubbishs[i].y);
        if(Rubbishs[i].overBottom() === true){
            Rubbishs.splice(i, 1);
            //console.log("aaa");
        }
    }
    //#endregion

    //#region Create
    if ( Rubbishs.length < 2||Math.floor(Math.random()*80) == 2) {
        let RubbishImg = new Image();
        RubbishImg.src = RubbishPlasticImgUrls[Math.floor(Math.random() * RubbishPlasticImgUrls.length)];
        let x = Math.floor(Math.random()*(GameArea.canvas.width-2*RubbishImg.width+1)+RubbishImg.width);
        Rubbishs.push(new Rubbish(0, 0, x, -RubbishImg.height, 0, 3, RubbishImg, 15));
        //console.log("Created Rubbish");
        // delete rubbish if it collide with other rubbish
        for (let j = 0; j < Rubbishs.length - 1; j += 1) {
            //console.log(Bullets[i].crashWith(Rubbishs[j]));
            if (Rubbishs[Rubbishs.length - 1].crashWith(Rubbishs[j]) == true) {
                Rubbishs.splice(Rubbishs.length - 1, 1);
                console.log("rubbish collide with other rubbish");
                break;
            }
        }
    }
    //#endregion

    //#region Update
    plane.newPos();
    plane.update();
    for (i = 0; i < Rubbishs.length; i += 1) {
        //console.log(Rubbishs[i].y);
        Rubbishs[i].newPos();
        Rubbishs[i].update();
    }
    for (i = 0; i < Bullets.length; i += 1) {
        //console.log(Rubbishs[i].y);
        Bullets[i].newPos();
        Bullets[i].update();
    }
    for (i = 0; i < plane.life; i += 1) {
        //console.log(Planelife);
        ctx = GameArea.context;
        ctx.drawImage(HeartImg, 10+HeartImg.width*i, 10);
    }
    Control_rod.update();
    Shoot_icon.update();
    GameScore.text = "SCORE: " + GameScore.score;
    GameScore.update();
    //#endregion
}

function endgame(){
    clearInterval(GameArea.interval);

}


//#endregion
