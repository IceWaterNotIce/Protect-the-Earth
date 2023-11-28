function mobileInput() {
    GameArea.canvas.addEventListener("touchstart", process, false);
    GameArea.canvas.addEventListener("touchcancel", process, false);
    GameArea.canvas.addEventListener("touchend", process, false);
    
    function process(ev) {
        console.log(ev.touches);
        GameArea.plane.MoveRight = false;
        GameArea.plane.MoveLeft = false;
        // Use the event's data to call out to the appropriate gesture handlers
        for (let i = 0; i < ev.touches.length; i += 1) {
            if (ev.touches[i].clientX > GameArea.Control_rod.x && ev.touches[i].clientX < (GameArea.Control_rod.x + GameArea.Control_rod.width / 2)
                && ev.touches[i].clientY > GameArea.Control_rod.y && ev.touches[i].clientY < (GameArea.Control_rod.y + GameArea.Control_rod.height)) {
                GameArea.plane.MoveRight = true;
                GameArea.plane.MoveLeft = false;
                break;
            }
        }
        for (let i = 0; i < ev.touches.length; i += 1) {
            if (ev.touches[i].clientX > (GameArea.Control_rod.x + GameArea.Control_rod.width / 2) && ev.touches[i].clientX < GameArea.Control_rod.x + GameArea.Control_rod.width
                && ev.touches[i].clientY > GameArea.Control_rod.y && ev.touches[i].clientY < GameArea.Control_rod.y + GameArea.Control_rod.height) {
                GameArea.plane.MoveRight = false;
                GameArea.plane.MoveLeft = true;
                break;
            }
        }
        var planeShoot = false;
        for (let i = 0; i < ev.touches.length; i += 1) {
            if (ev.touches[i].clientX > GameArea.Shoot_icon.x && ev.touches[i].clientX < GameArea.Shoot_icon.x + GameArea.Shoot_icon.width
                && ev.touches[i].clientY > GameArea.Shoot_icon.y && ev.touches[i].clientY < GameArea.Shoot_icon.y + GameArea.Shoot_icon.height) {
                planeShoot = true;
            }
            if (ev.touches[i].clientX > GameArea.Shoot_icon.x && ev.touches[i].clientX < GameArea.Shoot_icon.x + GameArea.Shoot_icon.width
                && ev.touches[i].clientY > GameArea.Shoot_icon.y && ev.touches[i].clientY < GameArea.Shoot_icon.y + GameArea.Shoot_icon.height
                && !GameArea.plane.ShootingInterval) {
                GameArea.plane.CanShoot = true;
                GameArea.plane.StartShootingInterval();
                break;
            }
        }
        if (!planeShoot) {
            clearInterval(GameArea.plane.ShootingInterval);
            GameArea.plane.ShootingInterval = null;
        }
        ev.preventDefault();
    }
}

function desktopInput(){
    document.addEventListener("keydown", function (e) {
        //console.log(e.key);
        if (e.key == "A" || e.key == "a") {
            GameArea.plane.MoveRight = true;
            GameArea.plane.MoveLeft = false;
        }
        else if (e.key == "D" || e.key == "d") {
            GameArea.plane.MoveRight = false;
            GameArea.plane.MoveLeft = true;
        }
        if (e.key === " " && !GameArea.plane.ShootingInterval) {
            GameArea.plane.StartShootingInterval();
            //console.log(GameArea.plane.ShootingInterval);
        }
        e.preventDefault();
    })

    document.addEventListener("keyup", function (e) {
        //console.log(e.key);
        if (e.key === "A" || e.key === "a") {
            GameArea.plane.MoveRight = false;
        }
        else if (e.key === "D" || e.key === "d") {
            GameArea.plane.MoveLeft = false;
        }
        if (e.key === " ") {
            clearInterval(GameArea.plane.ShootingInterval);
            GameArea.plane.ShootingInterval = null;
        }
        e.preventDefault();
    })
}
