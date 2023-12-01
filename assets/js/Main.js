//# var declare
let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");
let gamelevel = 1;

let Control_rod_img = new Image();
Control_rod_img.src = "../assets/img\\ui\\Control_rod_1.png";
let Shoot_icon_img = new Image();
Shoot_icon_img.src = "../assets/img\\ui\\Shoot_icon_1.png";
let PlaneImg = new Image();
PlaneImg.src = PlaneImgUrls[gamelevel - 1];
let RubbishMetalImg = new Image(RubbishMetalImgUrls[0]);
let HeartImg = new Image(HeartImgUrl);



let deviceType = findDeviceType();
let storyLine = localStorage.getItem("storyLine");
gamelevel = '2';
let Control_rod;
let Shoot_icon
let bgAudio;
let plane;
let Rubbishs = [];
let Bullets = [];
let GameScore;
let Progress_bar_background;
let Progress_bar;
let interval;
let GameEnd;
let life;

//#region class
class Component {
    constructor(width, height, x, y, speedX, speedY) {
        width = width;
        height = height;
        speedX = speedX;
        speedY = speedY;
        x = x;
        y = y;
    }
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    overBottom() {
        var rockbottom = canvas.height;
        if (y > rockbottom) {
            return true;
        }
    }
    overTop() {
        var rocktop = 0;
        if (y < rocktop) {
            return true;
        }
    }
    crashWith(otherobj) {
        var myleft = this.x;
        var myright = this.x + (this.width);
        var mytop = this.y;
        var mybottom = this.y + (this.height);
        var otherleft = otherobj.x;
        var otherright = otherobj.x + (otherobj.width);
        var othertop = otherobj.y;
        var otherbottom = otherobj.y + (otherobj.height);
        var crash = true;
        if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false;
        }
        return crash;
    }
}
class ImgComponent extends Component {
    constructor(width, height, x, y, speedX, speedY, img, globalAlpha) {
        super(width, height, x, y, speedX, speedY);
        this.img = img;
        this.globalAlpha = globalAlpha;
    }
    update() {
        ctx = canvas.getContext("2d");
        ctx.globalAlpha = this.globalAlpha;
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }
}
class TextComponent extends Component {
    constructor(width, height, x, y, speedX, speedY, text, textRGBColor, textFont) {
        super(width, height, x, y, speedX, speedY);
        this.text = text;
        this.textRGBColor = textRGBColor;
        this.textFont = textFont;
    }
    update() {
        ctx.fillStyle = this.textRGBColor;
        ctx.font = this.textFont;
        ctx.fillText(this.text, this.x, this.y);
    }
}
class RectComponent extends Component {
    constructor(width, height, x, y, speedX, speedY, rectRGBColor, rectAlpha) {
        super(width, height, x, y, speedX, speedY);
        this.rectRGBColor = rectRGBColor;
        this.rectAlpha = rectAlpha;
    }
    update = function () {
        ctx.fillStyle = this.rectRGBColor;
        ctx.globalAlpha = this.rectAlpha;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
}
class Bullet extends ImgComponent {
    constructor(width, height, x, y, speedX, speedY, img, globalAlpha, attack) {
        super(width, height, x, y, speedX, speedY, img, globalAlpha);
        this.attack = attack;
    }
    update() {
        super.update();
    }
}
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
            //console.log(x);
            if (this.x < 0) {
                this.x = 0;
            }
        }
        else if (this.MoveLeft == true) {
            this.x += 10;
            //console.log(x);
            if (this.x > canvas.width - width) {
                this.x = canvas.width - width;
            }
        }
    }
    update() {
        super.update();
        //console.log(CanShoot);
        if (this.CanShoot == true) {
            var BulletImg = new Image();
            BulletImg.src = BulletImgUrls[gamelevel - 1];
            Bullets.push(new Bullet(
                BulletImg.width,
                BulletImg.height,
                x + (width - BulletImg.width) / 2,
                y - 20,
                0,
                -3,
                BulletImg,
                1,
                attack
            ));
            CanShoot = false;
        }
    }
    StartShootingInterval() {
        ShootingInterval = setInterval(() => {
            CanShoot = true;
            //console.log(CanShoot);
        }, 400);
    }

}
class Rubbish extends ImgComponent {
    constructor(width, height, x, y, speedX, speedY, img, globalAlpha, Maxlife) {
        super(width, height, x, y, speedX, speedY, img, globalAlpha);
        this.life = Maxlife;
        this.Maxlife = Maxlife;
    }
    update() {
        super.update();
        ctx = canvas.getContext("2d");
        if (this.life > 0) {
            ctx.fillStyle = "#FF0000";
            ctx.fillRect(this.x, this.y - 5, this.width * this.life / this.Maxlife, 2);
        }
    }
}
//#endregion

