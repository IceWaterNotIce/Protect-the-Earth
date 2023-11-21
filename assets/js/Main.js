---
---

import * as SpiritsLib from "{{ site.url }}{{ site.baseurl }}/assets/js/Spirits.js";
import * as PlaneLib from "{{ site.url }}{{ site.baseurl }}/assets/js/Plane.js";
import * as BulletsLib from "{{ site.url }}{{ site.baseurl }}/assets/js/Bullets.js";
import * as RubbishsLib from "{{ site.url }}{{ site.baseurl }}/assets/js/Rubbishs.js";
import * as GameLib from "{{ site.url }}{{ site.baseurl }}/assets/js/Game.js";
import * as UrlsLib from "{{ site.url }}{{ site.baseurl }}/assets/js/Urls.js";
import * as deviceTypeLib from "{{ site.url }}{{ site.baseurl }}/assets/js/deviceType.js";
import * as PlayerInputLib from "{{ site.url }}{{ site.baseurl }}/assets/js/PlayerInput.js";

window.deviceType = deviceTypeLib.findDeviceType();
console.log(window.deviceType);


window.gamelevel;
var storyLine = localStorage.getItem("storyLine");
if (storyLine == null || storyLine == NaN) {
    window.gamelevel = '1';
}

switch (storyLine) {
    case "3":
        window.gamelevel = 1;
        break;
    case "5":
        window.gamelevel = 2;
        break;
    case "7":
        window.gamelevel = 3;
        break;
    default:
        window.gamelevel = 1;
        break;
}




window.HeartImg = new Image();
HeartImg.src = UrlsLib.HeartImgUrl;
window.GameArea = {
    canvas: document.createElement("canvas"),
    start: function (gamelevel) {

        //console.log("HelloWorld");
        if (window.deviceType === "Mobile") {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            
        }
        if (window.deviceType === "Tablet") {
            if (window.innerWidth > window.innerHeight) {
                this.canvas.width = 500;
                this.canvas.height = window.innerHeight;
            } else {
                this.canvas.width = window.innerWidth;
                this.canvas.height = window.innerHeight;
            }
        }
        if (window.deviceType == "Desktop") {
            this.canvas.width = 500;
            this.canvas.height = window.innerHeight;
            PlayerInputLib.desktopInput();
        }
        if (deviceType == "Mobile") {
            GameArea.Control_rod;
            var Control_rod_img = new Image();
            Control_rod_img.src = "{{ site.url }}{{ site.baseurl }}/assets/img\\ui\\Control_rod_1.png";
            Control_rod_img.onload = () => {
                GameArea.Control_rod = new SpiritsLib.ImgComponent(GameArea.canvas.width / 2, GameArea.canvas.width / 2, 0, GameArea.canvas.height - GameArea.canvas.width / 2, 0, 0, Control_rod_img, 0.5);
            }
            GameArea.Shoot_icon;
            var Shoot_icon_img = new Image();
            Shoot_icon_img.src = "{{ site.url }}{{ site.baseurl }}/assets/img\\ui\\Shoot_icon_1.PNG";
            Shoot_icon_img.onload = () => {
                GameArea.Shoot_icon = new SpiritsLib.ImgComponent(GameArea.canvas.width / 2, GameArea.canvas.width / 2, GameArea.canvas.width - Shoot_icon_img.width, GameArea.canvas.height - Shoot_icon_img.height, 0, 0, Shoot_icon_img, 0.5);
            }
            PlayerInputLib.mobileInput();
        }
        
        var PlaneImg = new Image();
        PlaneImg.src = UrlsLib.PlaneImgUrls[gamelevel - 1];
        PlaneImg.onload = () => {
            GameArea.plane = new PlaneLib.Plane(PlaneImg.width - 50, PlaneImg.height - 50, GameArea.canvas.width / 2, 2 * GameArea.canvas.height / 3, 0, 0, PlaneImg, 1, 4, 5 * gamelevel);
        }
        GameArea.Bullets = [];
        
        // insert canvas to main

        GameArea.Rubbishs = [];
        document.body.appendChild(this.canvas);
        document.body.style.textAlign = 'center';
        this.context = this.canvas.getContext("2d");
        // 
        this.canvas.style.border = "1px solid";
        this.interval = setInterval(GameLib.loop, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

GameLib.startgame(window.gamelevel);






// function endplot() {
//     if (index == 4) {
//         var xhr = new XMLHttpRequest();
//         xhr.open('get', "{{ site.url }}{{ site.baseurl }}/gameend.html");
//         xhr.send();
//         xhr.onreadystatechange = function () {
//             if (xhr.readyState == 4 && xhr.status == 200) {
//                 document.querySelector('main').innerHTML = xhr.responseText;
//             }
//         }
//     }
//     else {
//         document.getElementsByTagName("p")[0].style.display = "none";
//         keyboardaudio.pause();
//         startgame(index);
//     }
// }

// function startplot() {
//     var xhr = new XMLHttpRequest();
//     xhr.open('get', "{{ site.url }}{{ site.baseurl }}/storyline/plot_" + index + ".html");

//     xhr.send();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             document.body.style.backgroundImage = "url({{ site.url }}{{ site.baseurl }}/assets/img/background/plot" + index + ".jpg)";
//             document.querySelector('main').innerHTML = xhr.responseText;
//             var textindex = 0;
//             var text = document.getElementsByTagName("p")[0].innerText;
//             var chars = Array.from(text);

//             document.getElementsByTagName("p")[0].innerText = '';
//             keyboardaudio = new Audio("{{ site.url }}{{ site.baseurl }}/assets/audio/Keyboard_Typing_Fast.mp3");
//             keyboardaudio.volume = 1;
//             keyboardaudio.play();

//             var intervalId = setInterval(function () {
//                 if (textindex < chars.length) {
//                     document.getElementsByTagName("p")[0].innerText += chars[textindex];
//                     textindex++;
//                 } else {
//                     clearInterval(intervalId);
//                     setTimeout(function () {
//                         endplot();
//                     }, 2000);
//                 }
//             }, 75);

//             document.getElementById("plotJumpBtn").addEventListener("click", function () {
//                 clearInterval(intervalId);
//                 document.getElementsByTagName("p")[0].innerText = text;
//                 endplot();
//             });
//         }
//     }
// }