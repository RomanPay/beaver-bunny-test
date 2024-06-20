import { Container, Graphics } from "pixi.js";

export const ScreenSize = {
    Width: 1400,
    Height: 1400,
}

export default class Scene extends Container
{
    constructor(label, app)
    {
        super();
        app.stage.addChild(this);

        this.label = label;
        this.app = app;

        this.app.ticker.add(delta => {
            this.update(delta.deltaTime);
        });

        // this.init();
        // this.resize();
    }

    init()
    {
        console.log(`init ${ this.label }`);
    }

    resize()
    {
        // const width = document.documentElement.clientWidth;
        // const height = document.documentElement.clientHeight;

        const width = window.innerWidth;
        const height = window.innerHeight;


        // console.log(`width ${ width }, height ${ height }`);

        const scale = width > height ?
                    Math.min(height / ScreenSize.Height, width / ScreenSize.Width) :
                    Math.min(height / ScreenSize.Width, width / ScreenSize.Height);
        this.scale.set(scale);

        const x = width * 0.5 - (ScreenSize.Width * 0.5) * scale;
        const y = height * 0.5 - (ScreenSize.Height * 0.5) * scale;

        // const x = 0;
        // const y = 0;      

        this.position.set(x, y);

        console.log("resize", this.label);
    }

    drawBounds(color)
    {
        const g = new Graphics();
        g.rect(0, 0, ScreenSize.Width, ScreenSize.height);
        g.stroke({ width: 10, color: color });
        this.addChild(g);
    }

    drawBorderLines()
    {
        const g = new Graphics();
        g.moveTo()
    }

    update(deltaTime)
    {
        
    }
}