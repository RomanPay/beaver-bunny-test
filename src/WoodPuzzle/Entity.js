import { nanoid } from "nanoid";

export default class Entity
{
    constructor()
    {
        this.id = nanoid();
        this.components = {};
    }
  
    addComponent(component)
    {
        this.components[component.constructor.name] = component;
    }
  
    getComponent(componentClass)
    {
        return this.components[componentClass.name];
    }
}
  