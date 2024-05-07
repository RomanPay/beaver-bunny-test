import PositionComponent from "../Components/PositionComponent";
import VelocityComponent from "../Components/VelocityComponent";

export default class MovementSystem
{
    update(entity, delta)
    {
        if (entity.getComponent(PositionComponent) && entity.getComponent(VelocityComponent))
        {
            let position = entity.getComponent(PositionComponent);
            let velocity = entity.getComponent(VelocityComponent);
            position.x += velocity.dx / delta;
            position.y += velocity.dy / delta;
        }
    }
}
  