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
    const rubbish = PIXI.Sprite.from(rubbishsTextureArray[0]);
    app.stage.addChild(rubbish);

    // make the sprite interactive
    rubbish.eventMode = 'dynamic';

    const move = (delta) => {
        // x座標加1 (往右移)
        rubbish.x += 1 * delta;
    }
    app.ticker.add(move);
});
