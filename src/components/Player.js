import { Container, Graphics, Rectangle,Text } from "pixi.js";
import { MySprite } from "./MySprite";
import { ScreenSize } from "../Scene";

export const PlayerState = {
    Idle: "Idle",
    OnGround: "OnGround",
    OnAir: "OnAir",
    Jump: "Jump",
    Crush: "Crush",
    OnBooster: "OnBooster"
};

const GRAVITY_DEFAULT = 9;
const JUMP_WEIGHT = -22.5;
const BOOSTER_GRAVITY = -30;
const WEIGHT_INCREMENT = 5;
const PLAYER_CRUISE_SPEED = 30;

export class Player extends Container
{
    constructor(parent)
    {
        super();
        parent.addChild(this);
        this.position.set(ScreenSize.Width * 0.5, ScreenSize.Height * 0.5);

        this.img = new MySprite(this, "mi_bunny_idle_03");
        this.img.scale.set(0.7, 0.7);

        this.bounds = new Rectangle(-this.img.width * 0.4, -this.img.width * 0.4, this.img.width * 0.8, this.img.height * 0.8);
        this.lowBorder = ScreenSize.Height - 330;

        this.gravity = GRAVITY_DEFAULT;
        this.originalWeight = 2;
        this.weight = 0;

        this.currentState = PlayerState.OnAir;
        this.isUpdate = true;

        this.distance = 0;
        this.distanceText = new Text({ text: this.distance.toFixed(0) + 'm', style: { fontFamily: "ZubiloBlack", fontSize: 40, fill: 0x000000, align: "center" } });
        this.distanceText.anchor.set(0.5, 0.5);
        this.distanceText.y = this.img.height * 0.5;
        this.addChild(this.distanceText);
    }

    onStart()
    {
        this.position.y = this.lowBorder;
        this.isUpdate = false;
        this.distance = 0;
        this.distanceText.text = this.distance.toFixed(0) + "m";
        this.setState(PlayerState.OnAir);
    }

    setState(state)
    {
        this.currentState = state;

        switch (this.currentState)
        {
            case PlayerState.Jump:
                this.setJumpState();
                break;
            case PlayerState.Crush:
                this.setCrushState();
                break;
            case PlayerState.OnGround:
                this.setOnGroundState();
                break;
            case PlayerState.OnBooster:
                this.setBoosterState();
                break;
            case PlayerState.OnAir:
                this.setOnAirState();
                break;
            default:
                console.warn("state not defined for player.setState()", this.currentState);
                break;
        }
    }

    setJumpState()
    {
        this.weight = JUMP_WEIGHT;
        this.gravity = 0;
    }

    setCrushState()
    {
        this.position.y = this.lowBorder;
        this.isUpdate = false;
    }

    setOnGroundState()
    {
        if (this.position.y > this.lowBorder)
        {
            this.position.y = this.lowBorder;
        }
    }

    setBoosterState()
    {
        this.gravity = BOOSTER_GRAVITY;
    }

    setOnAirState()
    {
        this.gravity = GRAVITY_DEFAULT;
        this.weight = 0;
    }

    update(deltaTime)
    {
        if (!this.isUpdate) return;

        switch (this.currentState)
        {
            case PlayerState.Jump:
                this.updateJumpState(deltaTime);
                break;
            case PlayerState.OnAir:
                this.updateOnAirState(deltaTime);
                break;
            case PlayerState.OnBooster:
                this.updateBoosterState(deltaTime);
                break;
            case PlayerState.OnGround:
                break;
            case PlayerState.Crush:
                break;
            default:
                console.warn("state not defined for player.update()", this.currentState);
                break;
        }

        this.updateDistance(deltaTime);
    }

    updateDistance(deltaTime)
    {
        if (this.isUpdate)
        {
            this.distance += deltaTime / PLAYER_CRUISE_SPEED;
            this.distanceText.text = this.distance.toFixed(0) + 'm';   
        }

    }
    
    updateJumpState(deltaTime)
    {
        if (this.weight < 0)
        {
            this.weight += deltaTime * WEIGHT_INCREMENT;
        }
        this.gravity += this.weight * deltaTime;
        this.position.y += this.gravity * deltaTime;

        if (this.position.y > this.lowBorder)
        {
            this.setState(PlayerState.OnGround);
        }
    }

    updateOnAirState(deltaTime)
    {
        this.position.y += this.gravity * deltaTime;

        if (this.position.y > this.lowBorder)
        {
            this.setState(PlayerState.OnGround);
        }
    }

    updateBoosterState(deltaTime)
    {
        this.gravity += deltaTime;
        this.position.y += this.gravity * deltaTime;

        if (this.gravity >= 0)
        {
            this.setState(PlayerState.OnAir);
        }
    }

    getBounds()
    {
        return new Rectangle(this.x + this.bounds.x, this.y + this.bounds.y, this.bounds.width, this.bounds.height);
    }

    jump()
    {
        if (this.currentState !== PlayerState.OnGround) return;
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