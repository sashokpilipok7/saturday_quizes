document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "Що означає HTML?",
            answers: ["Мова розмітки", "Мова програмування", "База даних", "Операційна система"],
            correct: 0
        },
        {
            question: "Який тег створює посилання?",
            answers: ["<a>", "<link>", "<href>", "<url>"],
            correct: 0
        },
        {
            question: "Який тег використовується для зображень?",
            answers: ["<image>", "<img>", "<picture>", "<src>"],
            correct: 1
        }
    ];

    const startScreen = document.getElementById("start-screen");
    const quizScreen = document.getElementById("quiz-screen");
    const resultScreen = document.getElementById("result-screen");

    const startBtn = document.getElementById("start-btn");
    const restartBtn = document.getElementById("restart-btn");

    const questionText = document.getElementById("question-text");
    const answersContainer = document.getElementById("answers-container");

    const scoreDisplay = document.getElementById("score-display");
    const resultText = document.getElementById("result-text");
    const timerElement = document.getElementById("timer");

    let questionIndex = 0;
    let score = 0;
    let interval;

    function startGame() {
        score = 0;
        questionIndex = 0;

        scoreDisplay.textContent = "Бали: 0";

        startScreen.classList.add("hide");
        resultScreen.classList.add("hide");
        quizScreen.classList.remove("hide");

        showQuestion(questions[questionIndex]);
    }

    function showQuestion(question) {

        clearInterval(interval);

        questionText.textContent = question.question;
        answersContainer.innerHTML = "";

        question.answers.forEach((answer, index) => {

            const button = document.createElement("button");

            button.textContent = answer;
            button.classList.add("answer-btn");

            button.addEventListener("click", () => {
                checkAnswer(button, index);
            });

            answersContainer.appendChild(button);
        });

        startTimer();
    }

    function checkAnswer(button, answerIndex) {

        clearInterval(interval);

        const buttons = answersContainer.querySelectorAll("button");

        if (answerIndex === questions[questionIndex].correct) {
            button.classList.add("correct");
            score++;
            scoreDisplay.textContent = "Бали: " + score;
        } else {
            button.classList.add("wrong");
        }

        buttons.forEach(btn => {
            btn.disabled = true;
        });

        setTimeout(() => {
            nextQuestion();
        }, 1000);
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

        clearInterval(interval);

        quizScreen.classList.add("hide");
        resultScreen.classList.remove("hide");

        const accuracy = Math.round(
            (score / questions.length) * 100
        );

        resultText.textContent =
            `Твій результат: ${score} з ${questions.length} (${accuracy}%)`;
    }

    function startTimer() {

        let timeLeft = 15;

        timerElement.textContent = "Час: " + timeLeft;

        interval = setInterval(() => {

            timeLeft--;

            timerElement.textContent = "Час: " + timeLeft;

            if (timeLeft <= 0) {

                clearInterval(interval);

                nextQuestion();
            }

        }, 1000);
    }

    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", startGame);

});