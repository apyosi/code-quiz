const selectOlist = document.querySelector("ol");
let highscore = JSON.parse(localStorage.getItem("scores")) || [];
for (let i = 0; i < highscore.length; i++) {
  let li = document.createElement("li");
  selectOlist.appendChild(li);
  // p = document.createElement("div")
  li.textContent = `${highscore[i].initial} (${highscore[i].score}) points`;
  // li.appendChild(p);
}

let clearButton = document.querySelector("#clear");
clearButton.addEventListener("click", () => {
  localStorage.removeItem("scores");
  selectOlist.textContent = "";
  // window.location.reload();
});

/*function to create scores for testing purpouse

let test = [
  { initial: "ss", score: 56 },
  { initial: "APY", score: 54 },
  { initial: "vv", score: 38 },
  { initial: "bb", score: 31 },
  { initial: "dd", score: 8 },
  { initial: "vv", score: 7 },
  { initial: "aa", score: 5 },
  { initial: "nn", score: -8 },
  { initial: "mm", score: -14 },
];

function add() {
  setTimeout(()=> {
    localStorage.setItem("scores", JSON.stringify(test));
    
  },1000)
} 

*/
