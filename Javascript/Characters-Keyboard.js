const player = document.getElementById("player");
const bubbles = document.getElementById("bubbles");
const text = document.getElementById("text-content");
const npcbubbles = document.getElementById("npc-bubbles");
const npctext = document.getElementById("npctext");
const Arrow = document.getElementById("Background");

// Airplane scene // 
const planeContainer = document.getElementById("airplane-scene");
const planeImg = document.getElementById("airplane");

// ID's FOR Combat System // 
const enemy = document.getElementById("enemy");
const Psheild = document.getElementById("PShield");
const Esheild = document.getElementById("EShield");
const PHealthcon = document.getElementById("Health-bar-player");
const EHealthcon = document.getElementById("Health-bar-enemy");
const PHealth = document.getElementById("player-inner-Line");
const EHealth = document.getElementById("enemy-inner-Line");
const bullet = document.getElementById("Bullet");
const PBullet = document.getElementById("PBullet");

// ID's FOR chooses System // 
const Chooses = document.getElementById("Main-Container");
const Question = document.getElementById("Q");

/* Globle Varables*/
let D = false;
let A = false;
let speed = 15;
let posX = 0;
let posY = 0;
let count = 0;
let isTalking = false;
let hasTalked = false;
let levelIndex = 0;
let isChoosing = false;
let hasChoice = false;

/* Globle Varables For Combat System*/
//Main vars //
let playerHP = 100;
let enemyHP = 100;

// Shooting vars // 
let PBulletX = -100;
let isPBulletActive = false;
let bulletX = -100;
let isBulletActive = false;
let bulletSpeed = 10;
let PbulletSpeed = 10;

// enemy movement vars //
let enemyX = window.innerWidth - 200;
let enemySpeed = 5;
let isEnemyShieldActive = false;
let isPlayerShieldActive = false;
let traget = 0;
let movingstatus = false;
// start positions styling // 
player.style.left = posX + "px";


// Keys Function //
const e = (event) => {

    if ((event.code === 'KeyA' || event.code === 'ArrowLeft') && isTalking === false && isChoosing === false) {
        A = true
    } else if ((event.code === 'KeyD' || event.code === 'ArrowRight') && isTalking === false && isChoosing === false) {
        D = true
    } else if (event.code === 'Enter' && isTalking === true) {
        if (count >= currentLevel[levelIndex].dialague.length - 1) {
            cleanup();
        }
        else {
            count++;
            textswap();
        }
    }
}

const cleanup = () => {
    bubbles.style.display = "none";
    npcbubbles.style.display = "none";
    Arrow.style.display = "block";
    isTalking = false;
    count = 0
    A = false;
    D = false;
    hasTalked = true;

    if (currentLevel[levelIndex].hasdialague) {
        if (currentLevel[levelIndex].sceneID.includes("Animation")) {
            if (this.flightFinished) {
                Arrow.style.display = "block";
            }
        } else {

            Arrow.style.display = "block";
        }
    }

    if (currentLevel[levelIndex].isChoosing) {
        displaychoice();
    }

}
// Stop moving function // 
const Stopmoving = () => {
    A = false
    D = false
}
// Moving function //
const moving = () => {
    if (A === true && posX > 0 && isTalking === false && isChoosing === false) {
        player.style.left = (posX = posX - speed) + "px";
        player.style.transform = "scaleX(-1)";
    } else if (D === true && isTalking === false && isChoosing === false) {
        let canMoveForward = true; 
        if (currentLevel[levelIndex].combatmode === true && posX >= (window.innerWidth / 2) - 250 ) {
            canMoveForward = false;
        }
        
        if (posX >= window.innerWidth - 245) {
            canMoveForward = false;
        }

        if (canMoveForward) {
            player.style.left = (posX = posX + speed) + "px";
            player.style.transform = "scaleX(1)";
        }
    }

    requestAnimationFrame(moving);
}
const textswap = () => {
    if (currentLevel[levelIndex].dialague[count].name === "Hero") {
        bubbles.style.display = "block"
        npcbubbles.style.display = "none";
        text.innerText = currentLevel[levelIndex].dialague[count].text
    } else if (currentLevel[levelIndex].dialague[count].name !== "Hero") {
        npcbubbles.style.display = "block"
        bubbles.style.display = "none";
        npctext.innerText = currentLevel[levelIndex].dialague[count].text;
    }
}
const GateKeeper = () => {

    if (levelIndex >= currentLevel.length) {
        return;
    }
    if (currentLevel[levelIndex].hasdialague === true) {
        if (posX > currentLevel[levelIndex].triggerPoint && isTalking === false && hasTalked === false) {
            isTalking = true;
            A = false;
            D = false;
            text.innerText = currentLevel[levelIndex].dialague[count].text;
            hasTalked = true;
            count = 0;
            textswap();

            if (currentLevel[levelIndex].LookAt === "left") {
                player.style.transform = "scaleX(-1)";
                text.style.transform = "scaleX(-1)"
            } else if (!currentLevel[levelIndex].LookAt === "left") {
                player.style.transform = "scaleX(1)";
            }
        }
    } else if (currentLevel[levelIndex].hasdialague === false) {
        if (posX > window.innerWidth - 275) {
            Arrow.style.display = "block";
        }
    }
    if (currentLevel[levelIndex].isChoosing === true && currentLevel[levelIndex].hasChoice === false) {
        if (posX > 400 && isChoosing === false) {
            displaychoice();
        }
    }
    requestAnimationFrame(GateKeeper);
}

