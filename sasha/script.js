// Cкопіюй код з минулого уроку
document.addEventListener('DOMContentLoaded', () => {

    // 1. БАЗА ДАНИХ (Масив об'єктів)
    const questions = [
        {
            question: "Як оголосити змінну, яку не можна змінювати?",
            answers: ["let", "var", "const", "fixed"],
            correct: 2
        },
        {
            question: "Як зробити меч чербера",
            answers: ["соідинити с мечом інфініті", "скрафтить", "видать командой", "його нейзя получить"],
            correct: 2
        },
        {
            question: "кто сильнише?",
            answers: ["человек паук с нового фильма", "веном", "железний человек"],
            correct: 2
        },
        {
            question: "што отвичает тони старк на вопрос  ктоти без козтума?",
            answers: ["плейбой милиардер гений", "никто", "сигма", "крутой пацан"],
            correct: 2
        },
        {
            question: "ви пройшли крутойну давай па-па",
            correct: 2
        },
        //   Додай свої запитання
    ];

    const questionText = document.querySelector('#question-text');
    const answersContainer = document.querySelector('#answers-container');
    let questionIndex = 0;
    let score = 0;
    function showQuestion(question) {
        answersContainer.innerHTML = '';
        questionText.innerText = question.question;
        question.answers.forEach((answer, i) => {
            const button = document.createElement('button');
            button.innerText = answer;
            button.onclick = () => checkAnswer(button, i);
            answersContainer.appendChild(button);
            button.innerText = answer;
            butteanclick = () => checkAnswer(button, i);
            answersContainer.appendChild(button);
        });
    }

    showQuestion(questions[questionIndex]);

    function checkAnswer(answerIndex) {
        if (answerIndex == questions[questionIndex].correct) {
            score++;
            console.log("prawulna widpowid");
        } else {
            console.log("Неправильна відповідь");
        }
        questionIndex++;
        showQuestion(questions[questionIndex]);
    }


});
