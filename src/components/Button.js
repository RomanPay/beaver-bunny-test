import { Texture } from "pixi.js";
import { MySprite } from "./MySprite";

export class Button extends MySprite
{
    constructor(parent, key, callback, x = 0, y = 0)
    {
        super(parent, key + "_active", x, y);
        this.activeKey = key + "_active";
        this.hoverKey = key + "_hover";
        this.pressKey = key + "_press";
        this.callback = callback;

        this.initEvents();
        this.setInteractive(true);
    }

    setInteractive(interactive)
    {
        this.interactive = interactive;
    }

    initEvents()
    {
        this.on("pointerdown", e => this.onPointerDown(e));
        this.on("pointerup", e => this.onPointerUp(e));
        this.on("pointerover", e => this.onPointerOver(e));
        this.on("pointerout", e => this.onPointerOut(e));
    }

    onPointerDown(e)
    {
        this.pointerDown = true;
        this.texture = new Texture.from(this.pressKey);
    }

    onPointerUp(e)
    {
        if (!this.pointerDown)
            return ;
        this.pointerDown = false;
        this.texture = new Texture.from(this.activeKey);
        this.callback();
    }

    onPointerOver(e)
    {
        this.pointerOver = true;
        this.texture = new Texture.from(this.hoverKey);
    }

    onPointerOut(e)
    {
        this.pointerOver = false;
        this.pointerDown = false;
        this.texture = new Texture.from(this.activeKey);
    }
}