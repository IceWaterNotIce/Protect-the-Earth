// here to control website ui and functionality

// 通過播放背景音樂、顯示遊戲介紹文字，然後在文字顯示完畢後開始遊戲，初始化遊戲。
// var bgAudio;
// var gamelevel = 0;

// function startplot() {

//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "./html/plot.html", true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             document.body.innerHTML = xhr.responseText;
//         }
//     }
//     xhr.send();
    
//     var xhr = new XMLHttpRequest();
//     xhr.open("GET", "./plot/plot_" + gamelevel + ".txt", true);
//     xhr.onreadystatechange = function () {
//         if (xhr.readyState == 4 && xhr.status == 200) {
//             var text = xhr.responseText;
//             var chars = Array.from(text);
//             var index = 0;
//             document.getElementById("div_text").style.display = 'block';
//             document.getElementById("div_text").innerText = '';
//             keyboardaudio = new Audio("assets/audio/Keyboard_Typing_Fast.mp3");
//             keyboardaudio.play();
//             var intervalId = setInterval(function () {
//                 if (index < chars.length) {
//                     document.getElementById("div_text").innerText += chars[index];
//                     index++;
//                 } else {
//                     clearInterval(intervalId);
//                     setTimeout(function () {
//                         startgame();
//                         document.getElementById("div_text").style.display = "none";
//                         bgAudio.pause();
//                     }, 2000);
//                 }
//             }, 75);
//         }
//     }
//     xhr.send();

// }
// document.addEventListener("DOMContentLoaded", function () {

//     // check local storage for game level
//     if (localStorage.getItem("gamelevel") != null) {
//         gamelevel = parseInt(localStorage.getItem("gamelevel"));
//     }
//     else {
//         gamelevel = 0;
//         localStorage.setItem("gamelevel", gamelevel);
//     }

//     switch (gamelevel) {
//         case 0:
//             gamelevel += 1;
//             // create cover page
//             var xhr = new XMLHttpRequest();
//             xhr.open("GET", "./html/coverPage.html", true);
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState == 4 && xhr.status == 200) {
//                     document.body.innerHTML = xhr.responseText;
//                 }
//             }
//             xhr.send();
//             bgAudio = new Audio("../assets/audio/BGM_Start_UI.mp3");
//             bgAudio.play();
//             bgAudio.volume = 0.2;
//         case 1:
//             // create game introduction page
//             var xhr = new XMLHttpRequest();
//             xhr.open("GET", "./html/plot.html", true);
//             xhr.onreadystatechange = function () {
//                 if (xhr.readyState == 4 && xhr.status == 200) {
//                     document.body.innerHTML = xhr.responseText;
//                 }
//             }
//             xhr.send();
//             gamelevel += 1;
//             break;
//     }

// });


// gamelevel += 1;
// //#region show plot
// var xhr = new XMLHttpRequest();
// xhr.open("GET", "./plot/plot_" + gamelevel + ".txt", true);
// xhr.onreadystatechange = function () {
//     if (xhr.readyState == 4 && xhr.status == 200) {
//         var text = xhr.responseText;
//         var chars = Array.from(text);
//         var index = 0;
//         document.getElementById("div_text").style.display = 'block';
//         document.getElementById("div_text").innerText = '';
//         keyboardaudio = new Audio("Audios/Keyboard_Typing_Fast.mp3");
//         keyboardaudio.play();
//         var intervalId = setInterval(function () {
//             if (index < chars.length) {
//                 document.getElementById("div_text").innerText += chars[index];
//                 index++;
//             } else {
//                 clearInterval(intervalId);
//                 setTimeout(function () {
//                     startgame();
//                     document.getElementById("div_text").style.display = "none";
//                     bgAudio.pause();
//                 }, 2000);
//             }
//         }, 75);
//     }
// }
// xhr.send();