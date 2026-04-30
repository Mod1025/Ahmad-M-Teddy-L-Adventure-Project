const charc = document.getElementById("player");
const bubbles = document.getElementById("bubbles");
const text =  document.getElementById("text-content");
/* Globle Varables*/ 
let D = false;
let A = false;
let speed = 5;
let posX = 0;
let posY = 0;
let content = ["hi!", "Nice day.", "bye!"];
let count = 0;
let isTalking = false;
let hasTalked = false;
let levelIndex = 0;

// moving function //
const e = (event) => {

    if ((event.code === 'KeyA' || event.code === 'ArrowLeft') && isTalking === false) {
        A = true
    } else if ((event.code === 'KeyD' || event.code === 'ArrowRight') && isTalking === false) {
        D = true
    } else if (event.code === 'Enter' && isTalking === true) {
        if (content.length <= count + 1) {
            cleanup();
        } else {
            count++;
            text.innerText = content[count];
        }
    }
}

const cleanup = () => {
    bubbles.style.display = "none";
    isTalking = false;
    count = 0
    A = false;
    D = false;
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

const GateKeeper = () => {
    
    if (posX > currentLevel[levelIndex].triggerPoint && isTalking === false && hasTalked === false) {
        isTalking = true;
        A = false;
        D = false;
        bubbles.style.display = "block"
        text.textContent = content[count];
        hasTalked = true;
    }

    requestAnimationFrame(GateKeeper);
}
// let backgrounds = ['url('scene/goCollage.png')','url('scene/collage.png')','url('scene/gohmfromcg.png')','url('scene/.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')',
//     'url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')',
//     'url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')',
//     'url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')','url('scene/castle.png')',
// ]
function changeBackground() {
    let background = document.querySelector('body');
    background.addEventListener('click', function() {
      // 3. The value must be a string: "url('path/to/image.png')"
    document.body.style.backgroundImage = "url('scene/goCollage.png')",;
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover"; // Adds the full-screen fit
    });
  }

changeBackground();
GateKeeper()
moving()
window.addEventListener('keydown', e );
window.addEventListener('keyup', Stopmoving);
