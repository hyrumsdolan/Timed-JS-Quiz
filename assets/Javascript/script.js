const startButton = document.getElementById("start-btn");
const timerDisplay = document.getElementById("time-left");
let totalSeconds = document.getElementById("time-left").textContent;
let timeInterval;

const questions = [
  {
    question: "What is the correct JavaScript syntax to output 'Hello World' to the console?",
    answers: [
      { text: "console.log('Hello World');", correct: true },
      { text: "echo('Hello World');", correct: false },
      { text: "print('Hello World');", correct: false },
      { text: "console.output('Hello World');", correct: false },
    ],
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    answers: [
      { text: "*", correct: false },
      { text: "-", correct: false },
      { text: "=", correct: true },
      { text: "x", correct: false },
    ],
  },
  {
    question: "What will typeof null return?",
    answers: [
      { text: "\"object\"", correct: true },
      { text: "\"null\"", correct: false },
      { text: "\"undefined\"", correct: false },
      { text: "\"error\"", correct: false },
    ],
  },
  {
    question: "How do you create a function in JavaScript?",
    answers: [
      { text: "function = myFunction()", correct: false },
      { text: "function:myFunction()", correct: false },
      { text: "function myFunction()", correct: true },
      { text: "create myFunction()", correct: false },
    ],
  },
  {
    question: "How can you convert the string of any base to integer in JavaScript?",
    answers: [
      { text: "int('string')", correct: false },
      { text: "Integer.parse('string')", correct: false },
      { text: "parseInt('string')", correct: true },
      { text: "Number('string')", correct: false },
    ],
  },
  {
    question: "Which event occurs when the user clicks on an HTML element?",
    answers: [
      { text: "onchange", correct: false },
      { text: "onclick", correct: true },
      { text: "onmouseclick", correct: false },
      { text: "onmouseover", correct: false },
    ],
  },
  {
    question: "How do you declare a JavaScript variable?",
    answers: [
      { text: "variable carName;", correct: false },
      { text: "var carName;", correct: true },
      { text: "v carName;", correct: false },
      { text: "carName;", correct: false },
    ],
  },
  {
    question: "Which operator is used to compare both value and type?",
    answers: [
      { text: "==", correct: false },
      { text: "=", correct: false },
      { text: "===", correct: true },
      { text: "!=", correct: false },
    ],
  },
  {
    question: "What will the following code return: Boolean(10 > 9)",
    answers: [
      { text: "true", correct: true },
      { text: "false", correct: false },
      { text: "\"true\"", correct: false },
      { text: "\"false\"", correct: false },
    ],
  },
  {
    question: "The external JavaScript file must contain the <script> tag.",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
  }
];


let currentQuestionIndex = 0;

function showQuestion(questionIndex) {
  const questionObj = questions[questionIndex];
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");

  answerButtonsElement.innerHTML = "";

  if (currentQuestionIndex > 0 && currentQuestionIndex < questions.length) {
    document.getElementById("question-feedback").classList.remove('hide');
  }
  else {
    document.getElementById("question-feedback").classList.add('hide');
  }

  questionElement.textContent = questionObj.question;

  questionObj.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer.text;
    button.classList.add("btn");
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerButtonsElement.appendChild(button);
  });
}



function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  const trutherElement = document.getElementById("truther");
  const timerElement = document.getElementById("timer");

  trutherElement.classList.remove('correct', 'wrong');
  timerElement.classList.remove('flash-wrong');

  if (correct) {
    trutherElement.classList.add('correct');
    trutherElement.textContent = "Correct!";
  } else {
    totalSeconds -= 5;
    updateTimerDisplay(totalSeconds);
    trutherElement.classList.add('wrong');
    trutherElement.textContent = "Wrong, minus 5 seconds...";
    timerElement.classList.remove('flash-wrong');
    void timerElement.offsetWidth;
    timerElement.classList.add('flash-wrong');
  
    setTimeout(() => {
      timerElement.classList.remove('flash-wrong');
    }, 500);
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion(currentQuestionIndex);
  } else {
    endQuiz();
  }
}

function updateTimerDisplay(seconds) {
  timerDisplay.textContent = seconds;
}

function startTimer() {
  timeInterval = setInterval(function () {
    totalSeconds--;
    updateTimerDisplay(totalSeconds);

    if (totalSeconds <= 0) {
      endQuiz();
    }
  }, 1000);
}

function startQuiz() {
  startButton.classList.add("hide");

  totalSeconds = 60;
  currentQuestionIndex = 0;
  updateTimerDisplay(totalSeconds);
  startTimer();
  const answerButtons = document.querySelectorAll("#answer-buttons button");
  answerButtons.forEach(button => {
    button.classList.remove('selected');
    button.removeAttribute('data-selected');
  });
  showQuestion(currentQuestionIndex);
  document.getElementById("question-container").classList.remove("hide");
  document.getElementById("intro").classList.add("hide");
  document.getElementById("final-score").textContent = "";
}

function saveScore(initials, score) {
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  const newScore = { initials, score };
  highscores.push(newScore);
  highscores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highscores", JSON.stringify(highscores));
}

function showScoreboard() {
  const highscores = JSON.parse(localStorage.getItem("highscores")) || [];
  const scoreList = document.getElementById("score-list");
  document.getElementById("game-over-container").classList.add("hide")
  scoreList.innerHTML = "";
  highscores.forEach(score => {
    const li = document.createElement("li");
    li.textContent = `${score.initials} - ${score.score}`;
    scoreList.appendChild(li);
  });
  document.getElementById("scoreboard-container").classList.remove("hide");
}

document.getElementById("score-form").addEventListener("submit", function(event) {
  event.preventDefault();
  const initials = document.getElementById("initials").value;
  saveScore(initials, totalSeconds);
  showScoreboard();
});

document.getElementById("retry-btn").addEventListener("click", function() {
  document.getElementById("scoreboard-container").classList.add("hide");
  let currentQuestionIndex = 0;
  startQuiz();
});

document.getElementById("clear-scores-btn").addEventListener("click", function() {
  localStorage.removeItem("highscores");
  showScoreboard();
});

function endQuiz() {
  updateTimerDisplay(totalSeconds);
  clearInterval(timeInterval);
  document.getElementById("question-container").classList.add("hide");
  document.getElementById("game-over-container").classList.remove("hide");
}

startButton.addEventListener("click", startQuiz);
