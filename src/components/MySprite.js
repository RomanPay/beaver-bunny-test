import { Sprite, Texture } from "pixi.js";

export class MySprite extends Sprite
{
    constructor(parent, key, x = 0, y = 0)
    {
        super(new Texture.from(key));

        parent.addChild(this);

        this.position.set(x, y);
        this.anchor.set(0.5, 0.5);
    }
}