

// 創建應用程式助手並將其渲染目標添加到頁面上
const app = new PIXI.Application({
    background: 'rgba(255, 255, 255, 0.1)',
    resizeTo: window,
});
document.body.appendChild(app.view);

// 創建各個圖層
let backgroundLayer = new PIXI.Container();
let gameLayer = new PIXI.Container();
let rubbishGroup = new PIXI.Container();
gameLayer.addChild(rubbishGroup);
let uiLayer = new PIXI.Container();

// 將圖層添加到舞台
app.stage.addChild(backgroundLayer);
app.stage.addChild(gameLayer);
app.stage.addChild(uiLayer);
(async function () {
    // 載入 json
    let plane;
    let planeCanShoot = false;
    let scoreValue = 0;
    let max_score = 2;
    let planeLife = 4;
    const planesPromise = await PIXI.Assets.load('../assets/images/plane/planes.json');

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

    // 綁定鍵盤事件
    window.addEventListener("keydown", (e) => {
        const { code } = e;
        // 按下鍵盤時，判斷按下的是哪個按鍵，並移動飛機
        if (code === 'KeyA') {
            plane.vx = -5;
        } else if (code === 'KeyD') {
            plane.vx = 5;
        }
        else if (code === 'Space') {
            planeCanShoot = true;
        }
    });

    window.addEventListener("keyup", (e) => {
        const { code } = e;
        // 放開鍵盤時停止移動飛機
        if (code === 'KeyA' || code === 'KeyD') {
            plane.vx = 0;
        }
        else if (code === 'Space') {
            planeCanShoot = false;
        }
    });





    // uiLayer




    const score = new PIXI.Text('Score: 0', { fill: 'white' });
    uiLayer.addChild(score);
    score.x = 0;
    score.y = 0;

    const scoreUpdate = () => {
        score.text = `Score: ${scoreValue}`;
        if (scoreValue >= max_score) {
            app.ticker.remove(scoreUpdate);
            plane.visible = false;
            clearInterval(rubbishGenerator);
            clearInterval(bulletGenerator);

            //stop all rubbish move
            app.ticker.stop();
            // game over
            // draw background rect
            const background = new PIXI.Graphics();
            uiLayer.addChild(background);
            background.x = 0;
            background.y = 0;
            background.beginFill(0xffffff, 0.3); // Set the fill color to rgba(255,255,255,0.3)
            background.drawRect(0, 0, app.view.width, app.view.height);
            background.endFill();
            // draw game over text
            const gameover = new PIXI.Text('You Win', { fill: 'white' });
            uiLayer.addChild(gameover);
            gameover.x = app.view.width / 2 - gameover.width / 2;
            gameover.y = app.view.height / 2 - gameover.height / 2;

            //show player score
            const score = new PIXI.Text(`Your Score: ${scoreValue}`, { fill: 'white' });
            uiLayer.addChild(score);
            score.x = app.view.width / 2 - score.width / 2;
            score.y = app.view.height / 2 - score.height / 2 + 50;

            //wait 3 seconds and go to 
            setTimeout(() => {
                storyLine = parseInt(storyLine) + 1;
                localStorage.setItem("storyLine", storyLine);
                navigateToStoryLine();
            }, 3000);
        }
    }
    app.ticker.add(scoreUpdate);

    // process bar
    const processBar = new PIXI.Graphics();
    uiLayer.addChild(processBar);
    processBar.x = 0;
    processBar.y = 80;
    processBar.lineStyle(2, 0x000000, 1);
    processBar.beginFill(0x000000, 1);
    processBar.drawRect(0, 0, app.view.width, 15);
    processBar.endFill();

    const processBarUpdate = () => {
        processBar.clear();
        processBar.lineStyle(2, 0x000000, 1);
        processBar.beginFill(0x000000, 1);
        processBar.drawRect(0, 0, app.view.width * (1 - (scoreValue / max_score)), 15);
        processBar.endFill();
    }
    app.ticker.add(processBarUpdate);


    // plane life heart image
    // plane have four heart, so create four heart images and set their position on the screen left top
    // show heart images when plane life is more than 0, plane life - 1 when hit by rubbish,
    // hide heart images when plane life is less than 0
    const heart_texture = await PIXI.Texture.from('../assets/images/ui/heart.png');
    const heart1 = await PIXI.Sprite.from(heart_texture);

    plane.vx = 0;
    const move = (delta) => {

        // plane collide with rubbish
        for (let i = 0; i < rubbishGroup.children.length; i++) {
            const rubbish = rubbishGroup.children[i];
            if (plane.x + plane.width >= rubbish.x && plane.x <= rubbish.x + rubbish.width && plane.y <= rubbish.y + rubbish.height && plane.y + plane.height >= rubbish.y) {
                rubbishGroup.removeChild(rubbish);
                planeLife--;
                if (planeLife <= 0) {
                    app.ticker.remove(move);
                    plane.visible = false;
                    clearInterval(rubbishGenerator);
                    clearInterval(bulletGenerator);

                    //stop all rubbish move
                    app.ticker.stop();
                    // game over
                    // draw background rect
                    const background = new PIXI.Graphics();
                    uiLayer.addChild(background);
                    background.x = 0;
                    background.y = 0;
                    background.beginFill(0xffffff, 0.3); // Set the fill color to rgba(255,255,255,0.3)
                    background.drawRect(0, 0, app.view.width, app.view.height);
                    background.endFill();
                    // draw game over text
                    const gameover = new PIXI.Text('Game Over', { fill: 'white' });
                    uiLayer.addChild(gameover);
                    gameover.x = app.view.width / 2 - gameover.width / 2;
                    gameover.y = app.view.height / 2 - gameover.height / 2;

                    //show player score
                    const score = new PIXI.Text(`Your Score: ${scoreValue}`, { fill: 'white' });
                    uiLayer.addChild(score);
                    score.x = app.view.width / 2 - score.width / 2;
                    score.y = app.view.height / 2 - score.height / 2 + 50;


                    // draw restart text
                    // it should have a boarder
                    const restart = new PIXI.Text('Restart', { fill: 'white' });
                    uiLayer.addChild(restart);
                    restart.x = app.view.width / 2 - restart.width / 2;
                    restart.y = app.view.height / 2 - restart.height / 2 + 100;
                    restart.interactive = true;
                    restart.buttonMode = true;

                    // Add border to the restart text
                    restart.style.stroke = 'black';
                    restart.style.strokeThickness = 4;

                    restart.on('pointerdown', (e) => {
                        window.location.reload();
                    });

                    break;
                }
                break;
            }
        }

        for (let i = 0; i < planeLife; i++) {
            const heart = PIXI.Sprite.from(heart_texture);
            uiLayer.addChild(heart);
            heart.scale = new PIXI.Point(0.2, 0.2);
            heart.x = i * heart.width;
            heart.y = 90;
            const move = (delta) => {
                if (planeLife <= i) {
                    app.ticker.remove(move);
                    uiLayer.removeChild(heart);
                }
            }
            app.ticker.add(move);

        }


        plane.x += plane.vx * delta;
        if (plane.x < 0) {
            plane.x = 0;
        }
        else if (plane.x > app.view.width - plane.width) {
            plane.x = app.view.width - plane.width;
        }

    }
    app.ticker.add(move);


    const control_UI_Promise = await PIXI.Assets.load('../assets/images/ui/control_UI.json');

    const Control_rod = PIXI.Sprite.from('Control_rod_1.png');
    uiLayer.addChild(Control_rod);
    Control_rod.x = 0;
    Control_rod.y = app.view.height - Control_rod.height;

    // 綁定點擊事件
    Control_rod.eventMode = 'dynamic';
    Control_rod.buttonMode = true;
    Control_rod.on('pointerdown', (e) => {
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

    const Shoot_icon = await PIXI.Sprite.from('Shoot_icon_1.png');
    uiLayer.addChild(Shoot_icon);
    Shoot_icon.x = app.view.width - Shoot_icon.width;
    Shoot_icon.y = app.view.height - Shoot_icon.height;

    // 綁定點擊事件
    Shoot_icon.eventMode = 'dynamic';
    Shoot_icon.buttonMode = true;

    Shoot_icon.on('pointerdown', (e) => {
        planeCanShoot = true;
    });
    Shoot_icon.on('pointerup', (e) => {
        planeCanShoot = false;
    });



    //sound icon
    let sound = true;

    const sound_icon_texture = await PIXI.Texture.from('../assets/images/ui/Sound_open_1.png');
    const mute_sound_icon_texture = await PIXI.Texture.from('../assets/images/ui/Sound_close_1.png');
    const sound_icon = await PIXI.Sprite.from(sound_icon_texture);
    uiLayer.addChild(sound_icon);;
    sound_icon.x = 0;
    sound_icon.y = 20;
    sound_icon.scale = new PIXI.Point(0.5, 0.5);
    sound_icon.eventMode = 'dynamic';
    sound_icon.buttonMode = true;
    sound_icon.on('pointerdown', (e) => {
        if (sound_icon.texture.textureCacheIds[0] === mute_sound_icon_texture.textureCacheIds[0]) {
            sound_icon.texture = sound_icon_texture;
            sound = true;
        }
        else {
            sound_icon.texture = mute_sound_icon_texture;
            sound = false;
        }
    });


    // 載入 json
    const rubbishsPromise = await PIXI.Assets.load('../assets/images/rubbishs/rubbishs.json');
    // 創建一個 array 來存放 texture
    const rubbishsTextureArray = [];
    for (let i = 0; i < 12; i++) {
        // 轉為 texture 並放入 array
        rubbishsTextureArray.push(await PIXI.Texture.from(`rubbishs${i}.png`));
    }

    // 創建垃圾
    let rubbishGenerator = setInterval(() => {
        const rubbish = PIXI.Sprite.from(rubbishsTextureArray[rubbishsTextureArray.length * Math.random() | 0]);
        rubbishGroup.addChild(rubbish);
        //rubbish life bar
        const rubbish_life_bar = new PIXI.Graphics();
        rubbish.addChild(rubbish_life_bar);
        rubbish.life = 100;
        rubbish.max_life = 100;
        rubbish_life_bar.x = 0;
        rubbish_life_bar.y = 0;
        rubbish_life_bar.lineStyle(2, 0x000000, 1);
        rubbish_life_bar.beginFill(0x000000, 1);
        rubbish_life_bar.drawRect(0, 0, rubbish.width, 10);
        rubbish_life_bar.endFill();

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

            //life bar
            rubbish_life_bar.clear();
            rubbish_life_bar.lineStyle(2, 0xFF0000, 1); // Set color to red
            rubbish_life_bar.beginFill(0xFF0000, 1); // Set color to red
            rubbish_life_bar.drawRect(0, -10, rubbish.width * (rubbish.life / rubbish.max_life), 8);
            rubbish_life_bar.endFill();
        }
        app.ticker.add(move);
    }, 1000);



    // 載入 json
    const shootaudio = new Audio('../assets/audio/Shooting_sound_effect.mp3');
    const bulletTexture = await PIXI.Texture.from('../assets/images/bullet/bullet01.png');
    // 創建子彈
    let bulletGenerator = setInterval(() => {
        // if shoot_icon get pressed
        if (!planeCanShoot) return;

        const bullet = PIXI.Sprite.from(bulletTexture);
        gameLayer.addChild(bullet);
        if (sound) {
            shootaudio.play();
        }

        // 設定子彈的起始位置
        bullet.eventMode = 'dynamic';
        bullet.x = plane.x + plane.width / 2 - bullet.width / 2;
        bullet.y = plane.y - bullet.height;

        // 設定子彈的移動
        const move = (delta) => {
            // 子彈超出畫面時，移除子彈
            if (bullet.y < 0) {
                app.ticker.remove(move);
                gameLayer.removeChild(bullet);
            }
            bullet.y -= 5 * delta;

            // 檢查子彈是否打到垃圾
            for (let i = 0; i < rubbishGroup.children.length; i++) {
                const rubbish = rubbishGroup.children[i];
                if (bullet.x + bullet.width >= rubbish.x && bullet.x <= rubbish.x + rubbish.width && bullet.y <= rubbish.y + rubbish.height && bullet.y + bullet.height >= rubbish.y) {
                    app.ticker.remove(move);
                    gameLayer.removeChild(bullet);

                    if (rubbish.life > 0) {
                        rubbish.life -= 10;
                        continue;
                    }

                    if (rubbish.life <= 0) {
                        app.ticker.remove(move);
                        rubbishGroup.removeChild(rubbish);
                        scoreValue++;
                    }

                }
            }
        }
        app.ticker.add(move);
    }, 200);



})();

