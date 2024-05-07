export default class Entity
{
    constructor(id)
    {
        this.id = id;
        this.components = {};
    }
  
    addComponent(component)
    {
        this.components[component.constructor.name] = component;

        console.log(this.components);
    }
  
    getComponent(componentClass)
    {
        return this.components[componentClass.name];
    }
}
  