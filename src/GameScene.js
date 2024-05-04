import { Graphics } from "pixi.js";
import Scene from "./Scene.js"

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
        
    }
}