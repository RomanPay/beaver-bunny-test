import { Text } from "pixi.js";
import { ScreenSize } from "../Scene";
import { Button } from "./Button";
import { LeaderboardPlate } from "./LeadeboardPlate";

const CENTER_X = ScreenSize.Width * 0.5;
const CENTER_Y = ScreenSize.Height * 0.5;
const PERIOD_TEXT_STYLE = {
    fontFamily: "ZubiloBlack",
    fontSize: 60,
    fill: 0xFF0000,
    align: "center",
    dropShadow: {
        alpha: 0.8,
        angle: Math.PI / 2,
        color: '0x414141',
        distance: 5
    }
};
const TEXT_CONFIGS = [
    { fontFamily: "ZubiloBlack", fontSize: 50, fill: 0x00FF00 },
    { fontFamily: "ZubiloBlack", fontSize: 50, fill: 0x0000FF },
    { fontFamily: "ZubiloBlack", fontSize: 50, fill: 0x0FFF00 },
    { fontFamily: "ZubiloBlack", fontSize: 40, fill: 0x000000 }
];
const NAME_PLATE_KEYS = ["place_1", "place_2", "place_3", "midleader_name_plate"];
const SCORE_PLATE_KEYS = ["highleader_scores_plate", "highleader_scores_plate", "highleader_scores_plate", "midleader_scores_plate"];
const OFFSET_Y_VALUES = [81, 81, 68, 46];
const OFFSET_X_VALUES = [90, 90, 90, 60];

export class LeadersLists
{
    constructor(parent)
    {
        this.parent = parent;
        this.center = { x: CENTER_X, y: CENTER_Y };
        this.currentListsIndex = 0;

        this.initText();
        this.initButtons();
        this.leadersListsProcessing();
        this.initLeaderboardLists();
    }

    initText()
    {
        this.timePeriodText = new Text("All time", PERIOD_TEXT_STYLE);
        this.timePeriodText.position.set(this.center.x, this.center.y - 310);
        this.timePeriodText.anchor.set(0.5, 0.5);
        this.parent.addChild(this.timePeriodText);
    }

    initButtons()
    {
        this.leftArrow = new Button(this.parent, "arrow_btn", () => this.showLeaders(-1), this.center.x - 270, this.center.y - 310);
        this.leftArrow.scale.set(-1, 1);
        this.rightArrow = new Button(this.parent, "arrow_btn", () => this.showLeaders(1), this.center.x + 270, this.center.y - 310);
        this.okButton = new Button(this.parent, "ok_button", () => { }, this.center.x, this.center.y + 370);
    }

    leadersListsProcessing()
    {
        this.lists = [
            list.allTime.sort((a, b) => a.place - b.place),
            list.monthly.sort((a, b) => a.place - b.place),
            list.weekly.sort((a, b) => a.place - b.place)
        ];
    }

    initLeaderboardLists()
    {
        this.leadersPlates = [];
        let startY = this.center.y - 230;

        for (let i = 0; i < 10; i++)
        {
            const textConfig = TEXT_CONFIGS[Math.min(i, 3)];
            const namePlateKey = NAME_PLATE_KEYS[Math.min(i, 3)];
            const scorePlateKey = SCORE_PLATE_KEYS[Math.min(i, 3)];
            const offsetY = OFFSET_Y_VALUES[Math.min(i, 3)];
            const offsetX = OFFSET_X_VALUES[Math.min(i, 3)];

            const plate = new LeaderboardPlate(
                this.parent, namePlateKey, scorePlateKey,
                this.center.x - offsetX, startY, this.center.x + 260, startY,
                textConfig
            );

            if (i >= 3)
            {
                const placeText = new Text({
                    text: i + 1,
                    style: {
                        fontFamily: "ZubiloBlack",
                        fontSize: 40,
                        fill: 0xFFFFFF,
                        align: "center"
                    }
                });
                placeText.anchor.set(0.5, 0.5);
                placeText.position.set(this.center.x - 305, startY - 3);
                plate.addChild(placeText);
            }
            else
            {
                plate.nameText.x += 30;
            }

            startY += offsetY;
            this.leadersPlates.push(plate);
        }
    }

