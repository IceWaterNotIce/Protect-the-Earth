---
---

function startgame(gamelevel) {
    console.log(gamelevel);
    document.getElementsByTagName("main")[0].innerHTML = "";
    bgAudio = new Audio("{{ site.url }}{{ site.baseurl }}/assets/audio/BGM_Lv" + gamelevel + ".mp3");
    bgAudio.loop = true;
    bgAudio.volume = 0.1;
    bgAudio.play();

    GameArea.start();
    GameScore = new TextComponent(0, 0, 2 * GameArea.canvas.width / 4, 50, 0, 0, "text", "#000000", "40px Arial");
    GameScore.score = 0;
    // 進度條
    Progress_bar_background = new RectComponent(GameArea.canvas.width -50, 20, 25, 60, 0, 0, "#FFFFFF", 0.5);
    Progress_bar = new RectComponent(0, 16, 30, 62, 0, 0, "#000000", 1);

}

function loop() {
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
    if (Rubbishs.length < 2 || Math.floor(Math.random() * 80) == 2) {
        let RubbishImg = new Image();
        RubbishImg.src = RubbishMetalImgUrls[Math.floor(Math.random() * RubbishMetalImgUrls.length)];
        RubbishImg.onload = () => {
            let x = Math.floor(Math.random() * (GameArea.canvas.width - plane.width + 1) + plane.width / 2);
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
        ctx.drawImage(HeartImg, 10 + HeartImg.width * i, 10);
    }
    if (deviceType == "Mobile") {
        //console.log(Control_rod.img);
        Control_rod.update();
        Shoot_icon.update();
    }
    let context = GameArea.canvas.getContext("2d");
    context.font = GameScore.textFont;
    GameScore.text = "SCORE: " + GameScore.score;
    let metrics = context.measureText(GameScore.text);
    GameScore.x = GameArea.canvas.width - metrics.width;
    GameScore.update();

    Progress_bar.width =  (GameScore.score / 300) * (GameArea.canvas.width-60);
    Progress_bar.update();
    Progress_bar_background.update();
    //#endregion
}

function endgame(winbool) {
    clearInterval(GameArea.interval);
    bgAudio.pause();
    bgAudio = null;
    // //delete GameArea.canvas
    if (winbool == false) {
        //add new text component to show game over
        GameEndRect = new RectComponent(GameArea.canvas.width, GameArea.canvas.height, 0, 0, 0, 0, "#FFFFFF", 0.5);
        GameEndRect.update();
        GameEnd = new TextComponent(0, 0, GameArea.canvas.width / 2 - 100, GameArea.canvas.height / 2, 0, 0, "text", "#000000", "40px Arial");
        GameEnd.text = "Game Over";
        GameEnd.update();
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
            Bullets = [];
            Rubbishs = [];
            document.getElementsByTagName("main")[0].removeChild(GameArea.canvas);
            startgame(index);
        };
    }
    else if (winbool == true) {
        GameArea.clear();
        Bullets = [];
        Rubbishs = [];
        document.getElementsByTagName("main")[0].removeChild(GameArea.canvas);
        index++;
        startplot();
    }

}