import { Graphics } from "pixi.js";
import Scene from "./Scene.js"
import { Match } from "./Match/Match.js";

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
        // this.match = new Match();
    }

    update(deltaTime)
    {
        // this.match.update(deltaTime);
    }
}