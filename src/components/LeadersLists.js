import { Text } from "pixi.js";
import { ScreenSize } from "../Scene";
import { Button } from "./Button";
import { LeaderboardPlate } from "./LeadeboardPlate";

export class LeadersLists
{
    constructor(parent)
    {
        this.parent = parent;

        this.center = { x: ScreenSize.Width * 0.5, y: ScreenSize.Height * 0.5};
        
        this.timePeriodText = new Text({
            text: "All time", 
            style: {
                fontFamily: "ZubiloBlack",
                fontSize: 60,
                fill: 0xFF0000,
                align: "center",
                dropShadow: {
                    alpha: 0.8,
                    angle: Math.PI / 2,
                    color: '0x414141',
                    distance: 5
                },
            }
        });
        this.timePeriodText.position.set(this.center.x, this.center.y - 310);
        this.timePeriodText.anchor.set(0.5, 0.5);
        this.parent.addChild(this.timePeriodText);
        
        this.leftArrow = new Button(this.parent, "arrow_btn", () => { this.showLeaders(-1); }, this.center.x - 270, this.center.y - 310);
        this.leftArrow.scale.set(-1, 1);
        this.rightArrow = new Button(this.parent, "arrow_btn", () => { this.showLeaders(1); }, this.center.x + 270, this.center.y - 310);
        this.okButton = new Button(this.parent, "ok_button", () => { }, this.center.x, this.center.y + 370);

        this.leadersListsProcessing();
        this.initLeaderboardLists();
    }

    leadersListsProcessing()
    {
        this.lists = [
            list.allTime.sort( (a, b) => a.place - b.place),
            list.montly.sort( (a, b) => a.place - b.place),
            list.weekly.sort( (a, b) => a.place - b.place)
        ];

        this.currentListsIndex = 0;
    }

    initLeaderboardLists()
    {
        this.leadersPlates = [];

        let startY = this.center.y - 230;
        let offsetY = 50;
        let offsetX = 60;
        let namePlateKey = "midleader_name_plate";
        let scorePlateKey = "midleader_scores_plate";

        let textConfig = {
            fontFamily: "ZubiloBlack",
            fontSize: 40,
            fill: 0x000000
        }

        for (let i = 1; i < 11; i++)
        {

            if (i === 1)
                textConfig = { fontFamily: "ZubiloBlack", fontSize: 50, fill: 0x00FF00 };
            else if (i === 2)
                textConfig = { fontFamily: "ZubiloBlack", fontSize: 50, fill: 0x0000FF };
            else if (i === 3)
                textConfig = { fontFamily: "ZubiloBlack", fontSize: 50, fill: 0x0FFF00 };
            else
                textConfig = { fontFamily: "ZubiloBlack", fontSize: 40, fill: 0x000000 };
                

            if (i < 4)
            {
                namePlateKey = "place_" + i;
                scorePlateKey = "highleader_scores_plate";
                offsetY = 81;
                offsetX = 90;
            }
            else
            {
                namePlateKey = "midleader_name_plate";
                scorePlateKey = "midleader_scores_plate";
                offsetY = 46;
                offsetX = 60;
            }
            if (i === 3)
                offsetY = 68;
            const plate = new LeaderboardPlate(
                this.parent, namePlateKey, scorePlateKey, 
                this.center.x - offsetX, startY, this.center.x + 260, startY, 
                textConfig
            );

            if (i < 4)
            {
                plate.nameText.x += 30;
            }
            else
            {
                const placeText = new Text({
                    text: i.toFixed(0), 
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

            startY += offsetY;

            this.leadersPlates.push(plate);
        }
    }

    disableInteractive()
    {
        this.okButton.interactive = false;
        this.leftArrow.interactive = false;
        this.rightArrow.interactive = false;
    }

    enableInteractive()
    {
        this.okButton.interactive = true;
        this.leftArrow.interactive = true;
        this.rightArrow.interactive = true;    
    }

    
    showLeaders(step)
    {
        let index = this.currentListsIndex + step;
        if (index > 2)
            index = 0;
        else if (index < 0)
            index = 2;

        this.timePeriodText.text = index === 0 ? "All time" : index === 1 ? "Month" : "Week"; 

        
        const list = this.lists[index];
        this.currentListsIndex = index;

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
    "montly": [
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
