document.addEventListener('DOMContentLoaded', () => {

    const questions = [
        {
            question: "Скільки кольорів чашок у грі Cuphead?",
            answers: ["1", "2", "4", "5"],
            correct: 1
        },
        {
            question: "Яка найкраща руда у Minecraft?",
            answers: ["Залізо", "Алмази", "Редстоун", "Незерит"],
            correct: 3
        },
        {
            question: "Що ми бачимо на робочому столі кожен день?",
            answers: ["Шпалери", "Курсор", "Ярлики", "Монітор"],
            correct: 2
        },
        {
            question: "Який останній бос гри Terraria?",
            answers: ["Moon Lord", "Імператриця Світла", "Герцог Риброн", "Небесні Вежі"],
            correct: 0
        }
    ];

    let questionIndex = 0;
    let score = 0;

    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');

    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');

    const questionText = document.getElementById('question-text');
    const answersContainer = document.getElementById('answers-container');

    const scoreDisplay = document.getElementById('score-display');
    const finalScore = document.getElementById('final-score');

    if (startBtn) {
        startBtn.addEventListener('click', startGame);
    }

    if (restartBtn) {
        restartBtn.addEventListener('click', startGame);
    }

    function startGame() {
        questionIndex = 0;
        score = 0;

        scoreDisplay.textContent = `Бали: ${score}`;

        startScreen.classList.add('hide');
        resultScreen.classList.add('hide');
        quizScreen.classList.remove('hide');

        showQuestion();
    }

    function showQuestion() {
        const currentQuestion = questions[questionIndex];

        questionText.textContent = currentQuestion.question;
        answersContainer.innerHTML = '';

        currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;

            button.addEventListener('click', () => {
                checkAnswer(index, button);
            });

            answersContainer.appendChild(button);
        });
    }

    function checkAnswer(selectedIndex, clickedButton) {
        const currentQuestion = questions[questionIndex];

        if (selectedIndex === currentQuestion.correct) {
            clickedButton.classList.add('correct');
            score++;
            scoreDisplay.textContent = `Бали: ${score}`;
        } else {
            clickedButton.classList.add('wrong');

            const buttons = answersContainer.querySelectorAll('button');
            buttons[currentQuestion.correct].classList.add('correct');
        }

        const buttons = answersContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.disabled = true;
        });

        setTimeout(() => {
            nextQuestion();
        }, 1000);
    }

    function nextQuestion() {
        questionIndex++;

        if (questionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add('hide');
        resultScreen.classList.remove('hide');

        const accuracy = Math.round((score / questions.length) * 100);

        finalScore.textContent =
            `Ви набрали ${score} з ${questions.length} балів (${accuracy}%)`;
    }

});