import Entity from "./Entity";
import PositionComponent from "./Components/PositionComponent";
import VelocityComponent from "./Components/VelocityComponent";
import MovementSystem from "./Systems/MovementSystem";

export class Match 
{
    constructor()
    {    
        let entity = new Entity(1);
        entity.addComponent(new PositionComponent(0, 0));
        entity.addComponent(new VelocityComponent(1, 1));
        this.entity = entity;

        this.initSystems();
    }

    initSystems()
    {
        this.movementSystem = new MovementSystem();
    }

    update(deltaTime)
    {
        this.movementSystem.update(this.entity, deltaTime);
        console.log(`Entity position: (${this.entity.getComponent(PositionComponent).x}, ${this.entity.getComponent(PositionComponent).y})`);
    }
}