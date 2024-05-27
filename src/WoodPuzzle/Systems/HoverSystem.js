import { Texture } from "pixi.js";
import InteractiveComponent from "../Components/InteractiveComponent";
import SpriteComponent from "../Components/SpriteComponent";

export default class HoverSystem
{
    constructor(scene)
    {
        this.scene = scene;
        this.scene.interactive = true;
        this.scene.on('pointermove', event => this.onPointerMove(event));
        this.scene.on('pointerout', event => this.onPointerOut(event));
    }
  
    onPointerMove(event)
    {
        const point = event.data.global;
        this.scene.children.forEach(children => {
            if (children.entity && children.entity.getComponent(InteractiveComponent))
            {
                const bounds = children.getBounds();
                const interactive = children.entity.getComponent(InteractiveComponent);
                if (bounds.rectangle.contains(point.x, point.y))
                {
                    if (!interactive.isHovered)
                    {
                        interactive.isHovered = true;
                        children.entity.getComponent(SpriteComponent).sprite.tint = 0x646464;
                        // children.texture = Texture.from(interactive.hoverTextureKey);
                    }
                }
                else
                {
                    if (interactive.isHovered)
                    {
                        interactive.isHovered = false;
                        children.entity.getComponent(SpriteComponent).sprite.tint = 0xFFFFFF;
                        // children.texture = Texture.from(interactive.normalTextureKey);
                    }
                }
            }
        });
    }

    onPointerOut(event)
    {
        const point = event.data.global;
        this.scene.children.forEach(children => {
            if (children.entity && children.entity.getComponent(InteractiveComponent))
            {
                const interactive = children.entity.getComponent(InteractiveComponent);
                if (interactive.isHovered)
                {
                    interactive.isHovered = false;
                    children.entity.getComponent(SpriteComponent).sprite.tint = 0xFFFFFF;
                }
            }
        });
    }

    update()
    {

    }
}
  