let currentLevel = [
    { sceneID: "Home", playerY: 0, LookAt: "left", triggerPoint: 1400, hasdialague: true, dialague: [{ name: "TV", text: "AI robots are taking over the world." }, { name: "Hero", text: "Its 7:55 I should head to collage." }], background: ('img/Medium-start.png') },

    { sceneID: "way-college", playerY: 650, hasdialague: false, background: ('scene/1.png') },

    {
        sceneID: "classroom", playerY: 700, LookAt: "left", triggerPoint: 950, hasdialague: true, dialague: [{ name: "Teacher", text: "AI is taking over the world I cant help since im too old." }, { name: "Teacher", text: "I send you on a quest for extra credit! MC!!!" },
        { name: "Hero", text: "Extra credit, ill do anything for extra credit!" }, { name: "Teacher", text: "Go home wise student and gather your items to conquer AI!" }], background: ('scene/2.png')
    },

    { hasdialague: false, playerY: 580, background: ('scene/3.png') },

    { sceneID: "Home2", playerY: 0, LookAt: "left", triggerPoint: 600, hasdialague: true, dialague: [{ name: "TV", text: "Air Line (67 + 67)/67 to AI military base." }, { name: "Hero", text: "I need to Remember This" }], background: ('img/Medium-start.png') },

    { hasdialague: false, playerY: 515, background: ('scene/5.png') },

    { sceneID: "Airplane1", hasdialague: false, playerY: 400, isChoosing: true, hasChoice: false, choiceData: { question: "Which gate you choose?", options: ["1", "2", "3"], outcomes: { "1": { Deadly: true }, "2": { Deadly: true }, "3": { text: "Have great fly." } } }, background: ('scene/6.png') },

    { sceneID: "AirplaneAnimation", hasdialague: false, background: ('scene/7.png') },

    { sceneID: "AirplaneAnimation2", hasdialague: false, background: ('scene/9.png') },

    { sceneID: "airplane", playerY: 600, playerX: 800, triggerPoint: 1100, hasdialague: true, dialague: [{ name: "soldier", text: "Follow me to base, theirs incoming fire." }], background: ('scene/8.png') },

    {
        sceneID: "warehouse1", playerX: 500, LookAt: "left", triggerPoint: 1100, hasdialague: true, dialague: [{ name: "soldier", text: "We need the secret weapon." }, { name: "Hero", text: "No it’s too dangerous." },
        { name: "soldier", text: "The ENERGY SWORD" }, { name: "Hero", text: "Sure." },
        { name: "soldier", text: "It was separated to two warehouses." }, { name: "Hero", text: "Will I get more extra credit?" }], background: ('scene/14.png')
    },

    { sceneID: "company1", playerY: 775, combatmode: true, hasdialague: false, background: ('scene/16.png') },

    { sceneID: "warehouse1", LookAt: "left", triggerPoint: 1100, combatmode: false, hasdialague: true, dialague: [{ name: "soldier", text: "Go to the second company, and retrive the piece!" }, { name: "Hero", text: "okay." }], background: ('scene/17.png') },

    { sceneID: "company2", combatmode: true, hasdialague: false, background: ('scene/18.png') },

    { sceneID: "warehouse1", playerY: 0,  LookAt: "left", combatmode: false, triggerPoint: 1100, hasdialague: true, dialague: [{ name: "soldier", text: "Be ready you are going to fight the Boss" }, { name: "Hero", text: "Okay!" }], background: ('scene/20.png') },

    { sceneID: "company2",combatmode: true, hasdialague: false, background: ('scene/21.png') },

    { sceneID: "boss", combatmode: true, hasdialague: false, background: ('scene/22.png') },

    { sceneID: "airplane", playerY: 0, triggerPoint: 900, hasdialague: true, dialague: [{ name: "soldier", text: "Goodbye, Thank you." }], background: ('scene/8.png')}
]



