---
---

import * as UrlsLib from "./Urls.js";
import * as SpiritsLib from "./Spirits.js";
import * as RubbishsLib from "./Rubbishs.js";
import * as PageUrlLib from "./PageUrl.js";

export function startgame(gamelevel) {
    console.log(gamelevel);
    window.bgAudio = new Audio("../assets/audio/BGM_Lv" + gamelevel + ".mp3");
    window.bgAudio.loop = true;
    window.bgAudio.volume = 0.06;
    window.bgAudio.play();

    window.GameArea.start(gamelevel);
    window.GameArea.GameScore = new SpiritsLib.TextComponent(0, 0, 2 * window.GameArea.canvas.width / 4, 50, 0, 0, "text", "#000000", "30px Arial");
    window.GameArea.GameScore.score = 0;
    // 進度條
    window.GameArea.Progress_bar_background = new SpiritsLib.RectComponent(window.GameArea.canvas.width - 50, 20, 25, 60, 0, 0, "#FFFFFF", 0.5);
    window.GameArea.Progress_bar = new SpiritsLib.RectComponent(0, 16, 30, 62, 0, 0, "#000000", 1);

}

export function loop() {
    //#region Clear
    window.GameArea.clear();
    // delete bullet if it collide with Rubbish
    // delete rubbish if it's life < 0
    for (let i = 0; i < window.GameArea.Bullets.length; i += 1) {
        for (let j = 0; j < window.GameArea.Rubbishs.length; j += 1) {
            //console.log(Bullets[i].crashWith(Rubbishs[j]));
            if (window.GameArea.Bullets[i].crashWith(window.GameArea.Rubbishs[j]) == true) {
                window.GameArea.Rubbishs[j].life -= window.GameArea.Bullets[i].attack;
                window.GameArea.GameScore.score += window.GameArea.Bullets[i].attack;
                if (window.GameArea.GameScore.score >= 300) {
                    endgame(true);
                }
                window.GameArea.Bullets.splice(i, 1);
                if (window.GameArea.Rubbishs[j].life <= 0) {
                    window.GameArea.Rubbishs.splice(j, 1);
                };
                break;
            }
        }
    }
    // delete rubbish if it collide with Plane
    for (let j = 0; j < window.GameArea.Rubbishs.length; j += 1) {
        //console.log(Bullets[i].crashWith(Rubbishs[j]));
        if (window.GameArea.plane.crashWith(window.GameArea.Rubbishs[j]) == true) {
            window.GameArea.plane.life -= 1;
            window.GameArea.Rubbishs.splice(j, 1);
            if (window.GameArea.plane.life == 0) {
                endgame(false);
            }
            break;
        }
    }
    //delete rubbish and bullet if it go outside canvas
    for (let i = 0; i < window.GameArea.Bullets.length; i += 1) {
        //console.log(Rubbishs[i].y);
        if (window.GameArea.Bullets[i].overTop() === true) {
            window.GameArea.Bullets.splice(i, 1);
            //console.log("aaa");
        }
    }
    for (let i = 0; i < window.GameArea.Rubbishs.length; i += 1) {
        //console.log(Rubbishs[i].y);
        if (window.GameArea.Rubbishs[i].overBottom() === true) {
            window.GameArea.Rubbishs.splice(i, 1);
            //console.log("aaa");
        }
    }
    //#endregion

    //#region Create
    if (window.GameArea.Rubbishs.length < 2 || Math.floor(Math.random() * 60) == 2) {
        let RubbishImg = new Image();
        RubbishImg.src = UrlsLib.RubbishMetalImgUrls[Math.floor(Math.random() * UrlsLib.RubbishMetalImgUrls.length)];
        RubbishImg.onload = () => {
            let x = Math.floor(Math.random() * (window.GameArea.canvas.width - window.GameArea.plane.width + 1) + window.GameArea.plane.width / 2);
            window.GameArea.Rubbishs.push(new RubbishsLib.Rubbish(RubbishImg.width, RubbishImg.height, x, -RubbishImg.height, 0, 3, RubbishImg, 1, 15));
            //console.log("Created Rubbish");
            // delete rubbish if it collide with other rubbish
            for (let j = 0; j < window.GameArea.Rubbishs.length - 1; j += 1) {
                //console.log(Bullets[i].crashWith(Rubbishs[j]));
                if (window.GameArea.Rubbishs[window.GameArea.Rubbishs.length - 1].crashWith(window.GameArea.Rubbishs[j]) == true) {
                    window.GameArea.Rubbishs.splice(window.GameArea.Rubbishs.length - 1, 1);
                    //console.log("rubbish collide with other rubbish");
                    break;
                }
            }
        }
    }
    //#endregion

    //#region Update
    window.GameArea.plane.newPos();
    window.GameArea.plane.update();
    for (let i = 0; i < window.GameArea.Rubbishs.length; i += 1) {
        //console.log(Rubbishs[i].y);
        window.GameArea.Rubbishs[i].newPos();
        window.GameArea.Rubbishs[i].update();
    }
    for (let i = 0; i < window.GameArea.Bullets.length; i += 1) {
        //console.log(Rubbishs[i].y);
        window.GameArea.Bullets[i].newPos();
        window.GameArea.Bullets[i].update();
    }
    for (let i = 0; i < window.GameArea.plane.life; i += 1) {
        //console.log(Planelife);
        let ctx = window.GameArea.context;
        ctx.drawImage(HeartImg, 10 + 50 * i, 10, 50, 50);
    }
    if (deviceType == "Mobile") {
        //console.log(Control_rod.img);
        window.GameArea.Control_rod.update();
        window.GameArea.Shoot_icon.update();
    }
    let context = window.GameArea.canvas.getContext("2d");
    context.font = window.GameArea.GameScore.textFont;
    window.GameArea.GameScore.text = "SCORE: " + window.GameArea.GameScore.score;
    let metrics = context.measureText(window.GameArea.GameScore.text);
    window.GameArea.GameScore.x = window.GameArea.canvas.width - metrics.width - 20;
    window.GameArea.GameScore.update();

    window.GameArea.Progress_bar.width = (window.GameArea.GameScore.score / 300) * (window.GameArea.canvas.width - 60);
    window.GameArea.Progress_bar.update();
    window.GameArea.Progress_bar_background.update();
    //#endregion
}

