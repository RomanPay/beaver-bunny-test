import { Container, Graphics } from "pixi.js";

export const ScreenSize = {
    width: 1030,
    height: 1030,
}

export default class Scene extends Container
{
    constructor(name, app)
    {
        super();
        app.stage.addChild(this);

        this.name = name;
        this.app = app;
    }

    init()
    {
        console.log(`init ${ this.name }`);
    }

    resize()
    {
        // const width = document.documentElement.clientWidth;
        // const height = document.documentElement.clientHeight;

        const width = window.innerWidth;
        const height = window.innerHeight;


        console.log(`width ${ width }, height ${ height }`);

        const scale = width > height ?
                    Math.min(height / ScreenSize.height, width / ScreenSize.width) :
                    Math.min(height / ScreenSize.width, width / ScreenSize.height);
        this.scale.set(scale);

        const x = width * 0.5 - (ScreenSize.width * 0.5) * scale;
        const y = height * 0.5 - (ScreenSize.height * 0.5) * scale;

        this.position.set(x, y);
    }

    drawBounds(color)
    {
        const g = new Graphics();
        g.rect(0, 0, ScreenSize.width, ScreenSize.height);
        g.stroke({ width: 10, color: color });
        this.addChild(g);
    }

    update(deltaTime)
    {
        
    }
}