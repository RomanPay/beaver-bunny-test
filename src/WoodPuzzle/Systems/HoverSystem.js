import { Texture } from "pixi.js";
import InteractiveComponent from "../Components/InteractiveComponent";
import SpriteComponent from "../Components/SpriteComponent";

export default class HoverSystem
{
    constructor(puzzle, scene)
    {
        this.puzzle = puzzle;
        this.scene = scene;
        this.scene.interactive = true;
        this.scene.on('pointermove', event => this.onPointerMove(event));
        this.scene.on('pointerout', event => this.onPointerOut(event));
    }
  
    onPointerMove(event)
    {
        const point = event.data.global;
        this.puzzle.entities.forEach(entity => {
            if (entity && entity.getComponent(InteractiveComponent))
            {
                const bounds = entity.getComponent(SpriteComponent).sprite.getBounds();
                const interactive = entity.getComponent(InteractiveComponent);
                if (bounds.rectangle.contains(point.x, point.y))
                {
                    if (!interactive.isHovered)
                    {
                        interactive.isHovered = true;
                        entity.getComponent(SpriteComponent).sprite.tint = 0x646464;
                    }
                }
                else
                {
                    if (interactive.isHovered)
                    {
                        interactive.isHovered = false;
                        entity.getComponent(SpriteComponent).sprite.tint = 0xFFFFFF;
                    }
                }
            }
        });
    }

    onPointerOut(event)
    {
        const point = event.data.global;
        this.puzzle.entities.forEach(entity => {
            if (entity && entity.getComponent(InteractiveComponent))
            {
                const interactive = entity.getComponent(InteractiveComponent);
                if (interactive.isHovered)
                {
                    interactive.isHovered = false;
                    entity.getComponent(SpriteComponent).sprite.tint = 0xFFFFFF;
                }
            }
        });
    }

    update()
    {

    }
}
  