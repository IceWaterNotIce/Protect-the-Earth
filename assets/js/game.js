// 創建應用程式助手並將其渲染目標添加到頁面上
const app = new PIXI.Application({
    background: '#1099bb',
    resizeTo: window,
});
document.body.appendChild(app.view);

// 創建各個圖層
let backgroundLayer = new PIXI.Container();
let gameLayer = new PIXI.Container();
let uiLayer = new PIXI.Container();

// 將圖層添加到舞台
app.stage.addChild(backgroundLayer);
app.stage.addChild(gameLayer);
app.stage.addChild(uiLayer);

// 載入 json
var plane;
const planesPromise = PIXI.Assets.load('./assets/images/plane/planes.json');
planesPromise.then(() => {
    // 創建一個 array 來存放 texture
    const planesTextureArray = [];
    for (let i = 0; i < 2; i++) {
        // 轉為 texture 並放入 array
        planesTextureArray.push(PIXI.Texture.from(`planes${i}.png`));
    }
    plane = PIXI.Sprite.from(planesTextureArray[0]);
    gameLayer.addChild(plane);

    plane.x = app.view.width / 2 - plane.width / 2;
    plane.y = app.view.height - plane.height;
    plane.eventMode = 'dynamic';
    console.log(plane);
    // 綁定鍵盤事件
    window.addEventListener("keydown", (e) => {
        const { code } = e;
        // 按下鍵盤時，判斷按下的是哪個按鍵，並移動飛機
        if (code === 'KeyA') {
            plane.vx = -5;
        } else if (code === 'KeyD') {
            plane.vx = 5;
        }
    });

    window.addEventListener("keyup", (e) => {
        const { code } = e;
        // 放開鍵盤時停止移動飛機
        if (code === 'KeyA' || code === 'KeyD') {
            plane.vx = 0;
        }
    });

    plane.vx = 0;
    const move = (delta) => {
        // 垃圾超出畫面時，移除垃圾
        plane.x += plane.vx * delta;
    }
    app.ticker.add(move);
});

const control_UI_Promise = PIXI.Assets.load('./assets/images/ui/control_UI.json');
control_UI_Promise.then(() => {
    const Control_rod = PIXI.Sprite.from('Control_rod_1.png');
    uiLayer.addChild(Control_rod);
    Control_rod.x = 0;
    Control_rod.y = app.view.height - Control_rod.height;

    // 綁定點擊事件
    Control_rod.interactive = true;
    Control_rod.buttonMode = true;
    Control_rod.on('pointerdown', (e) => {
        console.log(e.x, e.y);
        if (e.x < Control_rod.width / 2) {
            plane.vx = -5;
        }
        else {
            plane.vx = 5;
        }
    });
    Control_rod.on('pointerup', (e) => {
        plane.vx = 0;
    });

    const Shoot_icon = PIXI.Sprite.from('Shoot_icon_1.png');
    uiLayer.addChild(Shoot_icon);
    Shoot_icon.x = app.view.width - Shoot_icon.width;
    Shoot_icon.y = app.view.height - Shoot_icon.height;

    // 綁定點擊事件
    Shoot_icon.interactive = true;
    Shoot_icon.buttonMode = true;

    Shoot_icon.on('pointerdown', (e) => {
        console.log(e.x, e.y);
    });
});

// 載入 json
const rubbishsPromise = PIXI.Assets.load('./assets/images/rubbishs/rubbishs.json');
rubbishsPromise.then(() => {
    // 創建一個 array 來存放 texture
    const rubbishsTextureArray = [];
    for (let i = 0; i < 2; i++) {
        // 轉為 texture 並放入 array
        rubbishsTextureArray.push(PIXI.Texture.from(`rubbishs${i}.png`));
    }

    var rubbishGenerateInterval = setInterval(() => {
        const rubbish = PIXI.Sprite.from(rubbishsTextureArray[rubbishsTextureArray.length * Math.random() | 0]);
        gameLayer.addChild(rubbish);

        // 設定垃圾的起始位置
        rubbish.eventMode = 'dynamic';
        rubbish.x = Math.random() * (app.view.width - rubbish.width);
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

// 載入 json
const bulletsPromise = PIXI.Assets.load('./assets/images/bullets.json');