const questions = [
    { question: "What was the name of the first network?", answers: [
        { text: "ASAPNET", correct: false },
        { text: "ARPANET", correct: true },
        { text: "CNNET", correct: false },
        { text: "NSFNET", correct: false },
    ]},
    { question: "What is the term for the data communication system within a building or campus?", answers: [
        { text: "MAN", correct: false },
        { text: "PAN", correct: false },
        { text: "WAN", correct: false },
        { text: "LAN", correct: true },
    ]},
    { question: "Which among these is not a Web browser?", answers: [
        { text: "WWW", correct: true },
        { text: "Chrome", correct: false },
        { text: "Opera", correct: false },
        { text: "NetSurf", correct: false },
    ]},
    { question: "Which network topology requires a central controller or hub?", answers: [
        { text: "Ring", correct: false },
        { text: "Star", correct: true },
        { text: "Bus", correct: false },
        { text: "Mesh", correct: false },
    ]},
    { question: "which of the following is not associated with web socket communication?", answers: [
        { text: "https", correct: false },
        { text: "wss", correct: false },
        { text: "http", correct: true },
        { text: "ws", correct: false },
    ]},
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function StartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answers.forEach((answer) => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectBtn = e.target;
    const isCorrect = selectBtn.dataset.correct === "true";
    if(isCorrect){
        selectBtn.classList.add("correct");
        score++;
    }else {
        selectBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach((button) => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore() {
    resetState();
    questionElement.innerHTML = `you ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else {
        StartQuiz();
    }
});

StartQuiz();

