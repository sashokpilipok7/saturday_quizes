const questions = [
    {
        question: "Яка планета є третьою від Сонця?",
        answers: ["Марс", "Венера", "Земля", "Юпітер"],
        correct: 2
    },
    {
        question: "Який тег в HTML використовується для створення посилань?",
        answers: ["<link>", "<a>", "<href>", "<p>"],
        correct: 1
    },
    {
        question: "Чому дорівнює прискорення вільного падіння на Землі (g)?",
        answers: ["~9.8 м/с²", "~5.5 м/с²", "~12 м/с²", "~0 м/с²"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 15;
let timerInterval;

const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');

const startBtn = document.getElementById('start-btn');
const restartBtn = document.getElementById('restart-btn');

const questionText = document.getElementById('question-text');
const answersContainer = document.getElementById('answers-container');
const timerDisplay = document.getElementById('timer');
const scoreDisplay = document.getElementById('score-display');
const resultText = document.getElementById('result-text');

console.log(startBtn, 'startBtn')
console.log(restartBtn, 'restartBtn')
startBtn.addEventListener('click', startQuiz);
restartBtn.addEventListener('click', startQuiz);

function startQuiz() {
    score = 0;
    currentQuestionIndex = 0;

    startScreen.classList.add('hide');
    resultScreen.classList.add('hide');
    quizScreen.classList.remove('hide');

    showQuestion();
}

function showQuestion() {
    resetTimer();
    startTimer();

    scoreDisplay.textContent = `Бали: ${score}`;

    let currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    answersContainer.innerHTML = '';

    currentQuestion.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.textContent = answer;
        button.classList.add('btn-answer');

        button.addEventListener('click', () => selectAnswer(index));
        answersContainer.appendChild(button);
    });
}

function selectAnswer(selectedIndex) {
    clearInterval(timerInterval);

    let currentQuestion = questions[currentQuestionIndex];

    if (selectedIndex === currentQuestion.correct) {
        score++;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
}

function startTimer() {
    timerDisplay.textContent = `Час: ${timeLeft}`;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = `Час: ${timeLeft}`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            currentQuestionIndex++;
            if (currentQuestionIndex < questions.length) {
                showQuestion();
            } else {
                showResults();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timerInterval);
    timeLeft = 15;
}

function showResults() {
    quizScreen.classList.add('hide');
    resultScreen.classList.remove('hide');

    resultText.textContent = `Твій результат: ${score} з ${questions.length} балів!`;
}