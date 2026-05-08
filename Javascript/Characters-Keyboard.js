const player = document.getElementById("player");
const bubbles = document.getElementById("bubbles");
const text = document.getElementById("text-content");
const npcbubbles = document.getElementById("npc-bubbles");
const npctext = document.getElementById("npctext");
const Arrow = document.getElementById("Background");

// ID's FOR Combat System // 
const enemy = document.getElementById("enemy");
const Psheild = document.getElementById("PShield");
const Esheild = document.getElementById("EShield");
const PHealth = document.getElementById("player-inner-Line");
const EHealth = document.getElementById("enemy-inner-Line");
const bullet = document.getElementById("Bullet");
const PBullet = document.getElementById("PBullet");

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

    if ((event.code === 'KeyA' || event.code === 'ArrowLeft') && isTalking === false) {
        A = true
    } else if ((event.code === 'KeyD' || event.code === 'ArrowRight') && isTalking === false) {
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

}
// Stop moving function // 
const Stopmoving = () => {
    A = false
    D = false
}
// Moving function //
const moving = () => {
    if (A === true && posX > 0 && isTalking === false) {
        player.style.left = (posX = posX - speed) + "px";
        player.style.transform = "scaleX(-1)";
    } else if (D === true && posX < window.innerWidth - 245 && isTalking === false) {
        player.style.left = (posX = posX + speed) + "px";
        player.style.transform = "scaleX(1)";
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
    requestAnimationFrame(GateKeeper);

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
        }
    } else if (currentLevel[levelIndex].hasdialague === false) {
        if (posX > window.innerWidth - 275) {
            Arrow.style.display = "block";
        }
    }

}

let currentLevel = [
    { sceneID: "Home", playerY: 0, LookAt: "left", triggerPoint: 1400, hasdialague: true, dialague: [{ name: "TV", text: "AI robots are taking over the world." }, { name: "Hero", text: "Its 7:55 I should head to collage." }], background: ('img/Medium-start.png') },

    { sceneID: "way-college", playerY: 600, hasdialague: false, background: ('scene/1.png') },

    {
        sceneID: "classroom", playerY: 700, LookAt: "left", triggerPoint: 850, hasdialague: true, dialague: [{ name: "Teacher", text: "AI is taking over the world I cant help since im too old." }, { name: "Teacher", text: "I send you on a quest for extra credit! MC!!!" },
        { name: "Hero", text: "Extra credit, ill do anything for extra credit!" }, { name: "Teacher", text: "Go home wise student and gather your items to conquer AI!" }], background: ('scene/2.png')
    },

    { hasdialague: false, playerY: 550, background: ('scene/3.png') },

    { sceneID: "Home2", playerY: 0, LookAt: "left", triggerPoint: 600, hasdialague: true, dialague: [{ name: "TV", text: "Air Line (67 + 67)/67 to AI military base." }], background: ('img/Medium-start.png') },

    { hasdialague: false,playerY: 515, background: ('scene/5.png') },

    { hasdialague: false,playerY: 400, background: ('scene/6.png') },

    { hasdialague: false, background: ('scene/7.png') },

    { hasdialague: false, background: ('scene/9.png') },

    { sceneID: "airplane", playerY: 0, triggerPoint: 700, hasdialague: true, dialague: [{ name: "soldier", text: "Follow me to base, theirs incoming fire." }], background: ('scene/8.png') },

    {
        sceneID: "warehouse1", playerY: 0, LookAt: "left", triggerPoint: 800, hasdialague: true, dialague: [{ name: "soldier", text: "We need the secret weapon." }, { name: "Hero", text: "No it’s too dangerous." },
        { name: "soldier", text: "The ENERGY SWORD" }, { name: "Hero", text: "Sure." },
        { name: "soldier", text: "It was separated to two warehouses." }, { name: "Hero", text: "Will I get more extra credit?" }], background: ('scene/14.png')
    },

    { combatmode: true, hasdialague: false, background: ('scene/16.png') },

    { sceneID: "warehouse1", LookAt: "left", triggerPoint: 800, combatmode: false, hasdialague: true, dialague: [{ name: "soldier", text: "Go to the second company, and retrive the piece!" }, { name: "Hero", text: "okay." }], background: ('scene/17.png') },

    { combatmode: true, hasdialague: false, background: ('scene/18.png') },

    { sceneID: "warehouse1",playerY: 0, combatmode: false, hasdialague: true, dialague: [{ name: "soldier", text: "Now go you need to do some coding" }, { name: "Hero", text: "Okay!" }], background: ('scene/20.png') },

    { combatmode: true, hasdialague: false, background: ('scene/21.png') },

    { combatmode: true, hasdialague: false, background: ('scene/21.png') },

    { sceneID: "airplane", playerY: 0, triggerPoint: 900, hasdialague: true, dialague: [{ name: "soldier", text: "Goodbye, Thank you." }], background: ('scene/8.png') }
]
function changeBackground() {
    document.getElementById("Background").addEventListener('click', function () {
        levelIndex++;
        posX = 0;
        player.style.left = posX + "px";
        document.body.style.backgroundImage = "url('" + currentLevel[levelIndex].background + "')";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
        document.body.className = currentLevel[levelIndex].sceneID;
        Arrow.style.display = "none";
        hasTalked = false;    
        setSceneY();
        if (currentLevel[levelIndex].combatmode) {
            Emoving();
        }
    });
}

function setSceneY(){
    // let scene = currentLevel.find(level => level.sceneID === sceneID);
    console.log('SceneY Called');
    if(currentLevel[levelIndex].playerY) {
        console.log(currentLevel[levelIndex].playerY);
        player.style.top = currentLevel[levelIndex].playerY + 'px';
    }
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
    if (e.code === 'KeyS') {
        isPlayerShieldActive = true;
        Psheild.style.display = "block";
    }
}
const PshieldKeyup = (e) => {
    isPlayerShieldActive = false;
    Psheild.style.display = "none";
}
//------Combatmode System ------------------------// 

const Efacing = () => {
    if (currentLevel[levelIndex].combatmode) {
        enemy.style.display = "block";

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
                    playerHP = playerHP - 20;
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

    }  else {
        enemy.style.display = "none";
    }
    if (currentLevel[levelIndex].hasdialague === true) {
        if (posX > currentLevel[levelIndex].triggerPoint && isTalking === false && hasTalked === false) {
            isTalking = true;
            A = false; D = false;
            textswap();  
        }    
    } else if (posX > window.innerWidth - 275) {
        Arrow.style.display = "block";
    }
    requestAnimationFrame(Efacing);
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
