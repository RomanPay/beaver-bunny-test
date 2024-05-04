import { Container } from "pixi.js";

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

        const scale = width > height ? Math.min(height / 1030, width / 1030) : Math.min(width / 1030, height / 1030);
        this.scale.set(scale);

        this.position.set(width * 0.5 - 515 * scale, height * 0.5 - 515 * scale);

        // console.log(this.app.screen.width * scale, this.app.screen.height * scale);
    }
}