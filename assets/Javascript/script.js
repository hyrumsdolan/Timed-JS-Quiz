const startButton = document.getElementById("start-btn");
const timerDisplay = document.getElementById("time-left");
let totalSeconds = document.getElementById("time-left").textContent; // Seconds are nabbed from the html
let timeInterval;

//Questions as an array of Objects
const questions = [
  {
    question: "This is question text 1",
    answers: [
      { text: "1a", correct: false },
      { text: "1b", correct: false },
      { text: "1c", correct: true },
      { text: "1d", correct: false },
    ],
  },
  {
    question: "This is question text 2",
    answers: [
      { text: "2a", correct: false },
      { text: "2b", correct: true },
      { text: "2c", correct: false },
      { text: "2d", correct: false },
    ],
  },
  {
    question: "True or False?",
    answers: [
      { text: "True", correct: false },
      { text: "False", correct: true },
    ],
  },
];

//QUESTION CODE
let currentQuestionIndex = 0;

function showQuestion(questionIndex) {
  const questionObj = questions[questionIndex];
  const questionElement = document.getElementById("question");
  const answerButtonsElement = document.getElementById("answer-buttons");

  // Clear previous buttons' event listeners
  answerButtonsElement.innerHTML = "";

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
    console.log("Correct!");
    trutherElement.classList.add('correct');
    trutherElement.textContent = "Correct!";
  } else {
    console.log("Wrong!");
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


//TIMER CODE
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
  totalSeconds = document.getElementById("time-left").textContent;
  updateTimerDisplay(totalSeconds);
  startTimer();
  showQuestion(currentQuestionIndex);
  document.getElementById("question-container").classList.remove("hide");
  document.getElementById("question-feedback").classList.remove("hide")
  document.getElementById("intro").classList.add("hide");
}

function endQuiz() {
  updateTimerDisplay(totalSeconds)
  clearInterval(timeInterval);
  document.getElementById("question-container").classList.add("hide");
  document.getElementById("game-over-container").classList.remove("hide");
}

startButton.addEventListener("click", startQuiz);
