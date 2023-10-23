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
var GameScore;

//#region Plane control
document.addEventListener("keydown", function(e){
    //console.log(e.key);
    if (e.key == "A" || e.key == "a"){ 
        Plane.MoveRight = true;
        Plane.MoveLeft = false;
    }
    else if (e.key == "D" || e.key == "d"){ 
        Plane.MoveRight = false;
        Plane.MoveLeft = true;
    }
    if (e.key === " " && !PlaneShootingInterval){
        //console.log(PlaneShootingInterval);
        PlaneShootingInterval = setInterval(PlaneShootBullet, 300);
    }
    e.preventDefault();
})

document.addEventListener("keyup", function(e){
    //console.log(e.key);
    if (e.key === "A" || e.key === "a"){ 
        Plane.MoveRight = false;
    }
    else if (e.key === "D" || e.key === "d"){ 
        Plane.MoveLeft = false;
    }
    if (e.key === " "){
        clearInterval(PlaneShootingInterval);
        PlaneShootingInterval = null;
    }
    e.preventDefault();
})

//#endregion

//#endregion

//#region Game function
document.addEventListener("DOMContentLoaded", function() {
    startgame();
});

function startgame(){
    GameArea.start();
    plane(0, 0, GameArea.canvas.width/2, 2*GameArea.canvas.height/3, 0, 0, "img", PlaneImg);
    Planelife = 4;
    GameScore = new component(0, 0, 2.5*GameArea.canvas.width/4, 50, 0, 0, "text", null, "#000000");
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
        if (Plane.crashWith(Rubbishs[j]) == true) {
            Planelife -= 1;
            Rubbishs.splice(j, 1);
            if (Planelife == 0){
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
    if ( Rubbishs.length < 2||Math.floor(Math.random()*800) == 2) {
        x = Math.floor(Math.random()*(GameArea.canvas.width-2*RubbishImg.width+1)+RubbishImg.width);
        //console.log("Created Rubbish");
        Rubbishs.push(new component(0, 0, x, RubbishImg.height, 0, 3, "img", RubbishImg, null, 15, null));
    }
    if (PlaneCanShoot === true){
        Bullets.push(new component(0, 0, Plane.x+(Plane.img.width-BulletImg.width)/2, Plane.y-BulletImg.height, 0, -3, "img", BulletImg, null, null, 5));
        PlaneCanShoot = false;
    }
    //#endregion

    //#region Update
    Plane.update();
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
    for (i = 0; i < Planelife; i += 1) {
        //console.log(Planelife);
        ctx = GameArea.context;
        ctx.drawImage(HeartImg, 10+HeartImg.width*i, 10);
    }
    GameScore.text = "SCORE: " + GameScore.score;
    GameScore.update();
    //#endregion
}

function endgame(){
    clearInterval(GameArea.interval);
}


//#endregion
