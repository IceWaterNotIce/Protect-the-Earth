export function mobileInput() {
    window.GameArea.canvas.addEventListener("touchstart", process, false);
    window.GameArea.canvas.addEventListener("touchcancel", process, false);
    window.GameArea.canvas.addEventListener("touchend", process, false);
    
    function process(ev) {
        console.log(ev.touches);
        window.GameArea.plane.MoveRight = false;
        window.GameArea.plane.MoveLeft = false;
        // Use the event's data to call out to the appropriate gesture handlers
        for (let i = 0; i < ev.touches.length; i += 1) {
            if (ev.touches[i].clientX > window.GameArea.Control_rod.x && ev.touches[i].clientX < (window.GameArea.Control_rod.x + window.GameArea.Control_rod.width / 2)
                && ev.touches[i].clientY > window.GameArea.Control_rod.y && ev.touches[i].clientY < (window.GameArea.Control_rod.y + window.GameArea.Control_rod.height)) {
                window.GameArea.plane.MoveRight = true;
                window.GameArea.plane.MoveLeft = false;
                break;
            }
        }
        for (let i = 0; i < ev.touches.length; i += 1) {
            if (ev.touches[i].clientX > (window.GameArea.Control_rod.x + window.GameArea.Control_rod.width / 2) && ev.touches[i].clientX < window.GameArea.Control_rod.x + window.GameArea.Control_rod.width
                && ev.touches[i].clientY > window.GameArea.Control_rod.y && ev.touches[i].clientY < window.GameArea.Control_rod.y + window.GameArea.Control_rod.height) {
                window.GameArea.plane.MoveRight = false;
                window.GameArea.plane.MoveLeft = true;
                break;
            }
        }
        var planeShoot = false;
        for (let i = 0; i < ev.touches.length; i += 1) {
            if (ev.touches[i].clientX > window.GameArea.Shoot_icon.x && ev.touches[i].clientX < window.GameArea.Shoot_icon.x + window.GameArea.Shoot_icon.width
                && ev.touches[i].clientY > window.GameArea.Shoot_icon.y && ev.touches[i].clientY < window.GameArea.Shoot_icon.y + window.GameArea.Shoot_icon.height) {
                planeShoot = true;
            }
            if (ev.touches[i].clientX > window.GameArea.Shoot_icon.x && ev.touches[i].clientX < window.GameArea.Shoot_icon.x + window.GameArea.Shoot_icon.width
                && ev.touches[i].clientY > window.GameArea.Shoot_icon.y && ev.touches[i].clientY < window.GameArea.Shoot_icon.y + window.GameArea.Shoot_icon.height
                && !window.GameArea.plane.ShootingInterval) {
                window.GameArea.plane.CanShoot = true;
                window.GameArea.plane.StartShootingInterval();
                break;
            }
        }
        if (!planeShoot) {
            clearInterval(window.GameArea.plane.ShootingInterval);
            window.GameArea.plane.ShootingInterval = null;
        }
        ev.preventDefault();
    }
}

export function desktopInput(){
    document.addEventListener("keydown", function (e) {
        //console.log(e.key);
        if (e.key == "A" || e.key == "a") {
            window.GameArea.plane.MoveRight = true;
            window.GameArea.plane.MoveLeft = false;
        }
        else if (e.key == "D" || e.key == "d") {
            window.GameArea.plane.MoveRight = false;
            window.GameArea.plane.MoveLeft = true;
        }
        if (e.key === " " && !window.GameArea.plane.ShootingInterval) {
            window.GameArea.plane.StartShootingInterval();
            //console.log(window.GameArea.plane.ShootingInterval);
        }
        e.preventDefault();
    })

    document.addEventListener("keyup", function (e) {
        //console.log(e.key);
        if (e.key === "A" || e.key === "a") {
            window.GameArea.plane.MoveRight = false;
        }
        else if (e.key === "D" || e.key === "d") {
            window.GameArea.plane.MoveLeft = false;
        }
        if (e.key === " ") {
            clearInterval(window.GameArea.plane.ShootingInterval);
            window.GameArea.plane.ShootingInterval = null;
        }
        e.preventDefault();
    })
}
