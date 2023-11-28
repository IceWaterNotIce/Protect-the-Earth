/* unused file */

//exprt a function that will create gametips on canvas
function desktopTips(ctx, canvas) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("按下 A 或 D 移動", canvas.width / 2, canvas.height / 2);
    ctx.fillText("按下空白鍵射擊", canvas.width / 2, canvas.height / 2 + 50);
    ctx.fillText("按下 Enter 開始", canvas.width / 2, canvas.height / 2 + 100);
}
function mobileTips(ctx, canvas) {
    ctx.font = "30px Arial";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("觸碰左側移動向左", canvas.width / 2, canvas.height / 2);
    ctx.fillText("觸碰右側移動向右", canvas.width / 2, canvas.height / 2 + 50);
    ctx.fillText("觸碰底部射擊", canvas.width / 2, canvas.height / 2 + 100);
    ctx.fillText("觸碰任意位置開始", canvas.width / 2, canvas.height / 2 + 150);
    // let user continue game by touching anywhere on screen
    canvas.addEventListener("touchstart", () => {
        gameStart = true;
    });
}

function gameTips(ctx, canvas) {
    //according device type to create different tips content
    if (/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)) {
        mobileTips(ctx, canvas);
    } else {
        desktopTips(ctx, canvas);
    }
}