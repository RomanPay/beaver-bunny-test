import { Container, Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import Scene, { ScreenSize } from "./Scene.js";
import { ImagesBundle } from "./PreloadScene.js";
import { MySprite } from "./components/MySprite.js";
import { gsap } from "gsap";
import { Intersection, Random } from "./Utills.js";
import { Player, PlayerState } from "./components/Player.js";
import { Obstacle } from "./components/Obstacle.js";
import { Booster, BoosterType } from "./components/Booster.js";
import eventEmitter, { EventsList } from "./components/EventEmmiter.js";

const PLAYER_CRUISE_SPEED = 30;
const BACKGROUND_SCALE = 2.5;
const START_SLOPE_X = 580;
const START_SLOPE_Y_OFFSET = 314;
const GROUND_HEIGHT = 414;
const MOUNTAINS_HEIGHT = 770;
const TREE_PROBABILITY = 0.005;
const OBSTACLE_PROBABILITY = 0.002;

export class GameScene extends Scene
{
    constructor(app) {
        super("GameScene", app);

        this.init();
        this.resize();
    }

    init()
    {
        this.initBackground();
        this.initLevel();

        this.isPause = false;
        this.isGameReady = false;
        this.player = new Player(this.levelContainer);
        this.isUpdate = true;
        this.playerCruiseSpeed = PLAYER_CRUISE_SPEED;

        this.initEvents();
        this.startGame();
    }

    initBackground()
    {
        this.background = new MySprite(this, "bg_gradient", 0, -ScreenSize.Height * 1.2);
        this.background.anchor.set(0, 0);
        this.background.width = ScreenSize.Width * BACKGROUND_SCALE;
        this.background.height = ScreenSize.Height * BACKGROUND_SCALE;
        this.sun = new MySprite(this, "bg_sun", 300, 300);
    }

    initEvents()
    {
        this.on("pointerdown", () => this.onPointerDown());
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        eventEmitter.on(EventsList.Pause, () => this.togglePause());
        eventEmitter.on(EventsList.StartGame, () => {
            this.interactive = true;
            this.startGame();
        });
    }

    onKeyDown(e)
    {
        if (e.keyCode === 32)
            this.onPointerDown();
    }

    onPointerDown()
    {
        if (this.isGameReady)
        {
            this.player.isUpdate = true;
            this.playerSpeed = this.playerCruiseSpeed;
            this.isGameReady = false;
        }
        else
        {
            this.player.jump();
        }
    }

    startGame()
    {
        this.isGameReady = true;
        this.player.onStart();
        this.playerSpeed = 0;
        this.isUpdate = true;

        this.resetObstacles();
        this.startSlope.position.set(START_SLOPE_X, ScreenSize.Height - START_SLOPE_Y_OFFSET - 200);
    }

    resetObstacles()
    {
        this.obstacles.forEach(ch => {
            ch.x = -100;
            ch.active = false;
            ch.img.texture = new Texture.from(ch.idleKey);
        });
    }

    onCrush(obstacle)
    {
        obstacle.crush();
        this.player.crush();
        this.isUpdate = false;
        this.playerSpeed = 0;
        eventEmitter.emit(EventsList.PlayerCrush);
    }

    togglePause()
    {
        this.isPause = !this.isPause;
        this.playerSpeed = this.isPause ? 0 : this.playerCruiseSpeed;
        this.player.isUpdate = !this.isPause;
    }

    initLevel()
    {
        this.levelWidth = ScreenSize.Width * BACKGROUND_SCALE;
        this.levelContainer = new Container();
        this.addChild(this.levelContainer);

        this.initMountains();
        this.initGround();
        this.initStartSlope();

        this.initTrees();
        this.initObstacles();
    }

    initGround()
    {
        const textureGround = new Texture.from("floor");
        const ground = new TilingSprite({ texture: textureGround, width: this.levelWidth, height: GROUND_HEIGHT });
        ground.position.set(0, ScreenSize.Height - GROUND_HEIGHT * 0.5);
        this.levelContainer.addChild(ground);
        this.ground = ground;
    }

    initMountains()
    {
        const textureMountains = new Texture.from("back_rocks");
        const mountains = new TilingSprite({ texture: textureMountains, width: this.levelWidth, height: MOUNTAINS_HEIGHT });
        mountains.position.set(0, ScreenSize.Height - MOUNTAINS_HEIGHT);
        this.levelContainer.addChild(mountains);
        this.mountains = mountains;
    }

    initStartSlope()
    {
        this.startSlope = new MySprite(this.levelContainer, "jumpboard", START_SLOPE_X, ScreenSize.Height - START_SLOPE_Y_OFFSET - 200);
        this.levelContainer.angle = 5;
        this.levelContainer.x -= 50;
    }

    initTrees()
    {
        this.trees = Array.from({ length: 20 }, () => {
            const tree = new MySprite(this.levelContainer, Math.random() < 0.5 ? "tree_1" : "tree_2", this.levelWidth, ScreenSize.Height - 200);
            tree.startX = this.levelWidth;
            tree.anchor.set(0.5, 1);
            tree.active = false;
            return tree;
        });
    }

    initObstacles()
    {
        this.obstacles = Array.from({ length: 4 }, () => new Obstacle(this.levelContainer));
    }

    update(deltaTime)
    {
        if (!this.isUpdate) return;

        this.updateStartSlope(deltaTime);
        this.updateGround(deltaTime);
        this.updateMountains(deltaTime);
        this.updateObstacles(deltaTime);
        this.updateTrees(deltaTime);

        if (this.player) this.player.update(deltaTime);

        this.detectCollisions();
    }

    updateStartSlope(deltaTime)
    {
        if (this.startSlope.x + this.startSlope.width > 0)
            this.startSlope.x -= deltaTime * this.playerSpeed;
    }

    updateGround(deltaTime)
    {
        this.ground.tilePosition.x -= deltaTime * this.playerSpeed;
    }

    updateMountains(deltaTime)
    {
        this.mountains.tilePosition.x -= deltaTime * (this.playerSpeed * 0.1);
    }

    updateObstacles(deltaTime)
    {
        if (Math.random() < OBSTACLE_PROBABILITY)
        {
            const obstacle = this.obstacles.find(ch => !ch.active);
            if (obstacle) obstacle.setOnStart(this.levelWidth);
        }

        this.obstacles.forEach(ch => {
            if (ch.active) ch.x -= deltaTime * this.playerSpeed;
            if (ch.x + ch.width < 0) ch.active = false;
        });
    }

    updateTrees(deltaTime)
    {
        if (Math.random() < TREE_PROBABILITY) this.addTree();

        this.trees.forEach(ch => {
            if (ch.active) ch.x -= deltaTime * this.playerSpeed;
            if (ch.x + ch.width < 0) ch.active = false;
        });
    }

    detectCollisions()
    {
        for (const obstacle of this.obstacles)
        {
            if (obstacle.active && Intersection.rectToRect(obstacle.getBounds(), this.player.getBounds()))
            {
                this.onCrush(obstacle);
                return;
            }
        }
    }

    addTree()
    {
        const tree = this.trees.find(ch => !ch.active);
        if (tree)
        {
            tree.scale.set(Random.betweenFloat(0.3, 1.2));
            tree.x = tree.startX;
            tree.active = true;
        }
    }

    resize()
    {
        const width = window.innerWidth;
        const height = window.innerHeight;
        const scale = width > height ? Math.min(height / ScreenSize.Width, width / ScreenSize.Height) : width / ScreenSize.Height;
        this.scale.set(scale);
        const x = 0;
        const y = height - ScreenSize.Height * scale - 50;
        this.position.set(x, y);
    }
}