export function endgame(winbool) {
    clearInterval(window.GameArea.interval);
    setTimeout(() => {
        window.bgAudio.pause();
        window.bgAudio = null;
        // //delete window.GameArea.canvas
        if (winbool == false) {
            //add new text component to show game over
            window.GameArea.GameEndRect = new SpiritsLib.RectComponent(window.GameArea.canvas.width, window.GameArea.canvas.height, 0, 0, 0, 0, "#FFFFFF", 0.5);
            window.GameArea.GameEndRect.update();
            window.GameArea.GameEnd = new SpiritsLib.TextComponent(0, 0, window.GameArea.canvas.width / 2 - 100, window.GameArea.canvas.height / 2, 0, 0, "text", "#000000", "40px Arial");
            window.GameArea.GameEnd.text = "Game Over";
            window.GameArea.GameEnd.update();
            //add new button to restart game
            var btn = document.createElement("button");
            btn.innerHTML = "Restart";
            btn.style.position = "fixed";
            btn.style.left = window.innerWidth / 2 - 50 + "px";
            btn.style.top = window.GameArea.canvas.height / 2 + 50 + "px";
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
                window.GameArea.clear();
                window.GameArea.Bullets = [];
                window.GameArea.Rubbishs = [];
                document.body.removeChild(window.GameArea.canvas);
                startgame(window.gamelevel);
            };
        }
        else if (winbool == true) {
            window.GameArea.clear();
            window.GameArea.Bullets = [];
            window.GameArea.Rubbishs = [];
            document.body.removeChild(window.GameArea.canvas);
            window.gamelevel++;
            var storyLine = localStorage.getItem("storyLine");
            if (storyLine == null) {
                storyLine = 0;
            }
            storyLine = parseInt(storyLine) + 1;
            localStorage.setItem("storyLine", storyLine);
            PageUrlLib.navigateToStoryLine();
        }
    }, 100);

}