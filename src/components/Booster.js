import { Container, Graphics, Rectangle } from "pixi.js";
import { MySprite } from "./MySprite";

export class Coin extends MySprite
{
    constructor(parent, x, y)
    {
        super(parent, "coin", x, y); 
        this.parent = parent;

        this.scale.set(0.8, 0.8);

        this.boundsRect = new Rectangle(-this.width * 0.5, -this.height * 0.5, this.width, this.height);
        
        // const g = new Graphics();
        // g.rect(-this.width * 0.5, -this.height * 0.5, this.width, this.height);
        // g.fill(0xFF00FF, 0.3);
        // parent.addChild(g);
        // g.position.set(x, y);
    }
    
    getBounds()
    {
        return new Rectangle(this.parent.x + this.boundsRect.x, this.parent.y + this.boundsRect.y, this.boundsRect.width, this.boundsRect.height);
    }
}

export const BoosterType = {
    Balloon: "Balloon",
    Ramp: "Ramp"
}

export class Booster extends Container
{
    constructor(parent, config)
    {
        super();
        parent.addChild(this);

        this.config = config;
        this.active = false;

        this.initBoosterObject();
        this.initCoins();
    }

    initBoosterObject()
    {
        if (this.config.type === BoosterType.Balloon)
        {
            this.boosterObject = new MySprite(this, "balloon_red", -150, 150);
            this.boundsRect = new Rectangle(-this.boosterObject.width * 0.5, -this.boosterObject.height * 0.5, this.boosterObject.width, this.boosterObject.height * 0.5);
        }

        // const g = new Graphics();
        // g.rect(-this.boosterObject.width * 0.5, -this.boosterObject.height * 0.5, this.boosterObject.width, this.boosterObject.height * 0.5);
        // g.fill(0xFF00FF, 0.3);
        // this.addChild(g);
        // g.position.set(-150, 150);
    }

    initCoins()
    {
        this.coins = [];

        if (this.config.type === BoosterType.Balloon)
        {
            for (let i = 0; i < 4; i++)
            {
                const coin = new Coin(this, i * 80, i * -70);
                this.coins.push(coin);
            }   
        }
    }

    getBounds()
    {
        return new Rectangle(this.x + this.boundsRect.x, this.y + this.boundsRect.y, this.boundsRect.width, this.boundsRect.height);
    }
}