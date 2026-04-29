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
    document.body.style.backgroundImage = "url('scene/goCollage.png')";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundAttachment = "fixed";
    document.body.style.backgroundSize = "cover"; // Adds the full-screen fit
    });
  }

<<<<<<< Updated upstream
changeBackground();
=======
/////
 
let currentLevel = [
    {triggerPoint: 400, dialague:[{name: "TV", text: "AI robots are taking over the world."}, {name: "Hero", text: "Its 7:55 I should head to collage."}], background: ('img/Medium-start.png')},

    {triggerPoint: 500, dialague: [{name: "Teacher", text: "AI is taking over the world I cant help since im too old."}, {name: "Teacher", text: "I send you on a quest for extra credit! MC!!!"}, 
    {name: "Hero", text:"Extra credit, ill do anything for extra credit!"}, {name: "Teacher", text: "Go home wise student and gather your items to conquer AI!"}], background: ('scene/collage.png')},

    {triggerPoint: 600, dialague:[{name: "TV", text: "Air Line (67 + 67)/67 to AI military base."}], background: ('img/Medium-start.png')},

    {triggerPoint: 700, dialague:[{name: "soldier", text: "Follow me to base, theirs incoming fire."}], background: ('scene/landPlane.png')},

    {triggerPoint: 800, dialague:[{name: "soldier", text: "We need the secrete weapon."}, {name: "Hero", text: "No it’s too dangerous."}, 
    {name: "soldier", text: "The ENERGY SWORD"}, {name: "Hero", text: "Sure."},
    {name: "soldier", text: "It was separated to two warehouses."},{name: "Hero", text: "Will I get more extra credit?"}], background: ('scene/2ndmili.png')},

    {triggerPoint: 900, dialague:[{name: "soldier", text: "Goodbye, Thank you."}], background: ('scene/Plane-wrong.png')}

]

>>>>>>> Stashed changes
GateKeeper()
moving()
window.addEventListener('keydown', e );
window.addEventListener('keyup', Stopmoving);