    disableInteractive()
    {
        this.setInteractive(false);
    }

    enableInteractive()
    {
        this.setInteractive(true);
    }

    setInteractive(state)
    {
        this.okButton.interactive = state;
        this.leftArrow.interactive = state;
        this.rightArrow.interactive = state;
    }

    showLeaders(step)
    {
        this.currentListsIndex = (this.currentListsIndex + step + 3) % 3;
        const timePeriods = ["All time", "Month", "Week"];
        this.timePeriodText.text = timePeriods[this.currentListsIndex];

        const list = this.lists[this.currentListsIndex];
        this.leadersPlates.forEach(plate => plate.alpha = 0);

        for (let i = 0; i < this.leadersPlates.length; i++)
        {
            const leaderPlate = this.leadersPlates[i];
            leaderPlate.nameText.text = list[i].name;
            leaderPlate.scoreText.text = list[i].scores;
            leaderPlate.show(i * 0.1);
        }
    }
}

const list = {
    "allTime": [
        {"id": "99000", "name": "Grace Hill", "scores": "35000", "place": "8"},
        {"id": "14214", "name": "John Doe", "scores": "43423", "place": "4"},
        {"id": "12345", "name": "Jane Smith", "scores": "54234", "place": "1"},
        {"id": "10101", "name": "Hank Green", "scores": "32000", "place": "9"},
        {"id": "55667", "name": "Eve Clark", "scores": "40000", "place": "6"},
        {"id": "11223", "name": "Bob Brown", "scores": "45000", "place": "3"},
        {"id": "33445", "name": "Charlie Davis", "scores": "42123", "place": "5"},
        {"id": "12121", "name": "Ivy Scott", "scores": "30000", "place": "10"},
        {"id": "67890", "name": "Alice Johnson", "scores": "49328", "place": "2"},
        {"id": "77889", "name": "Frank Wright", "scores": "38000", "place": "7"}
    ],
    "monthly": [
        {"id": "23456", "name": "Michael Lee", "scores": "1243", "place": "10"},
        {"id": "67890", "name": "Sophia Green", "scores": "1421", "place": "4"},
        {"id": "34567", "name": "Emma White", "scores": "1542", "place": "1"},
        {"id": "78901", "name": "Mason Adams", "scores": "1400", "place": "5"},
        {"id": "90123", "name": "Jacob King", "scores": "1350", "place": "7"},
        {"id": "12345", "name": "Noah Harris", "scores": "1300", "place": "9"},
        {"id": "45678", "name": "Olivia Black", "scores": "1493", "place": "2"},
        {"id": "01234", "name": "Mia Thompson", "scores": "1320", "place": "8"},
        {"id": "89012", "name": "Isabella Brown", "scores": "1380", "place": "6"},
        {"id": "56789", "name": "Liam Miller", "scores": "1450", "place": "3"}
    ],
    "weekly": [
        {"id": "34567", "name": "Lucas Wilson", "scores": "423", "place": "4"},
        {"id": "01234", "name": "Benjamin Lewis", "scores": "350", "place": "8"},
        {"id": "45678", "name": "Ava Martinez", "scores": "542", "place": "1"},
        {"id": "23456", "name": "Henry Robinson", "scores": "300", "place": "10"},
        {"id": "90123", "name": "Harper White", "scores": "380", "place": "7"},
        {"id": "56789", "name": "Elijah Taylor", "scores": "493", "place": "2"},
        {"id": "89012", "name": "James Jackson", "scores": "400", "place": "6"},
        {"id": "67890", "name": "Elsa Anderson", "scores": "450", "place": "3"},
        {"id": "12345", "name": "Evelyn Clark", "scores": "320", "place": "9"},
        {"id": "78901", "name": "Amelia Thomas", "scores": "421", "place": "5"}
    ]
};
