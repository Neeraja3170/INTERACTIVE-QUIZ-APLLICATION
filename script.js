let currentQuestionIndex = 0;
let score = 0;
let questions = [];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options-container");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");
const progressBar = document.getElementById("progress-bar");
const restartButton = document.getElementById("restart-button");

// Fetch questions from the JSON file
fetch("questions.json")
  .then((response) => response.json())
  .then((data) => {
    questions = shuffleArray(data); // Shuffle questions
    loadQuestion();
  });

// Shuffle array function
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Load a question
function loadQuestion() {
  const currentQuestion = questions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach((option) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.classList.add("option");
    button.addEventListener("click", () => selectAnswer(option));
    optionsContainer.appendChild(button);
  });

  updateProgressBar();
}

// Handle answer selection
function selectAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.answer) {
    score++;
    scoreElement.textContent = score;
  }
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    endQuiz();
  }
}

// Update progress bar
function updateProgressBar() {
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// End the quiz
function endQuiz() {
  questionElement.textContent = "Quiz Completed!";
  optionsContainer.innerHTML = "";
  nextButton.style.display = "none";
  restartButton.style.display = "block"; // Show restart button
}

// Next button functionality
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  }
});

// Restart button functionality
restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  scoreElement.textContent = score;
  questions = shuffleArray(questions); // Shuffle questions again
  nextButton.style.display = "block";
  restartButton.style.display = "none";
  loadQuestion();
});