import { Container, Graphics, Rectangle, Texture } from "pixi.js";
import { MySprite } from "./MySprite";
import { ScreenSize } from "../Scene";

export class Obstacle extends Container
{
    constructor(parent)
    {
        super();
        parent.addChild(this);

        this.position.set(-200, ScreenSize.Height - 278);

        this.img = new MySprite(this, "stopper_idle");
        this.idleKey = "stopper_idle";
        this.crushKey = "stopper_crush";
        this.active = false;

        this.bounds = new Rectangle(-this.img.width * 0.35, -this.img.height * 0.5, this.img.width * 0.7, this.img.height);
    }

    setOnStart(startX)
    {
        this.x = startX;
        this.active = true;
    }

    getBounds()
    {
        return new Rectangle(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height);
    }

    crush()
    {
        this.img.texture = new Texture.from(this.crushKey);
    }
}