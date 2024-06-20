import { ScreenSize } from "../Scene";
import { Container, Graphics } from "pixi.js";
import Entity from "./Entity";
import InteractiveComponent from "./Components/InteractiveComponent";
import PositionComponent from "./Components/PositionComponent";
import SpriteComponent from "./Components/SpriteComponent";
import HoverSystem from "./Systems/HoverSystem";
import RenderSystem from "./Systems/RenderSystem";

export class WoodPuzzle
{
    constructor(scene)
    {
        this.scene = scene;

        this.initEntities();
        this.initSystems();
    }

    initEntities()
    {
        this.entities = [];
        this.initField();
        this.initHUD();
    }

    initHUD()
    {
        const scaleHUDTiles = 4;
        // const ofssetHUDX = ScreenSize.Width * 0.5 - ((3 * 0.5) * (64 * scaleHUDTiles));
        const ofssetHUDX = 0;
        const ofssetHUDY = 0;

        for (let i = 0; i < 3; i++)
        {
            const hudTile = new Entity();
            const spriteComponent = new SpriteComponent("Wood_64x64", this.scene);
            spriteComponent.sprite.scale.set(scaleHUDTiles);
            hudTile.addComponent(spriteComponent);
            
            hudTile.addComponent(new PositionComponent(ofssetHUDX + i * scaleHUDTiles * 64, ofssetHUDY));

            this.entities.push(hudTile);
        }
        
        const g = new Graphics();
        this.scene.addChild(g);

        for (let i = 0; i < 3; i++)
        {
            g.rect(ofssetHUDX + i * 64 * scaleHUDTiles, ofssetHUDY, 64 * scaleHUDTiles, 64 * scaleHUDTiles);
            g.stroke({ width: 3, color: 0xFFFFFF});
        }
    }

    initField()
    {
        const fiieldsRows = 9;
        const fiieldsCols = 9;
        const tileSize = 64;
        const cellScale = 1.5;
        
        const fieldX = ScreenSize.Width * 0.5 - ((fiieldsCols * 0.5) * (tileSize * cellScale));
        // const fieldX = 0;
        const fieldY = ScreenSize.Height * 0;
        
        this.fieldContainer = new Container();
        this.scene.addChild(this.fieldContainer);

        for (let i = 0; i < 81; i++)
        {
            const cell = new Entity();
            const spriteComponent = new SpriteComponent("Wood_64x64", this.fieldContainer);
            spriteComponent.sprite.scale.set(cellScale);
            cell.addComponent(spriteComponent);

            cell.addComponent(new PositionComponent(fieldX + (i % 9) * (tileSize * cellScale), fieldY + (Math.floor(i / 9)) * (tileSize * cellScale)));
            cell.addComponent(new InteractiveComponent("Wood_64x64", "Wheat"))

            this.entities.push(cell);
        }

        const g = new Graphics()
        this.fieldContainer.addChild(g);
        
        g.rect(fieldX, 0, 9 * (tileSize * cellScale), 9 * (tileSize * cellScale));
        g.stroke({ width: 5, color: 0xFFFFFF });

        let lineWidth = 2;
        let alpha = 0.7;
        for (let i = 1; i < 9; i++)
        {
            lineWidth = i % 3 === 0 ? 5 : 3;
            alpha = i % 3 === 0 ? 0.7 : 0.5;

            g.moveTo(fieldX + i * (tileSize * cellScale), 0, 0);
            g.lineTo(fieldX + i * (tileSize * cellScale), 9 * (tileSize * cellScale));
            g.stroke({ width: lineWidth, color: 0xFFFFFF, alpha: alpha });        
            
            g.moveTo(fieldX, i * (tileSize * cellScale));
            g.lineTo(fieldX + 9 * (tileSize * cellScale), i * (tileSize * cellScale));
            g.stroke({ width: lineWidth, color: 0xFFFFFF, alpha: alpha });
        }
    }

    initSystems()
    {
        this.systems = [
            new RenderSystem(this),
            new HoverSystem(this, this.scene)
        ];
    }

    update(deltaTime)
    {
       this.systems.forEach(system => system.update());
    }

    resize()
    {
        // const width = document.documentElement.clientWidth;
        // const height = document.documentElement.clientHeight;

        // const scale = width > height ?
                    // Math.min(height / ScreenSize.height, width / ScreenSize.width) :
                    // Math.min(height / ScreenSize.width, width / ScreenSize.height);
        // this.fieldContainer.scale.set(scale);

        // const x = width * 0.5 - (ScreenSize.width * 0.5) * scale;
        // const y = height * 0.5 - (ScreenSize.height * 0.5) * scale;

        // this.fieldContainer.position.set(this.fieldContainer.x - x, y);
    }
}