const charc = document.getElementById("player");

/* Globle Varables*/ 
let D = false;
let A = false;
let speed = 5;
let posX = 0;
let posY = 0;

// moving function //
const e = (event) => {

    if (event.code === 'KeyA' || event.code === 'ArrowLeft') {
        A = true
    } else if (event.code === 'KeyD' || event.code === 'ArrowRight') {
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


    if (A === true && posX > 0 && isTalking === false) {
        charc.style.left = (posX = posX - speed) + "px";
        charc.style.transform = "scaleX(-1)";
    } else if (D === true && posX < window.innerWidth - 245 && isTalking === false) {
        charc.style.left = (posX = posX + speed) + "px"; 
        charc.style.transform = "scaleX(1)";
    }

    requestAnimationFrame(moving);
}



moving()

window.addEventListener('keydown', e );
window.addEventListener('keyup', Stopmoving);

///////////////////////////////////////////////////////////////////////////////////

let content = ["hi!, Nice day.", "bye!"];
let count = 0;
let isTalking = false;