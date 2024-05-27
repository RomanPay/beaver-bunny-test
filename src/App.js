import { Application } from "pixi.js";
import { GameScene } from "./GameScene.js";
import { PreloadScene } from "./PreloadScene.js";

export const Scenes = [];

class Game
{
    constructor()
    {
        this.app = new Application();
        this.app.init({ backgroundColor: 0x000000, width: 2100, height: 1030 }).then(() => {
            document.querySelector("#app").appendChild(this.app.canvas);
            Scenes.push(new PreloadScene(this.app));
            this.start();
        });

        window.addEventListener("resize", () => { this.resize(); });
        setTimeout(() => this.resize(), 100);
    }

    start()
    {
        this.app.ticker.add(delta => {
            Scenes.forEach(scene => scene.update(delta.deltaTime));
        });
    }

    resize()
    {
        Scenes.forEach(scene => {
            scene.resize();
        });
        this.app.renderer.resize(window.innerWidth, window.innerHeight);
    }
}

// const app = new Application();
// await app.init({ backgroundColor: 0x1099bb, resizeTo: window });
// document.body.appendChild(app.canvas);

// const container = new Container();
// app.stage.addChild(container);

// container.x = app.screen.width * 0.5;
// container.y = app.screen.height * 0.5;

// const rectangle = new Graphics();
// rectangle.rect(-50, -50, 100, 100);
// rectangle.fill(0xFF00FF);

// container.addChild(rectangle);

// window.addEventListener("resize", () => {
//     console.log("doc props", document.documentElement.clientWidth, document.documentElement.clientHeight);
//     console.log("app props", app.screen.width, app.screen.height);
//     app.renderer.resize(document.documentElement.clientWidth, document.documentElement.clientHeight);

//     // container.x = app.screen.width * 0.5;
//     // container.y = app.screen.height * 0.5;
// });

export const MyGame = new Game();