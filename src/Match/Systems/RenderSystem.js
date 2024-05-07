import PositionComponent from "../Components/PositionComponent";
import SpriteComponent from "../Components/SpriteComponent";

export default class RenderSystem
{
    constructor(app)
    {
        this.app = app; // Экземпляр PIXI.Application
    }
  
    update(entity)
    {
        let position = entity.getComponent(PositionComponent);
        let sprite = entity.getComponent(SpriteComponent).sprite;
        sprite.x = position.x;
        sprite.y = position.y;
        this.app.stage.addChild(sprite); // Добавляем спрайт на сцену, если он ещё не добавлен
    }
}