import { Assets, Sprite } from "pixi.js";
import Scene from "./Scene";
import { ImageKeys } from "./imagesKeys.js";
import { Scenes } from "./App.js";
import { GameScene } from "./GameScene.js";

export const ImagesBundle = { };

export class PreloadScene extends Scene
{
    constructor(app)
    {
        super("PreloadScene", app);

        this.init();
        this.resize();
    }

    async init()
    {
        Assets.addBundle("images", ImageKeys);
        ImagesBundle.OrdinaryImages = await Assets.loadBundle("images");
        Scenes.push(new GameScene(this.app));
    }
}