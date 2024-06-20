import { Container, Text } from "pixi.js";
import { MySprite } from "./MySprite";
import { gsap } from "gsap";

export class LeaderboardPlate extends Container
{
    constructor(parent, plateNameKey, plateScoreKey, x1, y1, x2, y2, textConfig)
    {
        super();
        parent.addChild(this);

        this.plateNameKey = new MySprite(this, plateNameKey, x1, y1);
        this.plateScoreKey = new MySprite(this, plateScoreKey, x2, y2);

        this.nameText = new Text({ text: "Player name", style: textConfig });
        this.nameText.position.set(x1 - 190, y1 - 3);
        this.nameText.anchor.set(0, 0.5);
        this.addChild(this.nameText);

        this.scoreText = new Text({ text: "00000", style: textConfig });
        this.scoreText.position.set(x2, y2 - 2);
        this.scoreText.anchor.set(0.5, 0.5);
        this.addChild(this.scoreText);
    }

    show(delay)
    {
        if (this.tween)
            this.tween.kill();

        this.tween = gsap.fromTo(this, { alpha: 0 }, { alpha: 1, duration: 0.1, delay: delay,
            onComplete: () => this.tween = undefined
         });
    }
}