import Entity from "./Entity";
import PositionComponent from "./Components/PositionComponent";
import VelocityComponent from "./Components/VelocityComponent";
import SpriteComponent from "./Components/SpriteComponent";
import MovementSystem from "./Systems/MovementSystem";
import RenderSystem from "./Systems/RenderSystem";

export class Match 
{
    constructor(scene)
    {    
        this.scene = scene;

        let entity = new Entity(1);
        entity.addComponent(new PositionComponent(0, 0));
        entity.addComponent(new VelocityComponent(0.1, 0.1));
        entity.addComponent(new SpriteComponent("Wheat", this.scene));
        this.entity = entity;

        this.initSystems();
    }

    initSystems()
    {
        this.movementSystem = new MovementSystem();
        this.renderSystem = new RenderSystem();
    }

    update(deltaTime)
    {
        this.movementSystem.update(this.entity, deltaTime);
        this.renderSystem.update(this.entity);
    }
}