//------choices Functions ------// 
const choiceclick = (outcomes) => {
    Chooses.innerHTML = "";
    Chooses.style.display = "none";

    if (outcomes.Deadly) {
        alert("you are gleaned, try again")
        location.reload();
    } else {
        isChoosing = false
        currentLevel[levelIndex].hasChoice = true;

        npcbubbles.style.display = "block";
        npctext.innerText = outcomes.text;
        Arrow.style.display = "block";
        Question.style.display = "none";
    }
}
const displaychoice = () => {
    isChoosing = true;

    const level = currentLevel[levelIndex];
    if (!level.choiceData) return;

    isChoosing = true;
    Stopmoving();

    Question.textContent = level.choiceData.question;
    Chooses.innerHTML = "";
    Chooses.style.display = "flex";

    level.choiceData.options.forEach(optionText => {
        const btn = document.createElement("button");
        btn.className = "button";
        btn.textContent = optionText;

        btn.addEventListener("click", () => {
            const selectedOutcome = level.choiceData.outcomes[optionText];
            choiceclick(selectedOutcome);
        });

        Chooses.appendChild(btn);
    });
}
//------Combatmode Function ------// 
const Emoving = () => {
    if (currentLevel[levelIndex].combatmode === true) {
        let max = window.innerWidth / 2;
        let min = window.innerWidth - 200;
        let des = Math.floor(Math.random() * (max - min) + min)
        if (Math.abs(enemyX - des) < 200) {
            Emoving();
            return;
        } else {
            traget = des;
        }
        movingstatus = true;
        isEnemyShieldActive = false;
    }
}

// Enemy shooting System // 
const Eshooting = () => {
    if (isEnemyShieldActive === false) {
        bulletX = enemyX;
        isBulletActive = true;
        bullet.style.display = "block";
        bullet.style.top = 900 + "px";
    }
}
// Enemy shielding system //
const EShielding = () => {
    let min = 1
    let max = 100
    let rshield = Math.floor(Math.random() * (max - min) + min)
    if (rshield > 50) {
        isEnemyShieldActive = true;
        Esheild.style.display = "block";
    } else {
        isEnemyShieldActive = false;
        Esheild.style.display = "none";
    }
}
// Player Shooting system //
const PShooting = () => {
    if (isPBulletActive === false && isPlayerShieldActive === false && currentLevel[levelIndex].combatmode) {
        PBulletX = posX;
        PBullet.style.display = "block";
        PBullet.style.top = 900 + "px";
        isPBulletActive = true;
    }

}
// Player shield system //
// Combat Movemenets //

const PshieldKeydown = (e) => {
    if (e.code === 'KeyS' && currentLevel[levelIndex].combatmode === true) {
        isPlayerShieldActive = true;
        Psheild.style.display = "block";
    }
}
const PshieldKeyup = (e) => {
    if (e.code === 'KeyS') {
        isPlayerShieldActive = false;
        Psheild.style.display = "none";
    }

}
//------Combatmode System ------------------------// 

