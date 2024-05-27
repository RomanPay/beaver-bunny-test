import { Graphics, Sprite, Texture } from "pixi.js";
import Scene from "./Scene.js"
import { Match } from "./Match/Match.js";
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
        // const sprite = new Sprite(ImagesBundle.OrdinaryImages.CratesAndSacks);
        // this.addChild(sprite);
        // sprite.position.set(0, 0);

        // this.match = new Match(this);
        // this.updateMatch = true;

        this.woodPuzzle = new WoodPuzzle(this);
        this.updateWoodPuzzle = true;
    }

    update(deltaTime)
    {
        if (this.updateMatch)
            this.match.update(deltaTime);
        
        if (this.updateWoodPuzzle)
            this.woodPuzzle.update(deltaTime);
    }
}