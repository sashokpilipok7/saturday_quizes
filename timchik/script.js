document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        {
            question: "Як оголосити змінну, яку не можна змінювати?",
            answers: ["let", "var", "const", "fixed"],
            correct: 2
        },
        {
            question: "Який тег створює посилання в HTML?",
            answers: ["<link>", "<a>", "<href>", "<url>"],
            correct: 1
        },
        {
            question: "Для чого використовується CSS?",
            answers: ["Для стилізації сторінки", "Для баз даних", "Для структури сторінки", "Для створення браузера"],
            correct: 0
        },
        {
            question: "Що робить тег <p> в HTML?",
            answers: ["Створює заголовок", "Додає зображення", "Створює абзац тексту", "Створює список"],
            correct: 2
        },
        {
            question: "Що таке DOM?",
            answers: ["Мова програмування", "Браузер", "База даних", "Структура HTML сторінки в JS"],
            correct: 3
        },
        {
            question: "Яка властивість CSS змінює колір тексту?",
            answers: ["background-color", "color", "font-size", "text-style"],
            correct: 1
        },
        {
            question: "Що робить document.querySelector()?",
            answers: ["Створює елемент", "Видаляє сторінку", "Знаходить елемент на сторінці", "Запускає цикл"],
            correct: 2
        },
        {
            question: "Який тег використовується для вставки зображення?",
            answers: ["<img>", "<image>", "<picture>", "<src>"],
            correct: 0
        },
        {
            question: "Що виконує if в JavaScript?",
            answers: ["Створює змінну", "Виводить текст", "Перевіряє умову", "Створює кнопку"],
            correct: 2
        },
        {
            question: "Яка властивість CSS змінює розмір тексту?",
            answers: ["text-size", "font-size", "size", "text-style"],
            correct: 1
        }
    ];

    const startScreen = document.querySelector("#start-screen");
    const quizScreen = document.querySelector("#quiz-screen");
    const resultScreen = document.querySelector("#result-screen");
    const startBtn = document.querySelector("#start-btn");
    const restartBtn = document.querySelector("#restart-btn");

    const questionText = document.querySelector("#question-text");
    const answersContainer = document.querySelector("#answers-container");
    const scoreDisplay = document.querySelector("#score-display");
    const resultText = document.querySelector("#result-text");
    const timerDisplay = document.querySelector("#timer");

    let questionIndex = 0;
    let score = 0;
    let interval;

    function startGame() {
        startScreen.classList.add("hide");
        resultScreen.classList.add("hide");
        quizScreen.classList.remove("hide");

        score = 0;
        questionIndex = 0;
        scoreDisplay.textContent = "Бали: 0";

        showQuestion(questions[0]);
    }

    function showQuestion(question) {
        clearInterval(interval);
        startTimer();

        answersContainer.innerHTML = "";
        questionText.textContent = question.question;

        question.answers.forEach((answer, i) => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.classList.add("answer-btn");

            button.addEventListener("click", () => {
                checkAnswer(i, button);
            });

            answersContainer.appendChild(button);
        });
    }

    function checkAnswer(answerIndex, button) {
        const correctIndex = questions[questionIndex].correct;

        if (answerIndex === correctIndex) {
            score++;
            button.classList.add("correct");
            scoreDisplay.textContent = "Бали: " + score;
        } else {
            button.classList.add("wrong");
        }

        const allButtons = document.querySelectorAll(".answer-btn");
        allButtons.forEach(btn => btn.disabled = true);

        setTimeout(nextQuestion, 1000);
    }

    function nextQuestion() {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add("hide");
        resultScreen.classList.remove("hide");

        const accuracy = Math.round((score / questions.length) * 100);
        resultText.textContent = `Твій результат: ${score} з ${questions.length} (${accuracy}%)`;
    }

    function startTimer() {
        let timeLeft = 15;
        timerDisplay.textContent = "Час: " + timeLeft;

        interval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = "Час: " + timeLeft;

            if (timeLeft <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", startGame);
});