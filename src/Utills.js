export class Random
{
    static between(min, max)
    {
        min = Math.ceil(min);
        max = Math.floor(max);

        return Math.floor(Math.random() * (max - min) + min);
    }

    static betweenFloat(min, max)
    {
        return Math.random() * (max - min) + min;
    }
}

export class Intersection
{
    static rectToRect(a, b)
    {
        return  a.x < b.x + b.width &&
                a.x + a.width > b.x &&
                a.y < b.y + b.height &&
                a.y + a.height > b.y;
    }
}