const charc = document.getElementById("player");

/* Globle Varables*/ 
let D = false;
let A = false;
let speed = 5;
let posX = 0;

// moving function //
const e = (event) => {

    if (event.code === 'KeyA') {
        A = true
    } else if (event.code === 'KeyD') {
        D = true
    } 
}
// Stop moving function // 
const Stopmoving = () => {
    A = false
    D = false
}
// Moving function //
const moving = () => {

    if (A === true) {
        charc.style.left = (posX = posX - speed) + "px";
    } else if (D === true) {
        charc.style.left = (posx = posX + speed) + "px";
    }
    requestAnimationFrame(moving);
}

moving()

window.addEventListener('keydown', e );
window.addEventListener('keyup', Stopmoving);



