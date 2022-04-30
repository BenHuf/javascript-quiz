var bodyEl = document.querySelector("body")
var quizEl = document.querySelector("#quiz-container")
var startEl = document.querySelector("#start-btn")

var startQuiz = function() {
    startEl.remove()
};



startEl.addEventListener("click", startQuiz)