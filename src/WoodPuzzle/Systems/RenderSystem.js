import PositionComponent from "../Components/PositionComponent";
import SpriteComponent from "../Components/SpriteComponent";

export default class RenderSystem
{
    constructor(scene)
    {
        this.scene = scene; 
    }
  
    update(deltaTime)
    {
        this.scene.children.forEach(children => {
            if (children.entity && children.entity.getComponent(SpriteComponent))
            {
                let position = children.entity.getComponent(PositionComponent);
                let sprite = children.entity.getComponent(SpriteComponent).sprite;
                sprite.x = position.x;
                sprite.y = position.y;
            }
        });
    }
}