//#region function
function mobileInput() {

    setTimeout(() => {
        console.log("mobileInput");
        document.addEventListener("touchstart", process, false);
        console.log(document.getElementsByTagName("canvas")[0]);
        document.addEventListener("touchcancel", process, false);
        document.addEventListener("touchend", process, false);

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
                    plane.CanShoot = true;
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
    }, 200);
    //

}

function desktopInput() {
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
}

function findDeviceType() {
    let deviceType = '';
    if (/Mobi|Android/i.test(navigator.userAgent)) {
        // Mobile device
        deviceType = 'Mobile';
    } else if (/iPad|Android|Tablet/i.test(navigator.userAgent)) {
        // Tablet device
        deviceType = 'Tablet';
    } else {
        // Desktop or other device
        deviceType = 'Desktop';
    }
    return deviceType;
}

//#endregion
function startgame(gamelevel) {
    console.log(gamelevel);
    bgAudio = new Audio("../assets/audio/BGM_Lv" + gamelevel + ".mp3");
    bgAudio.loop = true;
    bgAudio.volume = 0.06;
    bgAudio.play();

    //console.log("HelloWorld");
    if (deviceType === "Mobile") {
        canvas.width = innerWidth;
        canvas.height = innerHeight;

    }
    if (deviceType === "Tablet") {
        if (innerWidth > innerHeight) {
            canvas.width = 500;
            canvas.height = innerHeight;
        } else {
            canvas.width = innerWidth;
            canvas.height = innerHeight;
        }
    }
    if (deviceType == "Desktop") {
        canvas.width = 500;
        canvas.height = innerHeight;
        desktopInput();
    }
    if (deviceType == "Mobile") {

        Control_rod = new ImgComponent(canvas.width / 2, canvas.width / 2, 0, canvas.height - canvas.width / 2, 0, 0, Control_rod_img, 0.5);

        Shoot_icon = new ImgComponent(canvas.width / 2, canvas.width / 2, canvas.width - Shoot_icon_img.width, canvas.height - Shoot_icon_img.height, 0, 0, Shoot_icon_img, 0.5);

    }

    plane = new Plane(PlaneImg.width - 50, PlaneImg.height - 50, canvas.width / 2, 2 * canvas.height / 3, 0, 0, PlaneImg, 1, 4, 5 * gamelevel);
    Bullets = [];

    // insert canvas to main

    Rubbishs = [];
    document.body.appendChild(canvas);
    document.body.style.textAlign = 'center';
    context = canvas.getContext("2d");
    // 
    canvas.style.border = "1px solid";
    interval = setInterval(loop, 20);

    console.log(deviceType);
    console.log(deviceType == "Mobile");
    if (deviceType == "Mobile") {
        mobileInput();
    }

    GameScore = new TextComponent(0, 0, 2 * canvas.width / 4, 50, 0, 0, "text", "#000000", "30px Arial");
    GameScore.score = 0;
    // 進度條
    Progress_bar_background = new RectComponent(canvas.width - 50, 20, 25, 60, 0, 0, "#FFFFFF", 0.5);
    Progress_bar = new RectComponent(0, 16, 30, 62, 0, 0, "#000000", 1);

}

