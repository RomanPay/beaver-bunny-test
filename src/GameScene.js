import { Graphics, Sprite, Texture } from "pixi.js";
import Scene from "./Scene.js"
import { ImagesBundle } from "./PreloadScene.js";
import { WoodPuzzle } from "./WoodPuzzle/WoodPuzzle.js";

export class GameScene extends Scene
{
    constructor(app)
    {
        super("GameScene", app);

        this.init();
        this.resize();
        // this.drawBounds(0xFF00FF);
    }

    init()
    {
        this.woodPuzzle = new WoodPuzzle(this);
        this.updateWoodPuzzle = true;
    }

    update(deltaTime)
    {    
        if (this.updateWoodPuzzle)
            this.woodPuzzle.update(deltaTime);
    }

    resize()
    {
        super.resize();
        this.woodPuzzle.resize();
    }
}