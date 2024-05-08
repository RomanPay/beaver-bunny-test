import { Graphics, Sprite, Texture } from "pixi.js";
import Scene from "./Scene.js"
import { Match } from "./Match/Match.js";
import { ImagesBundle } from "./PreloadScene.js";

export class GameScene extends Scene
{
    constructor(app)
    {
        super("GameScene", app);

        this.init();
        this.resize();
    }

    init()
    {
        const sprite = new Sprite(ImagesBundle.OrdinaryImages.CratesAndSacks);
        this.addChild(sprite);
        sprite.position.set(0, 0);
        // this.match = new Match();
    }

    update(deltaTime)
    {
        // this.match.update(deltaTime);
    }
}