function loop() {
    //#region Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // delete bullet if it collide with Rubbish
    // delete rubbish if it's life < 0
    for (let i = 0; i < Bullets.length; i += 1) {
        for (let j = 0; j < Rubbishs.length; j += 1) {
            //console.log(Bullets[i].crashWith(Rubbishs[j]));
            if (Bullets[i].crashWith(Rubbishs[j]) == true) {
                Rubbishs[j].life -= Bullets[i].attack;
                GameScore.score += Bullets[i].attack;
                if (GameScore.score >= 300) {
                    endgame(true);
                }
                Bullets.splice(i, 1);
                if (Rubbishs[j].life <= 0) {
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
            if (plane.life == 0) {
                endgame(false);
            }
            break;
        }
    }
    //delete rubbish and bullet if it go outside canvas
    for (let i = 0; i < Bullets.length; i += 1) {
        //console.log(Rubbishs[i].y);
        if (Bullets[i].overTop() === true) {
            Bullets.splice(i, 1);
            //console.log("aaa");
        }
    }
    for (let i = 0; i < Rubbishs.length; i += 1) {
        //console.log(Rubbishs[i].y);
        if (Rubbishs[i].overBottom() === true) {
            Rubbishs.splice(i, 1);
            //console.log("aaa");
        }
    }
    //#endregion

    //#region Create
    if (Rubbishs.length < 2 || Math.floor(Math.random() * 60) == 2) {
        let RubbishImg = new Image();
        RubbishImg.src = RubbishMetalImgUrls[Math.floor(Math.random() * RubbishMetalImgUrls.length)];
        RubbishImg.onload = () => {
            let x = Math.floor(Math.random() * (canvas.width - plane.width + 1) + plane.width / 2);
            Rubbishs.push(new Rubbish(RubbishImg.width, RubbishImg.height, x, -RubbishImg.height, 0, 3, RubbishImg, 1, 15));
            //console.log("Created Rubbish");
            // delete rubbish if it collide with other rubbish
            for (let j = 0; j < Rubbishs.length - 1; j += 1) {
                //console.log(Bullets[i].crashWith(Rubbishs[j]));
                if (Rubbishs[Rubbishs.length - 1].crashWith(Rubbishs[j]) == true) {
                    Rubbishs.splice(Rubbishs.length - 1, 1);
                    //console.log("rubbish collide with other rubbish");
                    break;
                }
            }
        }
    }
    //#endregion

    //#region Update
    console.log(plane);
    plane.newPos();
    plane.update();
    for (let i = 0; i < Rubbishs.length; i += 1) {
        //console.log(Rubbishs[i].y);
        Rubbishs[i].newPos();
        Rubbishs[i].update();
    }
    for (let i = 0; i < Bullets.length; i += 1) {
        //console.log(Rubbishs[i].y);
        Bullets[i].newPos();
        Bullets[i].update();
    }
    for (let i = 0; i < plane.life; i += 1) {
        //console.log(Planelife);
        ctx.drawImage(HeartImg, 10 + 50 * i, 10, 50, 50);
    }
    if (deviceType == "Mobile") {
        //console.log(Control_rod.img);
        Control_rod.update();
        Shoot_icon.update();
    }
    let context = canvas.getContext("2d");
    context.font = GameScore.textFont;
    GameScore.text = "SCORE: " + GameScore.score;
    let metrics = context.measureText(GameScore.text);
    GameScore.x = canvas.width - metrics.width - 20;
    GameScore.update();

    Progress_bar.width = (GameScore.score / 300) * (canvas.width - 60);
    Progress_bar.update();
    Progress_bar_background.update();
    //#endregion
}

function endgame(winbool) {
    clearInterval(interval);
    setTimeout(() => {
        bgAudio.pause();
        bgAudio = null;
        // //delete canvas
        if (winbool == false) {
            //add new text component to show game over
            GameEndRect = new RectComponent(canvas.width, canvas.height, 0, 0, 0, 0, "#FFFFFF", 0.5);
            GameEndRect.update();
            GameEnd = new TextComponent(0, 0, canvas.width / 2 - 100, canvas.height / 2, 0, 0, "text", "#000000", "40px Arial");
            GameEnd.text = "Game Over";
            GameEnd.update();
            //add new button to restart game
            var btn = document.createElement("button");
            btn.innerHTML = "Restart";
            btn.style.position = "fixed";
            btn.style.left = innerWidth / 2 - 50 + "px";
            btn.style.top = canvas.height / 2 + 50 + "px";
            btn.style.width = "100px";
            btn.style.height = "50px";
            btn.style.fontSize = "20px";
            btn.style.backgroundColor = "#FFFFFF";
            btn.style.border = "1px solid";
            btn.style.borderRadius = "5px";
            btn.style.cursor = "pointer";
            btn.style.zIndex = "2";
            document.body.appendChild(btn);
            btn.onclick = function () {
                document.body.removeChild(btn);
                clear();
                Bullets = [];
                Rubbishs = [];
                document.body.removeChild(canvas);
                startgame(gamelevel);
            };
        }
        else if (winbool == true) {
            context.clearRect(0, 0, canvas.width, canvas.height);
            Bullets = [];
            Rubbishs = [];
            plane = null;
            document.body.removeChild(canvas);
            gamelevel++;
            var storyLine = localStorage.getItem("storyLine");
            if (storyLine == null) {
                storyLine = 0;
            }
            storyLine = parseInt(storyLine) + 1;
            localStorage.setItem("storyLine", storyLine);
            navigateToStoryLine();
        }
    }, 100);

}

setTimeout(() => {
    console.log("startgame");
    startgame(gamelevel);
    loop();
}, 1500);