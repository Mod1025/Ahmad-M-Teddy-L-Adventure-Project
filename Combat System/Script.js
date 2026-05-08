const player = document.getElementById("player");
const enemy = document.getElementById("enemy");
const Psheild = document.getElementById("PShield");
const Esheild = document.getElementById("EShield");
const PHealth = document.getElementById("player-inner-Line");
const EHealth = document.getElementById("enemy-inner-Line");
const bullet = document.getElementById("Bullet");
const PBullet = document.getElementById("PBullet");

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
// start positions styling // 
player.style.left = posX + "px";
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
    isEnemyShieldActive = false;
}
const Efacing = () => {

    if (moving === true) {
        if (Math.abs(enemyX - traget) < enemySpeed) {
           enemyX = traget
           enemy.style.left = enemyX + "px";
           moving = "waiting";
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
    requestAnimationFrame(Efacing);  
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
    let rshield = Math.floor(Math.random() * (max - min) - min)
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
    if (isPBulletActive === false && isPlayerShieldActive === false) {
    PBulletX = posX;
    PBullet.style.display = "block";
    PBullet.style.top = 900 + "px";
    isPBulletActive = true;  
    }
   
}
// Player shield system //

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