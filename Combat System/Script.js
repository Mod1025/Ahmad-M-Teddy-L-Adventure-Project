const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const Esheild = document.getElementById("Shield");
const PHealth = document.getElementById("player-inner-Line");
const EHealth = document.getElementById("enemy-inner-Line");

//Main vars //
let playerHP = 100;
let enemyHP = 100;
let D = false;
let A = false;
let speed = 10;
let posX = 0;
let posY = 0;
// Shooting vars // 
let bulletX = -100;
let isBulletActive = false;
let bulletSpeed = 10;
// player start point //
let playerX = 0

// enemy movement vars //
let enemyX = window.innerWidth - 200;
let enemySpeed = 5;
let isShieldActive = false;
// start positions styling // 
player.style.left = playerX + "px";
enemy.style.left = enemyX + "px";

// enemy movement fuction //
let traget = 0;
let moving = false; 
let max = window.innerWidth / 2;
let min = window.innerWidth - 200;
const Emoving = () => {
    let des = Math.floor(Math.random() * (max - min) + min)
    if (Math.abs(enemyX - des) < 200) {
       Emoving();
       return;
    } else {
        traget = des;
    }   
    moving = true;
}
const Efacing = () => {
    if (Math.abs(enemyX - traget) < enemySpeed) {
        enemyX = traget
        moving = "timerStarted"
    } 
    if (moving === true) {
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
    if (moving === "timerStarted") {
            setTimeout(() => Emoving(), 100) 
            moving = true;
        }
    
    requestAnimationFrame(Efacing);  
}

// Player movement // 
const e = (event) => {

    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
        A = true
    } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
        D = true
    }
}

const Stopmoving = () => {
    A = false
    D = false
}

const Pmoving = () => {
if (A === true && posX > 0) {
    player.style.left = (posX = posX - speed) + "px";
    player.style.transform = "scaleX(1)";
} else if (D === true && posX < window.innerWidth - 245) {
    player.style.left = (posX = posX + speed) + "px"; 
    player.style.transform = "scaleX(-1)";
}

requestAnimationFrame(Pmoving);
}

// Enemy shooting System // 



Pmoving();
Emoving();
Efacing();
window.addEventListener('keydown', e); 
window.addEventListener('keyup', Stopmoving);