var bodyEl = document.querySelector("body")
var quizEl = document.querySelector("#quiz-container")
var startEl = document.querySelector("#start-container")
var startBtnEl = document.querySelector("#start-btn")
var timerEl = document.querySelector("#timer")
var footerEl = document.querySelector("footer")

// array of all question elements
var questions = [{
    qn: "Commonly used data types DO NOT include:",
    opt1: "1. strings",
    opt2: "2. booleans",
    opt3: "3. alers",
    opt4: "4. numbers",
    ans: "3"
},
{
    qn: "The condition in an if/else statement is enclosed with _________.",
    opt1: "1. quotes",
    opt2: "2. curly brackets",
    opt3: "3. parentheses",
    opt4: "4. square brackets",
    ans: "3"
},
{
    qn: "Arrays in JavaScript can be used to store _________.",
    opt1: "1. numbers and strings",
    opt2: "2. other arrays",
    opt3: "3. booleans",
    opt4: "4. all of the above",
    ans: "4"
},
{
    qn: "String values must be enclosed within _________ when being assigned to varaibles.",
    opt1: "1. commas",
    opt2: "2. curly brackets",
    opt3: "3. quotes",
    opt4: "4. parentheses",
    ans: "3"
},
{
    qn: "A very useful tool used during development and debugging for printing content to the debugger is:",
    opt1: "1. JavaScript",
    opt2: "2. terminal/bash",
    opt3: "3. for loops",
    opt4: "4. console.log",
    ans: "4"
}];

var timeLeft = 75
var currentQuestion = 0

// Click start buttton to begin quiz
// STARTQUIZ -- Timer starts ticking down and page populates with first question
// If timer hits 0 end game
// when an answer is clicked current question removed new question added
// when all questions answered end quiz
// ENDQUIZ -- Display final score and ask for name. 
//    Save final score to local storage and show high score list



// Timer function -- Displays and decrements timer. Ends quiz if reaches 0
var countdownTimer = function() {
    var timeInterval = setInterval(function (){

        if (timeLeft >= 0) {
            timeLeft--;
            timerEl.textContent = "Time Remaining: " + timeLeft;
            if (timeLeft <= 10) {
                timerEl.className = "text-danger";
            }
        }

        else {
            clearInterval(timeInterval);
            endQuiz(false);
        }
    }, 1000);
};

// Displays questions and ends game when out of questions
var getQuestion = function(num) {
    quizEl.innerHTML = "";

    var questionEl = document.createElement("div");
        questionEl.className = ("question-container");

        var questionQnEl = document.createElement("h1");
        questionQnEl.textContent = questions[num].qn;
        questionEl.appendChild(questionQnEl);

        var questionOpt1El = document.createElement("div")
        questionOpt1El.className = "btn btn-outline-success answer-choice-btn";
        questionOpt1El.setAttribute("option", "1");
        questionOpt1El.textContent = questions[num].opt1;
        questionEl.appendChild(questionOpt1El);

        var questionOpt2El = document.createElement("div")
        questionOpt2El.className = "btn btn-outline-success answer-choice-btn";
        questionOpt2El.setAttribute("option", "2");
        questionOpt2El.textContent = questions[num].opt2;
        questionEl.appendChild(questionOpt2El);

        var questionOpt3El = document.createElement("div")
        questionOpt3El.className = "btn btn-outline-success answer-choice-btn";
        questionOpt3El.setAttribute("option", "3"); 
        questionOpt3El.textContent = questions[num].opt3;
        questionEl.appendChild(questionOpt3El);

        var questionOpt4El = document.createElement("div")
        questionOpt4El.className = "btn btn-outline-success answer-choice-btn";
        questionOpt4El.setAttribute("option", "4");
        questionOpt4El.textContent = questions[num].opt4;
        questionEl.appendChild(questionOpt4El);

        quizEl.setAttribute("correct-answer", questions[num].ans);
        quizEl.appendChild(questionEl);

        console.log("populated question ", num+1);
        currentQuestion++;
}

// quiz button handler
var quizButtonHandler = function(event) {
    var questionAnswer = event.target;

    if (questionAnswer.matches(".answer-choice-btn")) {
        var chosenAnswer = questionAnswer.getAttribute("option");
        
        console.log("Clicked a button with option", chosenAnswer);

        return answerChecker(chosenAnswer);
    }
}

// checks answers
var answerChecker = function(answer) {
    var correctAnswer = quizEl.getAttribute("correct-answer");

    if (answer === correctAnswer) {
        console.log("correct!");

    }
    else {
        console.log("wrong");
        timeLeft -= 10;
        timerEl.textContent = "Time Remaining: " + timeLeft;
    }
    return getQuestion(currentQuestion);
}

// Ends Quiz and displays score
var endQuiz = function(finalScore) {
    var endScreenEl = document.createElement("div");
    endScreenEl.className = "end-screen";

    var submitScore = function() {
        return saveScore(playerName, finalScore);
    }

    if (!finalScore) {
        endScreenEl.innerHTML = "<h1>You ran out of time. Refresh the page to try again.</h1>";
        quizEl.appendChild(endScreenEl);
        console.log("you lost");
    }
    else {
    endScreenEl.innerHTML = "<div><h1>All Done!</h1><p>Your final score is" + finalScore + "</p><p>Enter initials: <input type='text' name='player-name' placeholder='Initials' /><button class='btn btn-outline-dark text-light btn-success' id='submit-player-name' type='submit'>Add Task</button></p></div>";
    quizEl.appendChild(endScreenEl);
    var submitEl = document.querySelector("#submit-player-name")
    var playerName = document.querySelector("input[name='player-name']").value;
    submitEl.addEventListener("submit", submitScore(playerName, finalScore));
    }
}

var saveScore = function(name, score) {
    console.log("Name:", name, "Score", score);
}

var startQuiz = function() {
    startEl.remove();
    countdownTimer();
    getQuestion(currentQuestion);
};


startBtnEl.addEventListener("click", startQuiz);
quizEl.addEventListener("click", quizButtonHandler);