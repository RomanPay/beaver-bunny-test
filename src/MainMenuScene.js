import Scene, { ScreenSize } from "./Scene";
import { Button } from "./components/Button";
import { MySprite } from "./components/MySprite";
import { Container, Text } from "pixi.js";
import { gsap } from "gsap";
import { LeadersLists } from "./components/LeadersLists";
import eventEmitter, { EventsList } from "./components/EventEmmiter";

export const MainMenuStates = {
    MainMenu: "MainMenu",
    Leaderboard: "Leaderboard",
    GameResults: "GameResults",
    Other: "Other"
};

const HEADER_TEXT_STYLE = {
    fontFamily: "ZubiloBlack",
    fontSize: 65,
    fill: 0x0000FF
};
const YOU_SCORE_TEXT_STYLE = {
    fontFamily: "ZubiloBlack",
    fontSize: 80,
    fill: 0xFFFF00,
    align: "center",
    dropShadow: {
        alpha: 0.8,
        angle: Math.PI / 2,
        color: '0x414141',
        distance: 10,
    }
};
const USERNAME_TEXT_STYLE = {
    fontFamily: "ZubiloBlack",
    fontSize: 60,
    fill: 0xFFFFFF
};
const GAME_SESSION_TEXT_STYLE = {
    fontFamily: "ZubiloBlack",
    fontSize: 150,
    fill: 0x00FF00,
    align: "center",
    dropShadow: {
        alpha: 0.8,
        angle: Math.PI / 2,
        color: '0x414141',
        distance: 10,
    }
};
const COINS_TEXT_STYLE = {
    fontFamily: "ZubiloBlack",
    fontSize: 90,
    fill: 0x00FF00,
    align: "center",
    dropShadow: {
        alpha: 0.8,
        angle: Math.PI / 2,
        color: '0x414141',
        distance: 10,
    }
};
const DISTANCE_TEXT_STYLE = {
    fontFamily: "ZubiloBlack",
    fontSize: 90,
    fill: 0x00F0FF,
    align: "center",
    dropShadow: {
        alpha: 0.8,
        angle: Math.PI / 2,
        color: '0x414141',
        distance: 10,
    }
};
const CENTER_X = ScreenSize.Width * 0.5;
const CENTER_Y = ScreenSize.Height * 0.5;

export class MainMenuScene extends Scene
{
    constructor(app)
    {
        super("MainMenu", app);
        this.init();
        this.resize();
    }

    init()
    {
        super.init();
        this.center = { x: CENTER_X, y: CENTER_Y };

        this.initBaseContainer();
        this.initMainMenuState();
        this.initLeaderboardState();
        this.initGameResultsState();
        this.initEvents();

        this.switchState(MainMenuStates.MainMenu);
    }

    initBaseContainer()
    {
        const baseContainer = new Container();
        baseContainer.position.set(0, 0);
        this.addChild(baseContainer);
        this.baseContainer = baseContainer;

        this.rays = new MySprite(this.baseContainer, "rays", this.center.x, this.center.y);
        this.rays.tl = gsap.to(this.rays, { angle: 360, repeat: -1, duration: 14, ease: "none" });
        this.rays.tl.pause();

        this.base = new MySprite(this.baseContainer, "info_plate_big", this.center.x, this.center.y);
        this.headerInfoPlate = new MySprite(this.baseContainer, "header_info_plate");
        this.headerInfoPlate.position.set(this.center.x, this.center.y - this.base.height * 0.5 + this.headerInfoPlate.height * 0.53);

        this.headerText = new Text("Your records:", HEADER_TEXT_STYLE);
        this.headerText.anchor.set(0.5, 0.5);
        this.headerText.position.set(this.headerInfoPlate.x, this.headerInfoPlate.y - 10);
        this.baseContainer.addChild(this.headerText);

        this.size = { width: this.base.width * 1.1, height: this.base.height * 1.1 + 70 };
    }

    initEvents()
    {
        eventEmitter.on(EventsList.PlayerCrush, (distance) => this.showGameResults(distance));
    }

