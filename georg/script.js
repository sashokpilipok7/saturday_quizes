document.addEventListener('DOMContentLoaded', () => {
    const questions = [
        { question: "Why have you pressed this button?", answers: ["idk", "you said we'll have fun", "67", "69"], correct: -1 },
        { question: "lol I LIED TO YOU!!! Now you'll die soon", answers: ["I dont care about it", "OMG WHERE I NEED TO RUN???", "I'll steal ur Death Sword", "wtf"], correct: 1 },
        { question: "Dont worry, I prepared to you a BIG surprise!!!", answers: ["oh COME ON!!!", "I dont want to see it", "I dont care about it", "YOOHOO I WANT TO SEE THIS!!!"], correct: 3 },
        { question: "BRO, SERIOUSLY?! Do you really want to see a surprise?!", answers: ["lol", "glitch", "yes, what?", "no, get out!"], correct: 2 }
    ];

    let questionIndex = 0;
    let timer;
    let bombTime = 3600;

    const startScreen = document.querySelector('#start-screen');
    const quizScreen = document.querySelector('#quiz-screen');
    const resultScreen = document.querySelector('#result-screen');
    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    const timerDisplay = document.querySelector('#timer');
    const bombTimerDisplay = document.querySelector('#bomb-timer');
    const resultText = document.querySelector('#result-text');

    function updateBombTimer() {
        const h = Math.floor(bombTime / 3600);
        const m = Math.floor((bombTime % 3600) / 60);
        const s = bombTime % 60;
        bombTimerDisplay.textContent = `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
    }

    function startBombCountdown() {
        setInterval(() => {
            if (bombTime > 0) {
                bombTime--;
                updateBombTimer();
            }
        }, 1000);
    }

    function triggerExplosion() {

        const overlay = document.createElement('div');
        overlay.id = 'explosion-overlay';
        document.body.appendChild(overlay);
        overlay.classList.add('trigger-explosion');

        setTimeout(() => {
            const deathText = document.createElement('div');
            deathText.id = 'death-screen';
            deathText.textContent = 'YOU DEAD';
            document.body.appendChild(deathText);
        }, 500);

        setTimeout(() => {
            location.reload();
        }, 999999999999999999999999999999999999999999999999999);
    }

    function showQuestion(q) {
        answersContainer.innerHTML = '';
        questionText.textContent = q.question;
        q.answers.forEach((ans, i) => {
            const btn = document.createElement('button');
            btn.textContent = ans;
            btn.classList.add('answer-btn');
            btn.onclick = () => {
                btn.classList.add(i === q.correct ? 'correct' : 'wrong');
                setTimeout(nextQuestion, 500);
            };
            answersContainer.appendChild(btn);
        });
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
        resultText.textContent = "THE BOMB IS WAITING...";
    }

    document.querySelector('#start-btn').addEventListener('click', () => {
        startScreen.classList.add('hide');
        quizScreen.classList.remove('hide');
        startBombCountdown();
        showQuestion(questions[0]);
    });

    document.querySelector('#restart-btn').addEventListener('click', () => {
        bombTime = 1;
        triggerExplosion();
    });
});