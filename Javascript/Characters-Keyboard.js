const charc = document.getElementById("player");
const bubbles = document.getElementById("bubbles");
const text =  document.getElementById("text-content");
const npcbubbles = document.getElementById("npc-bubbles");
const npctext = document.getElementById("npctext"); 
const Arrow = document.getElementById("Background");

/* Globle Varables*/ 
let D = false;
let A = false;
let speed = 5;
let posX = 0;
let posY = 0;
let count = 0;
let isTalking = false;
let hasTalked = false;
let levelIndex = 0;

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
        charc.style.left = (posX = posX - speed) + "px";
        charc.style.transform = "scaleX(-1)";
    } else if (D === true && posX < window.innerWidth - 245 && isTalking === false) {
        charc.style.left = (posX = posX + speed) + "px"; 
        charc.style.transform = "scaleX(1)";
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
    if(currentLevel[levelIndex].hasdialague === true) {
    if (posX > currentLevel[levelIndex].triggerPoint && isTalking === false && hasTalked === false) {
        isTalking = true;
        A = false;
        D = false;
        text.innerText = currentLevel[levelIndex].dialague[count].text;
        hasTalked = true;
        count = 0;
        textswap();  
    }    
   } else if (currentLevel[levelIndex].hasdialague === false){
        if (posX > window.innerWidth - 275) {
           Arrow.style.display = "block";
        }
    }
    
}
let currentLevel = [
    {sceneID: "Home", triggerPoint: 1400, hasdialague: true, dialague:[{name: "TV", text: "AI robots are taking over the world."}, {name: "Hero", text: "Its 7:55 I should head to collage."}], background: ('img/Medium-start.png')},

    { sceneID: "way-college", hasdialague: false, background: ('scene/1.png')},

    {sceneID: "classroom", triggerPoint: 850, hasdialague: true, dialague: [{name: "Teacher", text: "AI is taking over the world I cant help since im too old."}, {name: "Teacher", text: "I send you on a quest for extra credit! MC!!!"}, 
    {name: "Hero", text:"Extra credit, ill do anything for extra credit!"}, {name: "Teacher", text: "Go home wise student and gather your items to conquer AI!"}], background: ('scene/2.png')},

    {hasdialague: false, background: ('scene/3.png')},

    {sceneID: "Home2", triggerPoint: 600, hasdialague: true, dialague:[{name: "TV", text: "Air Line (67 + 67)/67 to AI military base."}], background: ('img/Medium-start.png')},

    {hasdialague: false, background: ('scene/5.png')}, 

    {hasdialague: false, background: ('scene/6.png')},

    {hasdialague: false, background: ('scene/7.png')},

    {hasdialague: false, background: ('scene/9.png')},

    {sceneID: "airplane", triggerPoint: 700, hasdialague: true, dialague:[{name: "soldier", text: "Follow me to base, theirs incoming fire."}], background: ('scene/8.png')},

    {sceneID: "warehouse1", triggerPoint: 800, hasdialague: true, dialague:[{name: "soldier", text: "We need the secret weapon."}, {name: "Hero", text: "No it’s too dangerous."}, 
    {name: "soldier", text: "The ENERGY SWORD"}, {name: "Hero", text: "Sure."},
    {name: "soldier", text: "It was separated to two warehouses."},{name: "Hero", text: "Will I get more extra credit?"}], background: ('scene/14.png')},

    {combatmode: true, hasdialague: false, background: ('scene/16.png')},

    {sceneID: "warehouse1", triggerPoint: 800, combatmode: false, hasdialague: true, dialague: [{name: "soldier", text: "Go to the second company, and retrive the piece!"}, {name: "Hero", text: "okay."}],background: ('scene/17.png')},

    {combatmode: true, hasdialague: false, background: ('scene/18.png')},

    {sceneID: "warehouse1", combatmode: false, hasdialague: false, background: ('scene/20.png')},

    {combatmode: false, hasdialague: false, background: ('scene/21.png')}, 

    {combatmode: true, hasdialague: false, background: ('scene/21.png')}, 

    {sceneID: "airplane", triggerPoint: 900, hasdialague: true, dialague:[{name: "soldier", text: "Goodbye, Thank you."}], background: ('scene/8.png')}

]
function changeBackground() {
    document.getElementById("Background").addEventListener('click', function() {
        levelIndex++;
        posX = 0;
        charc.style.left = posX + "px"; 
        document.body.style.backgroundImage = "url('" + currentLevel[levelIndex].background + "')";
        document.body.style.backgroundPosition = "center";
        document.body.style.backgroundRepeat = "no-repeat";
        document.body.style.backgroundAttachment = "fixed";
        document.body.style.backgroundSize = "cover";
        document.body.className = currentLevel[levelIndex].sceneID;
        Arrow.style.display = "none";
        hasTalked = false;
    });
}
const inventory = document.getElementById('inventory-overlay');

document.addEventListener('keydown', (event) => {
    if (event.key === 'm' || event.key === 'M') {
        inventory.classList.toggle('hidden');
    }
});


changeBackground();
GateKeeper();
moving();
window.addEventListener('keydown', e); 
window.addEventListener('keyup', Stopmoving);