import { Sprite, Texture } from "pixi.js";

export default class SpriteComponent
{
    constructor(texture, parent)
    {
        this.sprite = new Sprite(Texture.from(texture));
        parent.addChild(this.sprite);
    }
}