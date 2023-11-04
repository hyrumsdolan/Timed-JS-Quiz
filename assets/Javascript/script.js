// Get the HTML elements
const startButton = document.getElementById("start-btn");
const timerDisplay = document.getElementById("time-left");
let totalSeconds = document.getElementById("time-left").textContent; // Seconds are nabbed from the html
let timeInterval;

function updateTimerDisplay(seconds) {
  timerDisplay.textContent = seconds;
}

function startTimer() {
  timeInterval = setInterval(function () {
    totalSeconds--;
    updateTimerDisplay(totalSeconds);

    if (totalSeconds <= 0) {
      clearInterval(timeInterval);
      endQuiz();
    }
  }, 1000);
}

function startQuiz() {
  startButton.classList.add("hide");
  totalSeconds = document.getElementById("time-left").textContent;
  updateTimerDisplay(totalSeconds);
  startTimer();
  document.getElementById("question-container").classList.remove("hide");
}

function endQuiz() {
  clearInterval(timeInterval);
  document.getElementById("question-container").classList.add("hide");
  document.getElementById("game-over-container").classList.remove("hide");
}

startButton.addEventListener("click", startQuiz);
