import { Container, Graphics, Sprite, Texture, TilingSprite } from "pixi.js";
import Scene, { ScreenSize } from "./Scene.js"
import { ImagesBundle } from "./PreloadScene.js";
import { MySprite } from "./components/MySprite.js";
import { gsap } from "gsap";
import { Intersection, Random } from "./Utills.js";
import { Player, PlayerState } from "./components/Player.js";
import { Obstacle } from "./components/Obstacle.js";
import { Booster, BoosterType } from "./components/Booster.js";
import eventEmitter, { EventsList } from "./components/EventEmmiter.js";

export class GameScene extends Scene
{
    constructor(app)
    {
        super("GameScene", app);

        this.init();
        this.resize();
        // this.drawBounds(0xFF00FF);
    }

    init()
    {
        this.background = new MySprite(this, "bg_gradient", 0, -ScreenSize.Height * 1.2);
        this.background.anchor.set(0, 0);
        this.background.width = ScreenSize.Width * 2.5;
        this.background.height = ScreenSize.Height * 2.5;
        this.sun = new MySprite(this, "bg_sun", 300, 300);

        
        this.initLevel();

        this.isPause = false;
        this.isGameReady = false;
        this.player = new Player(this.levelContainer);
        this.isUpdate = true;
        this.playerCruiseSpeed = 30;

        this.initEvents();
        this.startGame();
    }

    initEvents()
    {
        this.on("pointerdown", () => this.onPointerDown());
        eventEmitter.on(EventsList.Pause, () => this.setPause());
        eventEmitter.on(EventsList.StartGame, () => {
            this.interactive = true;
            this.startGame();
        });
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
            this.player.jump();
    }

    startGame()
    {
        this.isGameReady = true;
        this.player.position.set(ScreenSize.Width * 0.5, ScreenSize.Height * 0.5);
        this.player.isUpdate = false;
        this.playerSpeed = 0;
        this.isUpdate = true;
        this.player.setState(PlayerState.OnAir);

        this.obstacles.forEach(ch => { 
            ch.x = -100;
            ch.active = false;
            ch.img.texture = new Texture.from(ch.idleKey); 
        });

        this.startSlope.position.set(580, ScreenSize.Height - 314 - 200);
    }

    onCrush(obstacle)
    {
        obstacle.crush();
        this.player.crush();
        this.isUpdate = false;
        this.playerSpeed = 0;
        eventEmitter.emit(EventsList.PlayerCrush);
    }

    setPause()
    {
        this.isPause = !this.isPause;

        this.playerSpeed = this.isPause ? 0 : this.playerCruiseSpeed;
        this.isPause ? this.player.isUpdate = false : this.player.isUpdate = true;
    }

    initLevel()
    {
        this.levelWidth = ScreenSize.Width * 2.5;

        this.levelContainer = new Container();
        this.addChild(this.levelContainer);

        const textureGround = new Texture.from("floor");
        const textureGroundHeight = 414;
        const ground = new TilingSprite({ texture: textureGround, width: this.levelWidth, height: textureGroundHeight });
        ground.position.set(0, ScreenSize.Height - textureGroundHeight * 0.5);
        this.ground = ground;
        
        const textureMountains = new Texture.from("back_rocks");
        const textureMountainsHeight = 770;
        const mountains = new TilingSprite({ texture: textureMountains, width: this.levelWidth, height: textureMountainsHeight });
        mountains.position.set(0, ScreenSize.Height - textureMountainsHeight);
        this.mountains = mountains;

        this.levelContainer.addChild(mountains);
        this.levelContainer.addChild(ground);

        this.startSlope = new MySprite(this.levelContainer, "jumpboard", 580, ScreenSize.Height - 314 - 200);

        this.levelContainer.angle = 5;
        this.levelContainer.x -= 50;

        this.initTrees();
        this.initObstacles();
        // this.initBoosters();
    }

    initBoosters()
    {
        this.boosters = [];

        const booster = new Booster(this.levelContainer, { type: BoosterType.Balloon });
        booster.position.set(ScreenSize.Width * 0.6, ScreenSize.Height * 0.65);
        // booster.active = true;
        this.boosters.push(booster);
    }

    initHouse()
    {
        const tilesFloorKeys = "tail_wall_";
        const house = new Container();

        const tileSize = 228;
        const houseX = ScreenSize.Width * 0.5;
        const houseY = ScreenSize.Height * 0.5;
        
        const floors = Random.between(2, 5);
        const lenght = Random.between(2, 5);

        
        // if (lenght < 3)     floors = 2

        for (let row = 0; row < lenght; row++)
        {
            for (let col = 0; col < floors; col++)
            {
                const tileKey = tilesFloorKeys + Random.between(1, 7).toFixed(0);

                const tile = new MySprite(house, tileKey, houseX + tileSize * col, houseY - tileSize * row);
                // console.log( houseX + tileSize * lenght, houseY - tileSize * floors);
            }
        }

        this.levelContainer.addChild(house);

    }

