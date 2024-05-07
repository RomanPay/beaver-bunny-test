import { Container } from "pixi.js";

export const ScreenSize = {
    width: 1030,
    height: 1030,
}

export default class Scene extends Container
{
    constructor(name, app)
    {
        super();
        this.name = name;
        this.app = app;
        app.stage.addChild(this);
    }

    init()
    {
        console.log(`init ${ this.name }`);
    }

    resize()
    {
        const width = document.documentElement.clientWidth;
        const height = document.documentElement.clientHeight;

        const scale = width > height ?
                    Math.min(height / ScreenSize.height, width / ScreenSize.width) :
                    Math.min(width / ScreenSize.width, height / ScreenSize.height);
        this.scale.set(scale);

        this.position.set(width * 0.5 - ScreenSize.width * scale, height * 0.5 - ScreenSize.height * scale);
    }

    update(deltaTime)
    {

    }
}