const Efacing = () => {
    if (currentLevel[levelIndex].combatmode === true) {
        enemy.style.display = "block";
        PHealthcon.style.display = "block";
        EHealthcon.style.display = "block";

        if (movingstatus === true) {
            if (Math.abs(enemyX - traget) < enemySpeed) {
                enemyX = traget
                enemy.style.left = enemyX + "px";
                movingstatus = "waiting";
                isEnemyShieldActive = true;

                setTimeout(() => {
                    Emoving();
                }, 2000
                );
                EShielding();
                Eshooting();

            }
            if (enemyX < traget) {
                let Lposition = enemyX + enemySpeed
                enemyX = Lposition
                enemy.style.left = Lposition + "px";
                enemy.style.transform = "scaleX(-1)";
            } else if (enemyX > traget) {
                let Rposition = enemyX - enemySpeed
                enemyX = Rposition
                enemy.style.left = Rposition + "px";
                enemy.style.transform = "scaleX(1)";
            }
        }
        if (isBulletActive === true) {
            bulletX = bulletX - bulletSpeed;
            bullet.style.left = bulletX + "px";

            if ((bulletX - posX) < 50) {
                isBulletActive = false;
                bullet.style.display = "none";
                if (isPlayerShieldActive === false) {
                    playerHP = playerHP - 50;
                    PHealth.style.width = playerHP + "%";
                }
            }
        }
        if (isPBulletActive === true) {
            PBulletX = PBulletX + PbulletSpeed;
            PBullet.style.left = PBulletX + "px";

            if (PBulletX > enemyX) {
                isPBulletActive = false;
                PBullet.style.display = "none";

                if (isEnemyShieldActive === false) {
                    enemyHP = enemyHP - 10;
                    EHealth.style.width = enemyHP + "%";
                }
            }
        }
        const botImg = enemy.querySelector('img');
        if (currentLevel[levelIndex].sceneID === "boss") {
            botImg.src = "Img/AI-Boss.svg";
        } else {
            botImg.src = "Img/midRobots.svg";
        }
        if (enemyHP <= 0) {
            enemyHP = 100;
            EHealth.style.width = "100" + "%";
            currentLevel[levelIndex].combatmode = false;
            enemy.style.display = "none";
            Arrow.style.display = "block";

            PHealthcon.style.display = "none";
            PHealth.style.width = "100" + "%";
            playerHP = 100;
        }
        if (playerHP <= 0) {
            alert("You got gleaned :)");

            
            levelIndex = 0;
            botsDefeated = 0;
            playerHP = 100;
            enemyHP = 100;

            
            PHealth.style.width = "100%";
            EHealth.style.width = "100%";
            PHealthcon.style.display = "none";
            EHealthcon.style.display = "none";
            enemy.style.display = "none";

    
            posX = 0;
            player.style.left = posX + "px";

           
            location.reload();
            return; 
        }

        

    }
    requestAnimationFrame(Efacing);
}

function changeBackground() {
    document.getElementById("Background").addEventListener('click', function () {
        levelIndex++;
        posX = 0;
        isTalking = false;
        player.style.left = posX + "px";
        document.body.style.backgroundImage = "url('" + currentLevel[levelIndex].background + "')";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
        document.body.className = currentLevel[levelIndex].sceneID;
        Arrow.style.display = "none";
        hasTalked = false;
        npcbubbles.style.display = "none";
        player.style.transform = "scaleX(1)";
        setSceneY();
        if (currentLevel[levelIndex].combatmode) {
            Emoving();
        }

        if (currentLevel[levelIndex].sceneID === "AirplaneAnimation" || currentLevel[levelIndex].sceneID === "AirplaneAnimation2") {
            player.style.display = "none";
            planeContainer.style.display = "block";

            planeImg.classList.remove("fly-across");
            void planeImg.offsetWidth;
            planeImg.classList.add("fly-across");

            // NEW LOGIC: Use a flag to track when the flight is done
            this.flightFinished = false;
            setTimeout(() => {
                this.flightFinished = true;
                // Only show arrow if they aren't talking
                if (isTalking === false) {
                    Arrow.style.display = "block";
                }
            }, 5000);

        } else {
            planeContainer.style.display = "none";
            player.style.display = "block";
        }

    });
}
function setSceneY() {
    if (currentLevel[levelIndex].playerY) {
        console.log(currentLevel[levelIndex].playerY);
        player.style.top = currentLevel[levelIndex].playerY + 'px';
    }
    if (currentLevel[levelIndex].playerX) {
        posX = currentLevel[levelIndex].playerX
        player.style.left = posX + "px";
    } else {
        posX = 0;
        player.style.left = posX + "px";
    }
    if (currentLevel[levelIndex].playerB) {
        player.style.bottom = currentLevel[levelIndex].playerB + "px";
    }
}
const inventory = document.getElementById('inventory-overlay');

document.addEventListener('keydown', (event) => {
    if (event.key === 'm' || event.key === 'M') {
        inventory.classList.toggle('hidden');
    }
});

Emoving();
Efacing();
changeBackground();
GateKeeper();
moving();
window.addEventListener('keydown', e);
window.addEventListener('keyup', Stopmoving);
window.addEventListener('keydown', PshieldKeydown);
window.addEventListener('keyup', PshieldKeyup);
window.addEventListener('click', PShooting);