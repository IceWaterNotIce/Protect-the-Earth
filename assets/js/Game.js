function startgame(gamelevel) {
    console.log(gamelevel);
    window.bgAudio = new Audio("../assets/audio/BGM_Lv" + gamelevel + ".mp3");
    window.bgAudio.loop = true;
    window.bgAudio.volume = 0.06;
    window.bgAudio.play();

    GameArea.start(gamelevel);
    GameArea.GameScore = new TextComponent(0, 0, 2 * GameArea.canvas.width / 4, 50, 0, 0, "text", "#000000", "30px Arial");
    GameArea.GameScore.score = 0;
    // 進度條
    GameArea.Progress_bar_background = new RectComponent(GameArea.canvas.width - 50, 20, 25, 60, 0, 0, "#FFFFFF", 0.5);
    GameArea.Progress_bar = new RectComponent(0, 16, 30, 62, 0, 0, "#000000", 1);

}

function loop() {
    //#region Clear
    GameArea.clear();
    // delete bullet if it collide with Rubbish
    // delete rubbish if it's life < 0
    for (let i = 0; i < GameArea.Bullets.length; i += 1) {
        for (let j = 0; j < GameArea.Rubbishs.length; j += 1) {
            //console.log(Bullets[i].crashWith(Rubbishs[j]));
            if (GameArea.Bullets[i].crashWith(GameArea.Rubbishs[j]) == true) {
                GameArea.Rubbishs[j].life -= GameArea.Bullets[i].attack;
                GameArea.GameScore.score += GameArea.Bullets[i].attack;
                if (GameArea.GameScore.score >= 300) {
                    endgame(true);
                }
                GameArea.Bullets.splice(i, 1);
                if (GameArea.Rubbishs[j].life <= 0) {
                    GameArea.Rubbishs.splice(j, 1);
                };
                break;
            }
        }
    }
    // delete rubbish if it collide with Plane
    for (let j = 0; j < GameArea.Rubbishs.length; j += 1) {
        //console.log(Bullets[i].crashWith(Rubbishs[j]));
        if (GameArea.plane.crashWith(GameArea.Rubbishs[j]) == true) {
            GameArea.plane.life -= 1;
            GameArea.Rubbishs.splice(j, 1);
            if (GameArea.plane.life == 0) {
                endgame(false);
            }
            break;
        }
    }
    //delete rubbish and bullet if it go outside canvas
    for (let i = 0; i < GameArea.Bullets.length; i += 1) {
        //console.log(Rubbishs[i].y);
        if (GameArea.Bullets[i].overTop() === true) {
            GameArea.Bullets.splice(i, 1);
            //console.log("aaa");
        }
    }
    for (let i = 0; i < GameArea.Rubbishs.length; i += 1) {
        //console.log(Rubbishs[i].y);
        if (GameArea.Rubbishs[i].overBottom() === true) {
            GameArea.Rubbishs.splice(i, 1);
            //console.log("aaa");
        }
    }
    //#endregion

    //#region Create
    if (GameArea.Rubbishs.length < 2 || Math.floor(Math.random() * 60) == 2) {
        let RubbishImg = new Image();
        RubbishImg.src = RubbishMetalImgUrls[Math.floor(Math.random() * RubbishMetalImgUrls.length)];
        RubbishImg.onload = () => {
            let x = Math.floor(Math.random() * (GameArea.canvas.width - GameArea.plane.width + 1) + GameArea.plane.width / 2);
            GameArea.Rubbishs.push(new Rubbish(RubbishImg.width, RubbishImg.height, x, -RubbishImg.height, 0, 3, RubbishImg, 1, 15));
            //console.log("Created Rubbish");
            // delete rubbish if it collide with other rubbish
            for (let j = 0; j < GameArea.Rubbishs.length - 1; j += 1) {
                //console.log(Bullets[i].crashWith(Rubbishs[j]));
                if (GameArea.Rubbishs[GameArea.Rubbishs.length - 1].crashWith(GameArea.Rubbishs[j]) == true) {
                    GameArea.Rubbishs.splice(GameArea.Rubbishs.length - 1, 1);
                    //console.log("rubbish collide with other rubbish");
                    break;
                }
            }
        }
    }
    //#endregion

    //#region Update
    GameArea.plane.newPos();
    GameArea.plane.update();
    for (let i = 0; i < GameArea.Rubbishs.length; i += 1) {
        //console.log(Rubbishs[i].y);
        GameArea.Rubbishs[i].newPos();
        GameArea.Rubbishs[i].update();
    }
    for (let i = 0; i < GameArea.Bullets.length; i += 1) {
        //console.log(Rubbishs[i].y);
        GameArea.Bullets[i].newPos();
        GameArea.Bullets[i].update();
    }
    for (let i = 0; i < GameArea.plane.life; i += 1) {
        //console.log(Planelife);
        let ctx = GameArea.context;
        ctx.drawImage(HeartImg, 10 + 50 * i, 10, 50, 50);
    }
    if (deviceType == "Mobile") {
        //console.log(Control_rod.img);
        GameArea.Control_rod.update();
        GameArea.Shoot_icon.update();
    }
    let context = GameArea.canvas.getContext("2d");
    context.font = GameArea.GameScore.textFont;
    GameArea.GameScore.text = "SCORE: " + GameArea.GameScore.score;
    let metrics = context.measureText(GameArea.GameScore.text);
    GameArea.GameScore.x = GameArea.canvas.width - metrics.width - 20;
    GameArea.GameScore.update();

    GameArea.Progress_bar.width = (GameArea.GameScore.score / 300) * (GameArea.canvas.width - 60);
    GameArea.Progress_bar.update();
    GameArea.Progress_bar_background.update();
    //#endregion
}

function endgame(winbool) {
    clearInterval(GameArea.interval);
    setTimeout(() => {
        window.bgAudio.pause();
        window.bgAudio = null;
        // //delete GameArea.canvas
        if (winbool == false) {
            //add new text component to show game over
            GameArea.GameEndRect = new RectComponent(GameArea.canvas.width, GameArea.canvas.height, 0, 0, 0, 0, "#FFFFFF", 0.5);
            GameArea.GameEndRect.update();
            GameArea.GameEnd = new TextComponent(0, 0, GameArea.canvas.width / 2 - 100, GameArea.canvas.height / 2, 0, 0, "text", "#000000", "40px Arial");
            GameArea.GameEnd.text = "Game Over";
            GameArea.GameEnd.update();
            //add new button to restart game
            var btn = document.createElement("button");
            btn.innerHTML = "Restart";
            btn.style.position = "fixed";
            btn.style.left = window.innerWidth / 2 - 50 + "px";
            btn.style.top = GameArea.canvas.height / 2 + 50 + "px";
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
                GameArea.clear();
                GameArea.Bullets = [];
                GameArea.Rubbishs = [];
                document.body.removeChild(GameArea.canvas);
                startgame(window.gamelevel);
            };
        }
        else if (winbool == true) {
            GameArea.clear();
            GameArea.Bullets = [];
            GameArea.Rubbishs = [];
            GameArea.plane = null;
            document.body.removeChild(GameArea.canvas);
            window.gamelevel++;
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