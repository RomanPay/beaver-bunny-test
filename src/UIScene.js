import Scene, { ScreenSize } from "./Scene";
import { Button } from "./components/Button";
import { CoinsCounter } from "./components/CoinsCounter";
import eventEmitter, { EventsList } from "./components/EventEmmiter";

export class UIScene extends Scene
{
    constructor(app)
    {
        super("UIScene", app);

        this.init();
        this.resize();
    }

    init()
    {
        this.coinsCounter = new CoinsCounter(this);
        this.coinsCounter.position.set(200, 70);

        this.fullscreenButton = new Button(this, "btn_fullscreen", () => { }, 1000, 70);
        this.soundButton = new Button(this, "btn_sound_1", () => { }, 1150, 70);
        this.pauseButton = new Button(this, "btn_pause", () => { this.pauseButtonProcessing(); }, 1300, 70);
    }

    pauseButtonProcessing()
    {
        console.log("press pause");

        eventEmitter.emit(EventsList.Pause);
    }

    resize()
    {
        const width = window.innerWidth;
        const height = window.innerHeight;

        // console.log(`width ${ width }, height ${ height }`);

        const scale = width / ScreenSize.Width;
        this.scale.set(scale);

        const x = width * 0.5 - (ScreenSize.Width * 0.5) * scale;
        const y = 0;
        this.position.set(x, y);
    }
}