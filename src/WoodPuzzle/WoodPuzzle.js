import { Graphics } from "pixi.js";
import InteractiveComponent from "./Components/InteractiveComponent";
import PositionComponent from "./Components/PositionComponent";
import SpriteComponent from "./Components/SpriteComponent";
import Entity from "./Entity";
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
        this.initField();
        this.initHUD();
    }

    initHUD()
    {
        const scaleHUDTiles = 2;
        const ofssetHUDX = 270;
        const ofssetHUDY = 600;

        for (let i = 0; i < 3; i++)
        {
            const hudTile = new Entity();
            const spriteComponent = new SpriteComponent("Wood_64x64", this.scene);
            spriteComponent.sprite.scale.set(scaleHUDTiles);
            hudTile.addComponent(spriteComponent);
            spriteComponent.sprite.entity = hudTile;
            
            hudTile.addComponent(new PositionComponent(ofssetHUDX + i * scaleHUDTiles * 64, ofssetHUDY));
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
        const tileSize = 64;

        for (let i = 0; i < 81; i++)
        {
            const cell = new Entity();
            const spriteComponent = new SpriteComponent("Wood_64x64", this.scene);
            cell.addComponent(spriteComponent);
            spriteComponent.sprite.entity = cell;

            cell.addComponent(new PositionComponent(170 + (i % 9) * (tileSize), (Math.floor(i / 9)) * (tileSize)));
            cell.addComponent(new InteractiveComponent("Wood_64x64", "Wheat"))
        }

        const g = new Graphics()
        this.scene.addChild(g);
        
        g.rect(170, 0, 9 * (tileSize), 9 * (tileSize));
        g.stroke({ width: 5, color: 0xFFFFFF });

        let lineWidth = 2;
        let alpha = 0.7;
        for (let i = 1; i < 9; i++)
        {
            lineWidth = i % 3 === 0 ? 5 : 2;
            alpha = i % 3 === 0 ? 0.7 : 0.5;

            g.moveTo(170 + i * (tileSize), 0, 0);
            g.lineTo(170 + i * (tileSize), 9 * (tileSize));
            g.stroke({ width: lineWidth, color: 0xFFFFFF, alpha: alpha });        
            
            g.moveTo(170, i * (tileSize));
            g.lineTo(170 + 9 * (tileSize), i * (tileSize));
            g.stroke({ width: lineWidth, color: 0xFFFFFF, alpha: alpha });
        }
    }

    initSystems()
    {
        this.systems = [
            new RenderSystem(this.scene),
            new HoverSystem(this.scene)
        ];
    }

    update(deltaTime)
    {
       this.systems.forEach(system => system.update());
    }
}