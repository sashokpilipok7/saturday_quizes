document.addEventListener('DOMContentLoaded', () => {

    // 1. БАЗА ДАНИХ (Масив об'єктів з твоїми запитаннями)
    const quizData = [
        {
            question: "Як оголосити змінну, яку не можна змінювати?",
            options: ["let", "var", "const", "fixed"],
            correct: 2 // Індекс правильної відповіді (const)
        },
        {
            question: "Яка планета є третьою від Сонця?",
            options: ["Марс", "Венера", "Земля", "Юпітер"],
            correct: 2 // Індекс правильної відповіді (Земля)
        },
        {
            question: "Який тег використовується для створення посилань в HTML?",
            options: ["<link>", "<a>", "<href>", "<p>"],
            correct: 1 // Індекс правильної відповіді (<a>)
        },
        {
            question: "Як розшифровується CSS?",
            options: ["Creative Style Sheets", "Cascading Style Sheets", "Computer Style Sheets", "Colorful Style Sheets"],
            correct: 1 // Індекс правильної відповіді (Cascading Style Sheets)
        }
    ];

    // 2. Змінні стану гри
    let currentQuestionIndex = 0;
    let score = 0;

    // 3. ФУНКЦІЯ ВІДОБРАЖЕННЯ ЗАПИТАННЯ
    function showQuestion() {
        const currentQuiz = quizData[currentQuestionIndex];

        const questionNumberElem = document.getElementById("question-number");
        const questionTextElem = document.getElementById("question-text");
        const optionButtons = document.querySelectorAll(".option-btn");

        // Оновлюємо текст запитання та лічильник
        questionNumberElem.innerText = `Запитання ${currentQuestionIndex + 1} з ${quizData.length}`;
        questionTextElem.innerText = currentQuiz.question;

        // Заповнюємо кнопки варіантами відповідей
        optionButtons.forEach((button, index) => {
            button.innerText = currentQuiz.options[index];

            // Навішуємо подію кліку на кожну кнопку
            button.onclick = () => checkAnswer(index);
        });
    }

    // 4. ФУНКЦІЯ ПЕРЕВІРКИ ВІДПОВІДІ
    function checkAnswer(selectedIndex) {
        const currentQuiz = quizData[currentQuestionIndex];

        // Перевіряємо правильність
        if (selectedIndex === currentQuiz.correct) {
            alert("Правильно! 🎉");
            score++;
        } else {
            alert(`Неправильно. 😢 Правильна відповідь: ${currentQuiz.options[currentQuiz.correct]}`);
        }

        // Переходимо до наступного запитання
        currentQuestionIndex++;

        if (currentQuestionIndex < quizData.length) {
            showQuestion(); // Показуємо наступне запитання
        } else {
            alert(`Гру закінчено! Твій результат: ${score} з ${quizData.length}`);
            // Скидаємо гру на початок після завершення
            currentQuestionIndex = 0;
            score = 0;
            showQuestion();
        }
    }

    // Запускаємо квіз вперше при завантаженні сторінки
    showQuestion();

});