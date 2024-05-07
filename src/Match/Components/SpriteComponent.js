import { Sprite, Texture } from "pixi.js";

export default class SpriteComponent
{
    constructor(texture)
    {
        this.sprite = new Sprite(Texture.from(texture));
    }
}