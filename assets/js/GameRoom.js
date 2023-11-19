/*
    JavaScript document of The Game << Protect The World >>
*/

//#region Game Vars

var GameArea = {
    canvas: document.createElement("canvas"),
    start: function () {

        //console.log("HelloWorld");
        if (deviceType === "Mobile") {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        if (deviceType === "Tablet") {
            if (window.innerWidth > window.innerHeight) {
                this.canvas.width = 500;
                this.canvas.height = window.innerHeight;
            } else {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }
        }
        if (deviceType === "Desktop") {
            this.canvas.width = 500;
            this.canvas.height = window.innerHeight;
        }
        // insert canvas to main
        document.getElementsByTagName('main')[0].appendChild(this.canvas);
        document.body.style.textAlign = 'center';
        this.context = this.canvas.getContext("2d");
        // 
        this.canvas.style.border = "1px solid";
        this.interval = setInterval(loop, 20);

        this.life = setTimeout(() => {
            endgame(true);
        }, 3 * 60 * 1000);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};
var Control_rod;
var Shoot_icon;
var GameScore;
var plane;
//#endregion

//#region Plane control
document.addEventListener("keydown", function (e) {
    //console.log(e.key);
    if (e.key == "A" || e.key == "a") {
        plane.MoveRight = true;
        plane.MoveLeft = false;
    }
    else if (e.key == "D" || e.key == "d") {
        plane.MoveRight = false;
        plane.MoveLeft = true;
    }
    if (e.key === " " && !plane.ShootingInterval) {
        plane.StartShootingInterval();
        //console.log(plane.ShootingInterval);
    }
    e.preventDefault();
})

document.addEventListener("keyup", function (e) {
    //console.log(e.key);
    if (e.key === "A" || e.key === "a") {
        plane.MoveRight = false;
    }
    else if (e.key === "D" || e.key === "d") {
        plane.MoveLeft = false;
    }
    if (e.key === " ") {
        clearInterval(plane.ShootingInterval);
        plane.ShootingInterval = null;
    }
    e.preventDefault();
})

GameArea.canvas.addEventListener("touchstart", process, false);
GameArea.canvas.addEventListener("touchcancel", process, false);
GameArea.canvas.addEventListener("touchend", process, false);
function process(ev) {
    console.log(ev.touches);
    plane.MoveRight = false;
    plane.MoveLeft = false;
    // Use the event's data to call out to the appropriate gesture handlers
    for (let i = 0; i < ev.touches.length; i += 1) {
        if (ev.touches[i].clientX > Control_rod.x && ev.touches[i].clientX < (Control_rod.x + Control_rod.width / 2)
            && ev.touches[i].clientY > Control_rod.y && ev.touches[i].clientY < (Control_rod.y + Control_rod.height)) {
            plane.MoveRight = true;
            plane.MoveLeft = false;
            break;
        }
    }
    for (let i = 0; i < ev.touches.length; i += 1) {
        if (ev.touches[i].clientX > (Control_rod.x + Control_rod.width / 2) && ev.touches[i].clientX < Control_rod.x + Control_rod.width
            && ev.touches[i].clientY > Control_rod.y && ev.touches[i].clientY < Control_rod.y + Control_rod.height) {
            plane.MoveRight = false;
            plane.MoveLeft = true;
            break;
        }
    }
    var planeShoot = false;
    for (let i = 0; i < ev.touches.length; i += 1) {
        if (ev.touches[i].clientX > Shoot_icon.x && ev.touches[i].clientX < Shoot_icon.x + Shoot_icon.width
            && ev.touches[i].clientY > Shoot_icon.y && ev.touches[i].clientY < Shoot_icon.y + Shoot_icon.height) {
            planeShoot = true;
        }
        if (ev.touches[i].clientX > Shoot_icon.x && ev.touches[i].clientX < Shoot_icon.x + Shoot_icon.width
            && ev.touches[i].clientY > Shoot_icon.y && ev.touches[i].clientY < Shoot_icon.y + Shoot_icon.height
            && !plane.ShootingInterval) {
            plane.StartShootingInterval();
            break;
        }
    }
    if (!planeShoot) {
        clearInterval(plane.ShootingInterval);
        plane.ShootingInterval = null;
    }
    ev.preventDefault();
}
//#endregion

//#region Game function





//#endregion
