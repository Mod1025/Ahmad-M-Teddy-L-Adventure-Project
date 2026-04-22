const charc = document.getElementById("player");

/* Globle Varables*/ 
let D = false;
let A = false;
let space = false;
let speed = 5;
let posX = 0;
let posY = 0;
let gravity = 0.8;
let velocity = 5;

// moving function //
const e = (event) => {

    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
        A = true
    } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
        D = true
    } else if (event.code === 'Space' || event.code === 'ArrowUp') {
        space = true
    }
}


// Stop moving function // 
const Stopmoving = () => {
    A = false
    D = false
}
// Moving function //
const moving = () => {

    const Jump = posY = gravity += velocity;
    if (A === true && posX > 0) {
        charc.style.left = (posX = posX - speed) + "px";
        charc.style.transform = "scaleX(-1)";
    } else if (D === true && posX < window.innerWidth - 220) {
        charc.style.left = (posX = posX + speed) + "px";
        charc.style.transform = "scaleX(1)";
    }

    requestAnimationFrame(moving);
}



moving()

window.addEventListener('keydown', e );
window.addEventListener('keyup', Stopmoving);



