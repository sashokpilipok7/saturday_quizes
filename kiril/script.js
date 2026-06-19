document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "Як оголосити змінну, яку не можна змінювати?",
            answers: ["let", "var", "const", "fixed"],
            correct: 2
        },

        //   Додай свої запитання
        {
            question: "Як створити масив у JavaScript?",
            answers: ["{}", "()", "[]", "<>"],
            correct: 3
        },

        {
            question: "Яке значення має змінна після виконання: let x = 5 + 3;",
            answers: ["53", "8", "35", "2"],
            correct: 2
        },

        {
            question: "Яка функція виводить повідомлення у консоль браузера?",
            answers: ["print()", "console.log()", "alert()", "write()"],
            correct: 2
        },
    ];
    // 2. ЕЛЕМЕНТИ З HTML
    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');

    const startBtn = document.querySelector('#start-btn');
    const restartBtn = document.querySelector('#restart-btn');

    const questionText = document.querySelector('#question-text');
    const answerButtons = document.querySelector('#answer-buttons');

    const scoreDisplay = document.querySelector('#score-display');
    const finalScore = document.querySelector('#final-score');

    const timerDisplay = document.querySelector('#timer-display');

    // 3. ЗМІННІ ГРИ
    let score = 0;
    let questionIndex = 0;

    let timer = 15;
    let interval;
    let nextQuestionTimeout;

    // 4. СТАРТ ГРИ
    function startGame() {
        clearInterval(interval);
        clearTimeout(nextQuestionTimeout);

        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');

        score = 0;
        questionIndex = 0;

        scoreDisplay.textContent = score;

        showQuestion(questions[questionIndex]);
    }

    // 5. ПОКАЗ ЗАПИТАННЯ
    function showQuestion(currentQuestion) {
        questionText.textContent = currentQuestion.question;
        answerButtons.innerHTML = '';

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');

            button.classList.add('answer-btn');
            button.textContent = answer;

            if (index === currentQuestion.correct) {
                button.dataset.correct = "true";
            }

            button.addEventListener('click', checkAnswer);

            answerButtons.appendChild(button);
        });

        startTimer();
    }

    // 6. ТАЙМЕР
    function startTimer() {
        clearInterval(interval);

        timer = 15;
        timerDisplay.textContent = `Час: ${timer};`

        interval = setInterval(() => {
            timer--;
            timerDisplay.textContent = `Час: ${timer};`

            if (timer <= 0) {
                clearInterval(interval);
                nextQuestion();
            }
        }, 1000);
    }

    // 7. ПЕРЕВІРКА ВІДПОВІДІ
    function checkAnswer(event) {
        clearInterval(interval);

        const selectedButton = event.target;
        const isCorrect = selectedButton.dataset.correct === "true";

        if (isCorrect) {
            selectedButton.classList.add('correct');
            score++;
            scoreDisplay.textContent = score;
        } else {
            selectedButton.classList.add('wrong');
        }

        const allAnswerButtons = document.querySelectorAll('.answer-btn');

        allAnswerButtons.forEach(button => {
            button.disabled = true;
        });

        nextQuestionTimeout = setTimeout(nextQuestion, 1000);
    }

    // 8. ПЕРЕХІД ДО НАСТУПНОГО ПИТАННЯ
    function nextQuestion() {
        clearInterval(interval);

        questionIndex++;

        if (questionIndex < questions.length) {
            showQuestion(questions[questionIndex]);
        } else {
            showResult();
        }
    }

    // 9. ПОКАЗ РЕЗУЛЬТАТУ
    function showResult() {
        clearInterval(interval);

        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide')
        const accuracy = Math.round((score / questions.length) * 100);
        finalScore.textContent = `${score} / ${questions.length} (${accuracy}%)`;
    }

    // 10. КНОПКИ
    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);

});