import { Application, Container, Graphics } from "pixi.js";
import "./styles.css";

const canvas = document.createElement("canvas");
const view = canvas.transferControlToOffscreen();

const app = new Application();
await app.init({ view, backgroundColor: 0x1099bb, resizeTo: window });
document.body.appendChild(canvas);

const container = new Container();
app.stage.addChild(container);

container.x = app.screen.width * 0.5;
container.y = app.screen.height * 0.5;

const rectangle = new Graphics();
rectangle.rect(-50, -50, 100, 100);
rectangle.fill(0xFF00FF);

container.addChild(rectangle);

window.addEventListener("resize", () => {
    container.x = app.screen.width * 0.5;
    container.y = app.screen.height * 0.5;
});