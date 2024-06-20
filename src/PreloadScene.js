import { Assets, Sprite } from "pixi.js";
import Scene from "./Scene";
import { ImageKeys } from "./imagesKeys.js";
import { Scenes } from "./App.js";
import { GameScene } from "./GameScene.js";
import { UIScene } from "./UIScene.js";
import { MainMenuScene } from "./MainMenuScene.js";

export const ImagesBundle = { };

export class PreloadScene extends Scene
{
    constructor(app)
    {
        super("PreloadScene", app);
        
        this.init();
    }

    async init()
    {
        Assets.addBundle("images", ImageKeys);
        ImagesBundle.OrdinaryImages = await Assets.loadBundle("images");
        await Assets.load("./assets/fonts/ZubiloBlack.woff")

        Scenes.push(
            new GameScene(this.app),
            new MainMenuScene(this.app),
            new UIScene(this.app),
        );
    }
}