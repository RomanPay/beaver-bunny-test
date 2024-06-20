import { Container, Graphics, Rectangle } from "pixi.js";
import { MySprite } from "./MySprite";
import { ScreenSize } from "../Scene";
import { gsap } from "gsap";

export const PlayerState = {
    Idle: "Idle",
    OnGround: "OnGround",
    OnAir: "OnAir",
    Jump: "Jump",
    Crush: "Crush",
    OnBooster: "OnBooster"
}

export class Player extends Container
{
    constructor(parent)
    {
        super();
        parent.addChild(this);
        this.position.set(ScreenSize.Width * 0.5, ScreenSize.Height * 0.5);

        this.img = new MySprite(this, "mi_bunny_idle_03");
        this.img.scale.set(0.7, 0.7);

        this.bounds = new Rectangle(-this.img.width * 0.4, - this.img.width * 0.4, this.img.width * 0.8, this.img.height * 0.8);
        this.lowBorder = ScreenSize.Height - 330;

        this.gravity = 9;
        this.originalWeight = 2;
        this.force = 0;

        this.currentState = PlayerState.OnAir;
        this.isUpdate = true;
    }

    onStart()
    {
        this.position.y = this.lowBorder;
        this.isUpdate = false;
        this.setState(PlayerState.OnAir);
    }

    setState(state)
    {
        if (this.state === PlayerState.Crush) return ;

        console.log("set state", state);
        this.currentState = state;
        
        switch (this.currentState)
        {
            case PlayerState.Jump :
                this.weight = -15.5;
                this.gravity = 0;
                break;
            case PlayerState.Crush :
                this.position.y = this.lowBorder;
                this.isUpdate = false;
                break;
            case PlayerState.OnGround :
                if (this.position.y > this.lowBorder)
                    this.position.y = this.lowBorder;
                break;
            case PlayerState.OnBooster :
                // this.weight = -10;
                this.gravity = -30;
                break;
            case PlayerState.OnAir :
                this.gravity = 9;
                this.weight = 0;
                break;
            default :
                console.warn("state not defined for player.setState()", this.currentState);
                break;
        }
    }

    update(deltaTime)
    {
        if (!this.isUpdate) return ;

        // console.log("on update", this.currentState);
        switch (this.currentState)
        {
            case PlayerState.Jump :
                if (this.weight < 0)
                    this.weight += deltaTime * 5;

                this.gravity += this.weight * deltaTime;
                this.position.y += this.gravity * deltaTime;

                if (this.position.y > this.lowBorder)
                    this.setState(PlayerState.OnGround);
                break;

            case PlayerState.OnAir :
                this.position.y += this.gravity * deltaTime;

                if (this.position.y > this.lowBorder)
                    this.setState(PlayerState.OnGround);
                break;

            case PlayerState.OnBooster :
                // if (this.weight < this.originalWeight)
                //     this.weight += deltaTime;

                // console.log(this.weight);
                this.gravity += deltaTime;
                this.position.y += this.gravity * deltaTime;

                if (this.gravity >= 0)
                    this.setState(PlayerState.OnAir);
                break;

            case PlayerState.OnGround :
                break;
            default :
                console.warn("state not defined for player.update()", this.currentState);
                break;
        }
    }
    
    getBounds()
    {
        return new Rectangle(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height);
    }

    jump()
    {
        if (this.currentState !== PlayerState.OnGround)
            return;

        this.setState(PlayerState.Jump);
    }

    crush()
    {
        this.setState(PlayerState.Crush);
    }

    onBooster()
    {
        this.setState(PlayerState.OnBooster);
    }
}