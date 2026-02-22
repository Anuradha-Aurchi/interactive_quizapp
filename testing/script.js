const questions = [
    
    {
        question:"Who is the author of the book “Harry Potter and the Philosopher’s Stone”?",
        answers: [
            
            {text:"J.R.R. Tolkien", correct: false},
            {text:"J.K. Rowling", correct: true},
            {text:"George R.R. Martin", correct: false},
            {text:"Roald Dahl", correct: false}
        ]
    },
    {
        question:"Which book is considered the best-selling book of all time?",
        answers: [
            
            {text:"Harry Potter series", correct: true},
            {text:"The Alchemist", correct: false},
            {text:"The Bible", correct: false},
            {text:"A Room Of One's Own", correct: false}
        ]
    },
    {
        question:"What is the main purpose of a table of contents in a book?",
        answers: [
            
            {text:"To explain the story", correct: false},
            {text:"To list characters", correct: false},
            {text:"To show chapter titles and page numbers", correct: true},
            {text:"To give author details", correct: false}
        ]
    },
    {
        question:"Which genre does the book “The Metamorphosis” by Franz Kafka belong to?",
        answers: [
            
            {text:"Romance", correct: false},
            {text:"Science Finction", correct: false},
            {text:"Fantasy", correct: false},
            {text:"Existential Fiction", correct: true}
        ]
    },
    {
        question:"What do we call a book that tells the life story of a person written by someone else?",
        answers: [
            
            {text:"Autobiography", correct: false},
            {text:"Fiction", correct: false},
            {text:"Biography", correct: true},
            {text:"Memoir", correct: false}
        ]
    }

];


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-button");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  questionElement.innerHTML = currentQuestion.question;

  currentQuestion.answers.forEach(answer => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }

    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";

  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("wrong");
  }

  Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });

  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}! 🎉`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}


nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();