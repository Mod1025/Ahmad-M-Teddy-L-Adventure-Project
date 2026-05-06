const Chooses = document.getElementById("Main-Container")
const Question = document.getElementById("Q")

let Q = [
    {Q: "Follow me"}
]
let A = [
    "yes", "No", "Ask For Help"
]
const Create = () => {
    Chooses.innerHTML = "";
    A.forEach(button => {
      const btn = document.createElement("button");
      btn.className = "button"
      btn.textContent = button
      
      
      Chooses.appendChild(btn);

      btn.addEventListener( "click", () => {
        Chooses.innerHTML = "";

        if ( btn.textContent ==="yes") {
            Question.textContent = "You signaled for backup! A drone is arriving"
        } else if (btn.textContent === "No" ) {
            Question.textContent = "Okay do whatever"
        } else if (btn.textContent === "Ask For Help") {
            Question.textContent = "Help on the way!"
        }
      })
    });
}

window.addEventListener("keypress", (e) => {
    if (e.key === 'Enter') {
        Create();
    }
})