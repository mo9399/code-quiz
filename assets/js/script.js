// Questions for quiz
var questions = [
    {
        title: "Arrays in JavaScript can be used to store ______.",
        choices: [
            "booleans",
            "other arrays",
            "numbers and strings",
            "all of the above"
        ],
        answer: "all of the above"
    },
    {
        title: "The condition in an if/else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "String values must be enclosed within ______ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parentheses"],
        answer: "quotes"
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
        answer: "console.log"
    }
];

// Variables
var questionIndex = 0;
var score = 0;
var scoreId = 0;
var timeLeft = "";
var timeInterval = "";
var questionEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var startBtn = document.getElementById("start");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");

// Countdown

function countdown() {
    timeLeft = 75;
    timeInterval = setInterval(function () {
        if (timeLeft < 0) {
            clearInterval(timeInterval);
            allDone();
            timerEl.textContent = "Time: 0";
        } else {
            timerEl.textContent = "Time: " + timeLeft;
            timeLeft--;
        }
    }, 1000);
    getQuestion(questionIndex);
}

// Get questions 
function getQuestion() {
    var currentQuestion = questions[questionIndex];

    var nameEl = document.getElementById("question-name");
    nameEl.textContent = currentQuestion.name;

    // clear old questions
    choicesEl.innerHTML = "";

    // loop over choices
    currentQuestion.choices.forEach(function(choice, i) {
        var choiceEl = document.createElement("button");
        choiceEl.setAttribute("class", "choice");
        choiceEl.setAttribute("value", choice);

        choiceEl.textContent = i + 1 + "." + choice;

        // event listener
        choiceEl.onclick = checkAnswer;
        
        // Display on page
        choicesEl.appendChild(choiceEl);
    });
}

// Check answer
function checkAnswer() {
    // If wrong answer
    if (this.value !== questions[questionIndex].answer) {
        // Deduct time
        time -= 15;

        if (time < 0) {
            time = 0;
        }

        // Display new time
        timerEl.textContent = time;

        // "Wrong" sound effect
        sfxWrong.play();

        feedbackEl.textContent = "Wrong!";
    } else {
        // "Right" sound effect
        sfxRight.play();
        
        feedbackEl.textContent = "Correct!";
    }
}