document.addEventListener("DOMContentLoaded", () => {

    const questions = [
        {
            question: "Як оголосити змінну, яку не можна змінювати?",
            answers: ["let", "var", "const", "fixed"],
            correct: 2
        },
        {
            question: "Що означає HTML?",
            answers: [
                "HyperText Markup Language",
                "HighTech Modern Language",
                "Hyperlink Text Marking Language"
            ],
            correct: 0
        },
        {
            question: "Який тег використовується для створення посилання?",
            answers: ["<link>", "<p>", "<a>", "<href>"],
            correct: 2
        },
        {
            question: "Що таке CSS?",
            answers: [
                "Мова програмування для створення логіки сайту",
                "Каскадні таблиці стилів для оформлення зовнішнього вигляду",
                "Протокол для безпечної передачі даних в інтернеті",
                "Система управління базами даних"
            ],
            correct: 1
        }
    ];

    const startScreen = document.querySelector("#start-screen");
    const quizScreen = document.querySelector("#quiz-screen");
    const resultScreen = document.querySelector("#result-screen");

    const startBtn = document.querySelector("#start-btn");
    const restartBtn = document.querySelector("#restart-btn");

    const questionText = document.querySelector("#question-text");
    const answerButtons = document.querySelector("#answer-buttons");

    const scoreDisplay = document.querySelector("#score-display");
    const finalScore = document.querySelector("#final-score");

    let questionIndex = 0;
    let score = 0;

    function startGame() {
        startScreen.classList.add("hide");
        resultScreen.classList.add("hide");
        quizScreen.classList.remove("hide");

        score = 0;
        questionIndex = 0;
        scoreDisplay.textContent = score;

        showQuestion();
    }

    function showQuestion() {
        answerButtons.innerHTML = "";

        const currentQuestion = questions[questionIndex];
        questionText.textContent = currentQuestion.question;

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement("button");
            button.textContent = answer;
            button.classList.add("answer-btn");

            button.addEventListener("click", () => checkAnswer(index));

            answerButtons.appendChild(button);
        });
    }

    function checkAnswer(answerIndex) {
        const correctAnswer = questions[questionIndex].correct;

        if (answerIndex === correctAnswer) {
            score++;
            scoreDisplay.textContent = score;
        }

        questionIndex++;

        if (questionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add("hide");
        resultScreen.classList.remove("hide");

        finalScore.textContent = `${score} з ${questions.length}`;
    }

    startBtn.addEventListener("click", startGame);
    restartBtn.addEventListener("click", startGame);

});