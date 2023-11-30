// 創建應用程式助手並將其渲染目標添加到頁面上
const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window,
});
document.body.appendChild(app.view);

// 載入 json
const planesPromise = PIXI.Assets.load('./assets/images/planes.json');
planesPromise.then(() => {
    // 創建一個 array 來存放 texture
    const planesTextureArray = [];
    for (let i = 0; i < 2; i++) {
        // 轉為 texture 並放入 array
        planesTextureArray.push(PIXI.Texture.from(`planes${i}.png`));
    }
    const plane = PIXI.Sprite.from(planesTextureArray[0]);
    app.stage.addChild(plane);

    plane.x = app.view.width / 2 - plane.width / 2;
    plane.y = app.view.height - plane.height;
    plane.eventMode = 'dynamic';

    // 綁定鍵盤事件
    window.addEventListener("keydown", (e) => {
        const { code } = e;
        // 按下鍵盤時，判斷按下的是哪個按鍵，並移動飛機
        if (code === 'KeyA') {
            plane.x -= 5;
        } else if (code === 'KeyD') {
            plane.x += 5;
        }
    });
});

// 載入 json
const rubbishsPromise = PIXI.Assets.load('./assets/images/rubbishs.json');
rubbishsPromise.then(() => {
    // 創建一個 array 來存放 texture
    const rubbishsTextureArray = [];
    for (let i = 0; i < 2; i++) {
        // 轉為 texture 並放入 array
        rubbishsTextureArray.push(PIXI.Texture.from(`rubbishs${i}.png`));
    }

    var rubbishGenerateInterval = setInterval(() => {
        const rubbish = PIXI.Sprite.from(rubbishsTextureArray[0]);
        app.stage.addChild(rubbish);

        // 設定垃圾的起始位置
        rubbish.eventMode = 'dynamic';
        rubbish.x = Math.random() * app.view.width - rubbish.width;
        rubbish.y = -rubbish.height;

        // 設定垃圾的移動
        const move = (delta) => {
            // 垃圾超出畫面時，移除垃圾
            if (rubbish.y > app.view.height) {
                app.ticker.remove(move);
                app.stage.removeChild(rubbish);
            }
            rubbish.y += 2 * delta;
        }
        app.ticker.add(move);
    }, 1000);


});
