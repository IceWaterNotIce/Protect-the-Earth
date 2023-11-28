---
---

window.deviceType = findDeviceType();
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
HeartImg.src = HeartImgUrl;
window.window.GameArea = {
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
            desktopInput();
        }
        if (deviceType == "Mobile") {
            window.GameArea.Control_rod;
            var Control_rod_img = new Image();
            Control_rod_img.src = "../assets/img\\ui\\Control_rod_1.png";
            Control_rod_img.onload = () => {
                window.GameArea.Control_rod = new ImgComponent(window.GameArea.canvas.width / 2, window.GameArea.canvas.width / 2, 0, window.GameArea.canvas.height - window.GameArea.canvas.width / 2, 0, 0, Control_rod_img, 0.5);
            }
            window.GameArea.Shoot_icon;
            var Shoot_icon_img = new Image();
            Shoot_icon_img.src = "../assets/img\\ui\\Shoot_icon_1.png";
            Shoot_icon_img.onload = () => {
                window.GameArea.Shoot_icon = new ImgComponent(window.GameArea.canvas.width / 2, window.GameArea.canvas.width / 2, window.GameArea.canvas.width - Shoot_icon_img.width, window.GameArea.canvas.height - Shoot_icon_img.height, 0, 0, Shoot_icon_img, 0.5);
            }
            mobileInput();
        }
        
        var PlaneImg = new Image();
        PlaneImg.src = PlaneImgUrls[gamelevel - 1];
        PlaneImg.onload = () => {
            this.plane = new Plane(PlaneImg.width - 50, PlaneImg.height - 50, window.GameArea.canvas.width / 2, 2 * window.GameArea.canvas.height / 3, 0, 0, PlaneImg, 1, 4, 5 * gamelevel);
        }
        this.Bullets = [];
        
        // insert canvas to main

        this.Rubbishs = [];
        document.body.appendChild(this.canvas);
        document.body.style.textAlign = 'center';
        this.context = this.canvas.getContext("2d");
        // 
        this.canvas.style.border = "1px solid";
        this.interval = setInterval(loop, 20);
    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
};

startgame(window.gamelevel);






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