    showGameResults(distance, numCoins = 0)
    {
        const sessionResult = distance + (numCoins * 5);
        this.gameSessionText.text = sessionResult.toFixed(0);

        this.distanceText.text = distance.toFixed(0) + " m";
        const distFromLS = localStorage.getItem("distance");
        if (distFromLS && distFromLS > distance)
        {
            this.rays.alpha = 0;
            this.stars.forEach(star => star.alpha = 0);
        }
        else if (!distance || distFromLS < distance)
        {
            this.rays.alpha = 1;
            this.stars.forEach(star => star.alpha = 1);
            this.rays.tl.play();
            this.stars.forEach(star => star.tl.play());
            localStorage.setItem("distance", sessionResult.toFixed(0));
            this.youScoreText.text = "Best score:\n" + sessionResult.toFixed(0);
        }
        
        gsap.timeline()
            .set(this.baseContainer, { y: -ScreenSize.Height })
            .to(this.baseContainer, { alpha: 1, duration: 0.15 })
            .to(this.baseContainer, { y: 0, duration: 0.3 });
        this.switchState(MainMenuStates.GameResults);
        this.interactiveChildren = true;
    }

    initMainMenuState()
    {
        this.mainMenuContainer = new Container();
        this.baseContainer.addChild(this.mainMenuContainer);

        const distFromLS = localStorage.getItem("distance");
        const scoreString = distFromLS ?  "Best score:\n" + distFromLS : "Best score:\n0"
        this.youScoreText = new Text(scoreString, YOU_SCORE_TEXT_STYLE);
        this.youScoreText.anchor.set(0.5, 0);
        this.youScoreText.position.set(this.center.x, this.center.y - 380);
        this.mainMenuContainer.addChild(this.youScoreText);

        this.loginButton = new Button(this.mainMenuContainer, "login_button", () => window.open("https://youtu.be/dQw4w9WgXcQ?si=ux1h73rjWWIYu26G", "_blank"), this.center.x, this.center.y - 70);
        this.usernameBar = new MySprite(this.mainMenuContainer, "user_name_bar", this.center.x, this.center.y + 110);

        this.usernameText = new Text("User name", USERNAME_TEXT_STYLE);
        this.usernameText.anchor.set(0, 0.5);
        this.usernameText.position.set(this.usernameBar.x - 270, this.usernameBar.y);
        this.mainMenuContainer.addChild(this.usernameText);

        this.leaderboardButton = new Button(this.mainMenuContainer, "leadboard_button", () => this.switchState(MainMenuStates.Leaderboard), this.center.x - 160, this.center.y + 300);
        this.playButton = new Button(this.mainMenuContainer, "play_button", () => this.playButtonProcessing(), this.center.x + 160, this.center.y + 300);
    }

    playButtonProcessing()
    {
        eventEmitter.emit(EventsList.StartGame);
        this.interactiveChildren = false;
        this.baseContainer.alpha = 0;
    }

    initLeaderboardState()
    {
        this.leaderboardContainer = new Container();
        this.baseContainer.addChild(this.leaderboardContainer);
        this.leadersLists = new LeadersLists(this.leaderboardContainer);
        this.leadersLists.okButton.callback = () => this.switchState(MainMenuStates.MainMenu);
    }

    initGameResultsState()
    {
        this.gameResultsContainer = new Container();
        this.baseContainer.addChild(this.gameResultsContainer);

        this.gameSessionText = new Text("100", GAME_SESSION_TEXT_STYLE);
        this.gameSessionText.anchor.set(0.5, 0.5);
        this.gameSessionText.position.set(this.center.x, this.center.y - 220);
        this.gameResultsContainer.addChild(this.gameSessionText);

        this.numCoinsText = new Text("99", COINS_TEXT_STYLE);
        this.numCoinsText.anchor.set(0.5, 0.5);
        this.numCoinsText.position.set(this.center.x, this.center.y);
        this.gameResultsContainer.addChild(this.numCoinsText);

        this.distanceText = new Text("99 m", DISTANCE_TEXT_STYLE);
        this.distanceText.anchor.set(0.5, 0.5);
        this.distanceText.position.set(this.center.x + 50, this.center.y + 200);
        this.gameResultsContainer.addChild(this.distanceText);

        const coin = new MySprite(this.gameResultsContainer, "coin", this.center.x - 200, this.center.y);
        const flag = new MySprite(this.gameResultsContainer, "collect_distance_icon", this.center.x - 200, this.center.y + 200);

        this.gameResultOkButton = new Button(this.gameResultsContainer, "ok_button", () => this.switchState(MainMenuStates.Leaderboard), this.center.x, this.center.y + 370);

        this.stars = this.createStars();
    }

