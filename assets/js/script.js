var bodyEl = document.querySelector("body")
var quizEl = document.querySelector("#quiz-container")
var startEl = document.querySelector("#start-container")
var startBtnEl = document.querySelector("#start-btn")
var timerEl = document.querySelector("#timer")
var footerEl = document.querySelector("footer")
var formEl = document.createElement("form")
var scoreList = document.createElement("ul");
var endScreenEl = document.createElement("div");
var scoresLink = document.querySelector("#scores-link");

var timeLeft = 75;
var finalScore = 0;
var currentQuestion = 0;

var player = {}
var scores = [];

// array of all question elements
var questions = [{
    qn: "Commonly used data types DO NOT include:",
    opt1: "1. strings",
    opt2: "2. booleans",
    opt3: "3. alerts",
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



// Click start buttton to begin quiz
// STARTQUIZ -- Timer starts ticking down and page populates with first question
// If timer hits 0 end game
// when an answer is clicked current question removed new question added
// when all questions answered end quiz
// ENDQUIZ -- Display final score and ask for name. 
//    Save final score to local storage and show high score list



// Timer function -- Displays and decrements timer. Ends quiz if reaches 0
var countdownTimer = function() {
    if (timeLeft > 0) {
        timeLeft--;
        timerEl.textContent = "Time Remaining: " + timeLeft;
        if (timeLeft <= 10) {
            timerEl.className = "text-danger";
        }
    }
    else {
        stopTimer();
        return endQuiz(false);
    }
};

var t;

var startTimer = function() {
    t = setInterval(countdownTimer, 1000);
}

var stopTimer = function() {
    clearInterval(t);
}

// Displays questions and ends game when out of questions
var getQuestion = function(num) {
    if (num < 5) {
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
    else {
        return endQuiz(timeLeft);
    }
}

// quiz button handler
var quizButtonHandler = function(event) {
    var targetEl = event.target;

    if (targetEl.matches(".answer-choice-btn")) {
        var chosenAnswer = targetEl.getAttribute("option");
        
        console.log("Clicked a button with option", chosenAnswer);

        return answerChecker(chosenAnswer);
    }
}

// deletes last correct or wrong footer text on click
var endClickHandler = function() {
    footerEl.textContent = "";
    return false;
}

// checks answers
var answerChecker = function(answer) {
    var correctAnswer = quizEl.getAttribute("correct-answer");

    if (answer === correctAnswer) {
        console.log("correct!");
        footerEl.textContent = "Correct!";
        footerEl.className = "border-top";
    }
    else {
        console.log("wrong");
        timeLeft -= 10;
        timerEl.textContent = "Time Remaining: " + timeLeft;
        footerEl.textContent = "Wrong!";
    }
    return getQuestion(currentQuestion);
}

// Ends Quiz and displays score
var endQuiz = function(num) {
    endScreenEl.className = "end-screen";
    stopTimer();
    quizEl.innerHTML = "";

    if (!num) {
        endScreenEl.innerHTML = "<div><h1>You ran out of time. Refresh the page to try again.</h1><p>Your final score is: " + num + "</p><p>Enter initials: <input type='text' name='player-name' placeholder='Initials' /><button class='btn btn-outline-dark text-light btn-success name-submit' id='submit-player-name' type='submit'>Submit</button></p></div>";
        quizEl.appendChild(endScreenEl);
    }

    else {
        finalScore += num;
        endScreenEl.innerHTML = "<div><h1>All Done!</h1><p>Your final score is: " + num + "</p><p>Enter initials: <input type='text' name='player-name' placeholder='Initials' /><button class='btn btn-outline-dark text-light btn-success name-submit' id='submit-player-name' type='submit'>Submit</button></p></div>";
        formEl.appendChild(endScreenEl);
        quizEl.appendChild(formEl);
    }
}

// handles score form
var scoreFormHandler = function(event) {
    event.preventDefault();
    var playerName = document.querySelector("input[name='player-name']").value;

    if (!playerName) {
        alert("Please enter your initials!");
        return false;
    }

    player.name = playerName;
    player.score = finalScore;
    scores.push(player);
    saveScore();
    endScreenEl.innerHTML = "";
    return scoreScreen();
}



var saveScore = function() {
    localStorage.setItem("scores", JSON.stringify(scores));
}

var loadScores = function() {
    var savedScores = localStorage.getItem("scores");

    if (!savedScores) {
        return false;
    }

    scores = JSON.parse(savedScores);
    console.log(scores);
}

var scoreScreen = function() {
    startEl.remove();
    endScreenEl.innerHTML = "";
    quizEl.innerHTML = "";
    quizEl.appendChild(endScreenEl);
    endScreenEl.appendChild(scoreList);

    for (var i = 0; i < scores.length; i++) {
        addScore(scores[i]);
    }

    scoresLink.removeEventListener("click", scoreScreen);

    var goBackButton = document.createElement("a");
    goBackButton.href = "./index.html";
    goBackButton.textContent = "Go Back";
    goBackButton.className = "btn btn-success";
    endScreenEl.appendChild(goBackButton);

    return false;
}

var addScore = function(scoreObject) {
    var scoreEl = document.createElement("li");
    scoreEl.textContent = scoreObject.name + " - " + scoreObject.score;
    scoreList.appendChild(scoreEl)
}

var startQuiz = function() {
    startEl.remove();
    startTimer();
    getQuestion(currentQuestion);
};

loadScores();


startBtnEl.addEventListener("click", startQuiz);
quizEl.addEventListener("click", quizButtonHandler);
formEl.addEventListener("submit", scoreFormHandler);
formEl.addEventListener("click", endClickHandler);
scoresLink.addEventListener("click", scoreScreen);
