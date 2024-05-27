export default class InteractiveComponent
{
    constructor(normalTextureKey, hoverTextureKey)
    {
        this.isHovered = false;
        this.normalTextureKey = normalTextureKey;
        this.hoverTextureKey = hoverTextureKey;
    }
}