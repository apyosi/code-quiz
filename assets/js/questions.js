const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correct: 2,
  },
  {
    question:
      "The condition in an if/else statement is enclosed within _______.",
    answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correct: 2,
  },
  {
    question: "Arrays in JavaScript can be used to store:",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correct: 3,
  },
  {
    question:
      "String values must be enclosed within ______ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correct: 2,
  },
  {
    question:
      "A very useful tool used during development and debugging for printing content to the debuger is",
    answers: ["JavaScript", "terminal / bash", "for loops", "console.log"],
    correct: 3,
  },
];

const divStartScreen = document.querySelector("#start-screen");
const buttonStart = document.querySelector("#start");
const divQuestions = document.querySelector("#questions");
const h2Question = document.querySelector("#question-title");
const divChoices = document.querySelector("#choices");
const spanTime = document.querySelector("#time");
const divEndScreen = document.querySelector("#end-screen");
const spanFinalScore = document.querySelector("#final-score");
const inputInitials = document.querySelector("#initials");
const buttonSubmit = document.querySelector("#submit");
const divFeedback = document.querySelector("#feedback");

let questionIndex = 0;
let countdownTimer = 0;
var intervalId;
let orderList = document.createElement("ol");
divChoices.appendChild(orderList);
let ol = document.querySelector("ol");

// function eventt(ev) {
//   let element = ev.target;
//   element.matches
// }

ol.addEventListener("click", function (event) {
  let element = event.target;
  if (element.matches("button")) {
    let state = element.getAttribute("data-state");
    if (state == questions[questionIndex].correct) {
      message("Correct!");
    } else {
      message("Wrong!");
      countdownTimer -= 15;
      console.log(countdownTimer);
    }
    questionIndex++;
    ol.textContent = "";
    getQuestion(questionIndex);
  }
});

function startQuiz() {}
function message(string) {
  console.log(string);
  let p1 = document.createElement("p");
  p1.textContent = string;
  divChoices.appendChild(p1);
  let clearId = setInterval(function () {
    p1.textContent = "";
    console.log(p1.textContent = "");
    setTimeout(function() {
    clearInterval(clearId);
    },1000)
  }, 1000)
}

function startCountdown() {
  countdownTimer = 60;
  spanTime.textContent = countdownTimer;
  let intervalId = setInterval(function () {
    countdownTimer--;
    spanTime.textContent = countdownTimer;
    console.log(countdownTimer);
    if (countdownTimer > 0 && questionIndex >= questions.length) {
      clearInterval(intervalId);
      spanTime.textContent = countdownTimer;
      divQuestions.setAttribute("class", "hide");
      divEndScreen.setAttribute("class", "start");
      spanFinalScore.textContent = countdownTimer;
    }
    if (countdownTimer <= 0) {
      clearInterval(intervalId);
      spanTime.textContent = countdownTimer;
      divQuestions.setAttribute("class", "hide");
      divEndScreen.setAttribute("class", "start");
      spanFinalScore.textContent = countdownTimer;

    }

  }, 1000);
}

function stopCoundown() {
  // clearInterval(intervalId);
}

function getQuestion(index) {
  if (index < questions.length) {
    h2Question.textContent = questions[index].question;
    console.log(index);
    console.log(questions.length);
    for (let i = 0; i < questions[index].answers.length; i++) {
      let li = document.createElement("li");
      let selectOlist = document.querySelector("ol");
      selectOlist.appendChild(li);
      let buttonAnswer = document.createElement("button");
      buttonAnswer.setAttribute("data-state", i);
      buttonAnswer.textContent = questions[index].answers[i];
      li.appendChild(buttonAnswer);
    } 
  } else {
    h2Question.textContent = "";
  }
}

buttonStart.addEventListener("click", function () {
  startCountdown();
  // divStartScreen.classList.remove("start");
  // divStartScreen.classList.add("hide");
  divStartScreen.setAttribute("class", "hide");
  divQuestions.setAttribute("class", "");
  getQuestion(questionIndex);
});



let highscore = JSON.parse(localStorage.getItem("scores")) || [
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
buttonSubmit.addEventListener("click", function (event) {
  event.preventDefault;
  let initalStore = inputInitials.value;
  let currentScore = {
    initial: initalStore,
    score: countdownTimer
  }
  highscore.push(currentScore);
  console.log(currentScore);
  highscore.sort(function (a, b) {
    // return a.score + b.score;
    if( a.score > b.score ){
      return -1;
  }

  if( a.score == b.score ){
      return 0;
  }

  if( a.score < b.score ){
      return 1;
  }
  });
  localStorage.setItem("scores", JSON.stringify(highscore));
  document.location.assign("highscores.html");
 
})

/* 
    A start button that when clicked a timer starts and the first question appears.
      -Event listener on click
      -Start countdown (function with setInterval)
      -hide start div (setAttribute class hide)
      -show questions div (setAttribute class remove hide)
    Questions contain buttons for each answer.
      -show the 1st question with the possible answers(loop the questions) createElement, set contentText  
    When answer is clicked, the next question appears
      -on clic of some answer(move to next question)
      -If the answer clicked was incorrect then subtract time from the clock(penalty 15 sec),show message 
      -if answer is correct, show message 
    The quiz should end when all questions are answered or the timer reaches 0. 
    When the game ends, it should display their score and give the user the ability to save their initials and their score 
*/
