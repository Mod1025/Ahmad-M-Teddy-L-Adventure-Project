/* Globle Varables*/ 
let D = false;
let A = false;

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

let speed = 5;
let posX = 0;

if (D) {
    posX = posX + speed
} else if (A) {
    posX = posX - speed
};

window.addEventListener('keydown', e );
window.addEventListener('keyup', Stopmoving);



