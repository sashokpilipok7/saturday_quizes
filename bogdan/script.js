document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "Як оголосити змінну, яку не можна змінювати?",
            answers: ["let", "var", "const", "fixed"],
            correct: 2
        },
        {
            question: "Яка функція використовується для виводу інформації в консоль?",
            answers: ["alert()", "console.log()", "prompt()", "setTimeout()"],
            correct: 1
        },
        {
            question: "Який оператор порівнює значення не по типу?",
            answers: ["===", "!==", "==", "==="],
            correct: 2
        },
        {
            question: "Що таке HTML?",
            answers: ["Мова програмування", "Мова розмітки", "База даних", "Операційна система"],
            correct: 1
        }
    ];


    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');

    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const scoreDisplay = document.querySelector('#score-display');
    const timerDisplay = document.querySelector('#timer');
    const resultText = document.querySelector('#result-text');

    let questionIndex = 0;
    let score = 0;
    let interval;
    let timeLeft;

    function startGame() {
        score = 0;
        questionIndex = 0;

        scoreDisplay.textContent = `Бали: ${score}`;
        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');

        showQuestion(questions[questionIndex]);
    }

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);


    function showQuestion(question) {
        clearInterval(interval);

        timeLeft = 15;
        timerDisplay.textContent = `Час: ${timeLeft}`;
        startTimer();

        answersContainer.innerHTML = '';
        questionText.textContent = question.question;

        question.answers.forEach((answer, i) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.classList.add('answer-btn');
            button.addEventListener('click', () => checkAnswer(button, i));
            answersContainer.appendChild(button);
        });
    }


    function startTimer() {
        interval = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = `Час: ${timeLeft}`;
            if (timeLeft <= 0) {
                clearInterval(interval);
                disableButtons();
                setTimeout(() => nextQuestion(), 1000);
            }
        }, 1000);
    }


    function checkAnswer(button, answerIndex) {
        clearInterval(interval);
        const isCorrect = answerIndex === questions[questionIndex].correct;
        if (isCorrect) {
            score++;
            console.log("Правильно!");
            button.classList.add('correct');
            scoreDisplay.textContent = `Бали: ${score}`;
        } else {
            console.log("Помилка!");
            button.classList.add('wrong');

            const buttons = answersContainer.querySelectorAll('button');
            buttons[questions[questionIndex].correct].classList.add('correct');
        }
        disableButtons();

        setTimeout(() => nextQuestion(), 1000);
    }


    function disableButtons() {
        const buttons = answersContainer.querySelectorAll('button');
        buttons.forEach(btn => btn.disabled = true);
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
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');

        const accuracy = Math.round((score / questions.length) * 100);
        resultText.textContent = `Твій результат: ${score} з ${questions.length} (${accuracy}%)`;
    }
});
