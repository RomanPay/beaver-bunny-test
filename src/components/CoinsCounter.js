import { Container, Text } from "pixi.js";
import { MySprite } from "./MySprite";

export class CoinsCounter extends Container
{
    constructor(parent)
    {
        super();
        parent.addChild(this);

        this.base = new MySprite(this, "coin_score_plate");
        this.coin = new MySprite(this, "collect_coin_icon", -100);

        this.numCoins = 0;
        this.numCoinsText = new Text({
            text: this.numCoins.toFixed(0), 
            style: {
                fontFamily: "ZubiloBlack",
                fontSize: 60,
                fill: 0xFFFFFF,
                align: "center"
            }
        });
        this.numCoinsText.anchor.set(0.5, 0.5);
        this.numCoinsText.x = 15;
        this.addChild(this.numCoinsText);
    }

    addCoins(num)
    {
        this.numCoins += num;
        this.numCoinsText.text = this.numCoins.toFixed(0);
    }
}