    createStars()
    {
        const starsConfig = [
            { x: -480, y: -350, scale: 1, angle: 10 },
            { x: -500, y: -150, scale: 0.7, angle: 0 },
            { x: -520, y: 100, scale: 1.2, angle: -10 },
            { x: -480, y: 350, scale: 1, angle: 5 },
            { x: 470, y: -350, scale: 0.9, angle: -15 },
            { x: 510, y: -150, scale: 1.2, angle: -10 },
            { x: 500, y: 100, scale: 0.9, angle: 5 },
            { x: 480, y: 350, scale: 1, angle: 0 },
        ];

        return starsConfig.map(config => {
            const star = new MySprite(this.gameResultsContainer, "star", this.center.x + config.x, this.center.y + config.y);
            star.angle = config.angle;
            star.scale.set(config.scale);
            star.tl = gsap.fromTo(star, { angle: config.angle - 5 }, { angle: config.angle + 5, duration: 1, ease: "sine.inOut", yoyo: true, repeat: -1 });
            star.tl.pause();
            return star;
        });
    }

    switchState(state)
    {
        this.state = state;

        switch (state)
        {
            case MainMenuStates.MainMenu:
                this.showMainMenu();
                break;
            case MainMenuStates.Leaderboard:
                this.showLeaderboard();
                break;
            case MainMenuStates.GameResults:
                this.showGameResultsScreen();
                break;
            default:
                console.warn("state not defined", state);
                break;
        }
    }

    showMainMenu()
    {
        this.leadersLists.disableInteractive();
        this.rays.alpha = 0;
        this.rays.tl.pause();
        this.stars.forEach(star => star.tl.pause());
        this.gameResultOkButton.interactive = false;
        this.leaderboardButton.interactive = true;
        this.playButton.interactive = true;
        this.leaderboardContainer.alpha = 0;
        this.gameResultsContainer.alpha = 0;
        this.mainMenuContainer.alpha = 1;
        this.headerText.text = "Your records:";
    }

    showLeaderboard()
    {
        this.leadersLists.enableInteractive();
        this.rays.alpha = 0;
        this.rays.tl.pause();
        this.stars.forEach(star => star.tl.pause());
        this.gameResultOkButton.interactive = false;
        this.leaderboardButton.interactive = false;
        this.playButton.interactive = false;
        this.mainMenuContainer.alpha = 0;
        this.gameResultsContainer.alpha = 0;
        this.leaderboardContainer.alpha = 1;
        this.headerText.text = "Leaderboard";
        this.leadersLists.showLeaders(0);
    }

    showGameResultsScreen()
    {
        this.leadersLists.disableInteractive();
        this.leaderboardButton.interactive = false;
        this.playButton.interactive = false;
        this.mainMenuContainer.alpha = 0;
        this.leaderboardContainer.alpha = 0;
        this.gameResultsContainer.alpha = 1;
        this.gameResultOkButton.interactive = true;
        this.headerText.text = "Your score:";
    }

    resize()
    {
        const width = window.innerWidth;
        const height = window.innerHeight;

        const scale = width > height ?
            Math.min(height / this.size.height, width / this.size.width) :
            Math.min(height / this.size.width, width / this.size.height);
        this.scale.set(scale);

        const x = width * 0.5 - (ScreenSize.Width * 0.5) * scale;
        const y = height * 0.5 - (ScreenSize.Height * 0.5) * scale + 70 * scale;
        this.position.set(x, y);
    }
}
