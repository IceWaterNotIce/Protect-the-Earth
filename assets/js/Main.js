---
---

deviceType = findDeviceType();
console.log(deviceType);


var gamelevel;
var storyLine = localStorage.getItem("storyLine");
if (storyLine == null || storyLine == NaN) {
    gamelevel = '1';
}

switch (storyLine) {
    case "3":
        gamelevel = 1;
        break;
    case "5":
        gamelevel = 2;
        break;
    case "7":
        gamelevel = 3;
        break;
    default:
        gamelevel = 1;
        break;
}




HeartImg = new Image();
HeartImg.src = HeartImgUrl;
GameArea = {
    canvas: document.createElement("canvas"),
    start: function (gamelevel) {

        //console.log("HelloWorld");
        if (deviceType === "Mobile") {
            this.canvas.width = innerWidth;
            this.canvas.height = innerHeight;

        }
        if (deviceType === "Tablet") {
            if (innerWidth > innerHeight) {
                this.canvas.width = 500;
                this.canvas.height = innerHeight;
            } else {
                this.canvas.width = innerWidth;
                this.canvas.height = innerHeight;
            }
        }
        if (deviceType == "Desktop") {
            this.canvas.width = 500;
            this.canvas.height = innerHeight;
            desktopInput();
        }
        if (deviceType == "Mobile") {
            GameArea.Control_rod;
            var Control_rod_img = new Image();
            Control_rod_img.src = "../assets/img\\ui\\Control_rod_1.png";
            Control_rod_img.onload = () => {
                GameArea.Control_rod = new ImgComponent(GameArea.canvas.width / 2, GameArea.canvas.width / 2, 0, GameArea.canvas.height - GameArea.canvas.width / 2, 0, 0, Control_rod_img, 0.5);
            }
            GameArea.Shoot_icon;
            var Shoot_icon_img = new Image();
            Shoot_icon_img.src = "../assets/img\\ui\\Shoot_icon_1.png";
            Shoot_icon_img.onload = () => {
                GameArea.Shoot_icon = new ImgComponent(GameArea.canvas.width / 2, GameArea.canvas.width / 2, GameArea.canvas.width - Shoot_icon_img.width, GameArea.canvas.height - Shoot_icon_img.height, 0, 0, Shoot_icon_img, 0.5);
            }
        }

        var PlaneImg = new Image();
        PlaneImg.src = PlaneImgUrls[gamelevel - 1];
        console.log(PlaneImgUrls[gamelevel - 1]);
        PlaneImg.onload = () => {
            this.plane = new Plane(PlaneImg.width - 50, PlaneImg.height - 50, GameArea.canvas.width / 2, 2 * GameArea.canvas.height / 3, 0, 0, PlaneImg, 1, 4, 5 * gamelevel);
            GameArea.Bullets = [];

            // insert canvas to main

            this.Rubbishs = [];
            document.body.appendChild(this.canvas);
            document.body.style.textAlign = 'center';
            this.context = this.canvas.getContext("2d");
            // 
            this.canvas.style.border = "1px solid";
            this.interval = setInterval(loop, 20);

            console.log(deviceType);
            console.log(deviceType == "Mobile");
            if (deviceType == "Mobile") {
                mobileInput();
            }
        }
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

startgame(gamelevel);






// function endplot() {
//     if (index == 4) {
//         var xhr = new XMLHttpRequest();
//         xhr.open('get', "./gameend.html");
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
//     xhr.open('get', "./storyline/plot_" + index + ".html");

//     xhr.send();
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             document.body.style.backgroundImage = "url(./assets/img/background/plot" + index + ".jpg)";
//             document.querySelector('main').innerHTML = xhr.responseText;
//             var textindex = 0;
//             var text = document.getElementsByTagName("p")[0].innerText;
//             var chars = Array.from(text);

//             document.getElementsByTagName("p")[0].innerText = '';
//             keyboardaudio = new Audio("./assets/audio/Keyboard_Typing_Fast.mp3");
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