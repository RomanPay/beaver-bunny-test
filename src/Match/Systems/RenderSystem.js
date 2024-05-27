import PositionComponent from "../Components/PositionComponent";
import SpriteComponent from "../Components/SpriteComponent";

export default class RenderSystem
{
    constructor() { }
  
    update(entity)
    {
        let position = entity.getComponent(PositionComponent);
        let sprite = entity.getComponent(SpriteComponent).sprite;
        sprite.x = position.x;
        sprite.y = position.y;
    }
}