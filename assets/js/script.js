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
var scoreIdCounter = 0;
var timeLeft = "";
var timeInterval = "";
var titleEl = document.getElementById("title");
var questionEl = document.getElementById("question");
var timerEl = document.getElementById("time");
var startTimerEl = document.getElementById("start");
var introContentEl = document.getElementById("intro-screen");
var quizContentEl = document.getElementById("quiz");
var feedbackEl =  document.getElementById("feedback");
var instructionsEl = document.getElementById("instructions");
var choiceListEl = document.createElement("ol");

// Array to hold scores for saving
let allScores = JSON.parse(localStorage.getItem("all-scores")) || [];

// Countdown function
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
    render(questionIndex);
  }

// Get questions 
function render(questionIndex) {
    // Clear page content
    introContentEl.style.display = "none";
    quizContentEl.innerHTML = "";
    choiceListEl.innerHTML = "";
  
    for (var i = 0; i < questions.length; i++) {
      let quizQuestion = questions[questionIndex].title;
      var quizChoices = questions[questionIndex].choices;
      questionEl.innerHTML = quizQuestion;
    }
  
    quizChoices.forEach(function (newItem) {
      var choiceEl = document.createElement("li");
      choiceEl.setAttribute("class", "choices");
      choiceEl.textContent = newItem;
      quizContentEl.appendChild(choiceListEl);
      choiceListEl.appendChild(choiceEl);
      choiceEl.addEventListener("click", checkAnswer);
    });
  }

// Check answer
function checkAnswer(event) {
    var selectedChoice = event.target;
  
    if (selectedChoice.matches("li")) {
      var feedback = document.createElement("div");
      feedback.setAttribute("id", "feedback");
      // Correct condition
      if (selectedChoice.textContent == questions[questionIndex].answer) {
        score++;
        feedback.textContent = "Correct!";
        // Incorrect condition
      } else {
        // Deduct 10 seconds from timer
        timeLeft = timeLeft - 10;
        feedback.textContent = "Wrong!";
      }
    }
    // Question Index tracks the number of questions user has completed
    questionIndex++;
  
    if (questionIndex >= questions.length) {
      clearInterval(timeInterval);
      timerEl.textContent = "Time: " + timeLeft;
      allDone();
    } else {
      render(questionIndex);
    }
    quizContentEl.appendChild(feedback);
  }

// Inital form
var initialsFormHandler = function (event) {
    event.preventDefault();
    var initialsInput = document.getElementById("initials-form").value;
  
    // Check if initials are empty
    if (initialsInput === "") {
      alert("You need to add your initials to save your score!");
      return false;
    } else {
      var finalScoreObj = {
        initials: initialsInput,
        score: finalScore,
      };
  
      allScores.push(finalScoreObj);
    }
  
    saveScores();
  
    // Link to high scores page
    window.location.replace("./highscores.html");
  };
  
  // Show final page
  var allDone = function () {
    introContentEl.style.display = "none";
    questionEl.style.display = "none";
    quizContentEl.innerHTML = "";
  
    // Heading
    var finalTitle = document.createElement("h1");
    finalTitle.textContent = "All done!";
    quizContentEl.appendChild(finalTitle);
  
    // Paragraph
    var finalP = document.createElement("p");
    finalP.setAttribute("class", "all-done");
  
    // Calculate score with time left
    if (timeLeft <= 0) {
      finalScore = 0;
    } else {
      finalScore = timeLeft;
    }
    finalP.textContent = "Your final score is: " + finalScore;
  
    quizContentEl.appendChild(finalP);
  
    // Label for input
    var inputLabel = document.createElement("label");
    inputLabel.setAttribute("class", "all-done");
    inputLabel.textContent = "Enter your initials: ";
    quizContentEl.appendChild(inputLabel);
  
    // Input initials
    var formEl = document.createElement("input");
    formEl.setAttribute("type", "text");
    formEl.setAttribute("id", "initials-form");
    formEl.setAttribute("placeholder", "");
  
    quizContentEl.appendChild(formEl);
  
    // Submit button
    var submit = document.createElement("button");
    submit.setAttribute("type", "submit");
    submit.setAttribute("id", "submit");
    submit.setAttribute("class", "btn");
    submit.textContent = "Submit";
  
    quizContentEl.appendChild(submit);
  
    var submitButton = document.getElementById("submit");
    submitButton.addEventListener("click", initialsFormHandler);
  };
  
  // Save scores to local storage
  var saveScores = function () {
    localStorage.setItem("all-scores", JSON.stringify(allScores));
  };
  
  startTimerEl.addEventListener("click", countdown);