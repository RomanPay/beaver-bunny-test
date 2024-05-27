import { Sprite, Texture } from "pixi.js";

export default class SpriteComponent
{
    constructor(texture, scene)
    {
        this.sprite = new Sprite(Texture.from(texture));
        scene.addChild(this.sprite);
    }
}