    initGround()
    {
        this.groundTiles = [];
        let floorTileWidth = 0;
        for (let i = 0; i < 3; i++)
        {
            const ground = new MySprite(this.levelContainer, "floor", floorTileWidth * i, ScreenSize.Height - 200);   
            floorTileWidth = ground.width;
            this.groundTiles.push(ground);
        }
    }

    initTrees()
    {
        this.trees = [];

        for (let i = 0; i < 20; i++)
        {
            const tree = new MySprite(this.levelContainer, Math.random() < 0.5 ? "tree_1" : "tree_2", this.levelWidth, ScreenSize.Height - 200);
            tree.startX = this.levelWidth;
            tree.anchor.set(0.5, 1);            
            tree.active = false;
            this.trees.push(tree);
        }
    }

    initObstacles()
    {
        this.obstacles = [];

        for (let i = 0; i < 4; i++)
        {
            const obstacle = new Obstacle(this.levelContainer);
            this.obstacles.push(obstacle);
        }
    }

    update(deltaTime)
    {    
        if (!this.isUpdate) return ;
        
        //     for (const groundTile of this.groundTiles)
        //     {
        //         if (groundTile.x + groundTile.width < 0)
        //             groundTile.x = ScreenSize.Width + groundTile.width;

        //         groundTile.x -= deltaTime * this.playerSpeed;
        //     }
        if (this.startSlope.x + this.startSlope.width > 0)
            this.startSlope.x -= deltaTime * this.playerSpeed;
        this.ground.tilePosition.x -= deltaTime * this.playerSpeed;
        this.mountains.tilePosition.x -= deltaTime * (this.playerSpeed * 0.1);

        if (Math.random() < 0.002)
        {
            const obstacle = this.obstacles.find(ch => ch.active === false);
            if (obstacle)
                obstacle.setOnStart(this.levelWidth);
        }

        this.trees.forEach(ch => {
            if (ch.active)
                ch.x -= deltaTime * this.playerSpeed;
            if (ch.x + ch.width < 0)
                ch.active = false;
        });

        this.obstacles.forEach(ch => {
            if (ch.active)
                ch.x -= deltaTime * this.playerSpeed;
            if (ch.x + ch.width < 0)
                ch.active = false;
        });

        if (Math.random() < 0.005)
            this.addTree();

        // if (Math.random() < 0.003)
        //     this.addHouse();


        if (this.player)
            this.player.update(deltaTime);

        this.detectCollisions();
    }

    detectCollisions()
    {
        for (const obstacle of this.obstacles)
        {
            if (obstacle.active)
            {
                if (Intersection.rectToRect(obstacle.getBounds(), this.player.getBounds()))
                    this.onCrush(obstacle);
            }
        }

        // for (const booster of this.boosters)
        // {
        //     if (booster.active)
        //     {
        //         if (Intersection.rectToRect(booster.getBounds(), this.player.getBounds()))
        //         {
        //             console.log("booster");
                    // obstacle.crush();
                    // this.player.crush();
                    // this.isUpdate = false;
                    // this.playerSpeed = 0;
        //         }
        //     }
        // }
    }

    addTree()
    {
        const tree = this.trees.find(ch => ch.active === false);
        
        if (tree)
        {
            tree.scale.set(Random.betweenFloat(0.3, 1.2));
            tree.x = tree.startX;
            tree.active = true;            
        }
    }

    addHouse()
    {
        // console.log("add house");
        // const tree = new MySprite(this.levelContainer, Math.random() < 0.5 ? "tree_1" : "tree_2", ScreenSize.Width * 1.6, ScreenSize.Height - 200);
        // tree.anchor.set(0.5, 1);
        // this.decor.push(tree);
    }

    resize()
    {
        const width = window.innerWidth;
        const height = window.innerHeight;


        console.log(`width ${ width }, height ${ height }`);

        // const scale = width > height ?
        //             Math.min(height / ScreenSize.Height, width / ScreenSize.Width) :
        //             Math.min(height / ScreenSize.Width, width / ScreenSize.Height);

        let scale = width > height ?
                    Math.min(height / ScreenSize.Width, width / ScreenSize.Height) :
                    width / ScreenSize.Height;

        // console.log(scale);
        this.scale.set(scale);
        
        // const x = width * 0.5 - (ScreenSize.Width * 0.5) * scale;
        let x = 0;
        const y = height - ScreenSize.Height * scale - 100; 
        
        this.position.set(x, y);
    }
}