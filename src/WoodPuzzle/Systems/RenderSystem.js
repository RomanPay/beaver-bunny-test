import PositionComponent from "../Components/PositionComponent";
import SpriteComponent from "../Components/SpriteComponent";

export default class RenderSystem
{
    constructor(puzzle)
    {
        this.puzzle = puzzle; 
    }
  
    update(deltaTime)
    {
        this.puzzle.entities.forEach(entity => {
            if (entity && entity.getComponent(SpriteComponent))
            {
                let position = entity.getComponent(PositionComponent);
                let sprite = entity.getComponent(SpriteComponent).sprite;
                sprite.x = position.x;
                sprite.y = position.y;
            }
        });
    }
}