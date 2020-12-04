var quizMain = document.getElementById("itsQuizTime");
var buttonA = document.getElementById("a");
var buttonB = document.getElementById("b");
var buttonC = document.getElementById("c");
var buttonD = document.getElementById("d");
var resultsEl = document.getElementById("result");
var gameover = document.getElementById("gameover");
var finalScore = document.getElementById("finalScore");
var questEl = document.getElementById("quest");
var questTime = document.getElementById("time");
var questButtons = document.getElementById("startButton");
var itsQuizTime  = document.getElementById("itsQuizTime");
var highscoreContainer = document.getElementById("highScoreContainer");
var highscoreDiv = document.getElementById("high-scorePage");
var highscoreInputName = document.getElementById("initials");
var highscoreDisplay = document.getElementById("highscore-initials");
var endGame = document.getElementById("endGameButtons");
var enterScore = document.getElementById("enterScore");
var highscoreDisplayScore = document.getElementById("highscore-score");
var homePage = document.getElementById("homePage")

var quizQuestions = [{
    question: "What does CSS stand for?",
    choiceA: "Creative Style Section",
    choiceB: "colorful Style Sheet",
    choiceC: "Cascading Style Sheets",
    choiceD: "Code Style Sheet",
    correctAnswer: "c"},
  {
    question: "The canvas element helps to build..?",
    choiceA: "Functions in JavaScript",
    choiceB: "Display Object Management",
    choiceC: "Charts and Graphs",
    choiceD: "Desktop Storage",
    correctAnswer: "c"},
   {
    question: "What is used primarily to add styling to a web page?",
    choiceA: "HTML",
    choiceB: "CSS",
    choiceC: "Photoshop",
    choiceD: "React.js",
    correctAnswer: "b"},
    {
    question: "What is one type of Web Storage in HTML5?",
    choiceA: "Public Storage",
    choiceB: "Private Storage",
    choiceC: "DOM Stoage",
    choiceD: "Local Storage",
    correctAnswer: "d"},
];

var finalQuestionIndex = quizQuestions.length;
var currentQuestionIndex = 0;
var timeLeft = 80;
var timeInterval;
var score = 0;
var correct;

function generateQuiz() {
    gameover.style.display = "none";
    if (currentQuestionIndex === finalQuestionIndex) {
        return showScore();
    }
    var currentQuestion = quizQuestions[currentQuestionIndex];
    questEl.innerHTML = "<p>" + currentQuestion.question + "</p>";
    buttonA.innerHTML = currentQuestion.choiceA;
    buttonB.innerHTML = currentQuestion.choiceB;
    buttonC.innerHTML = currentQuestion.choiceC;
    buttonD.innerHTML = currentQuestion.choiceD;
};

function startQuiz() {
    gameover.style.display = "none";
    homePage.style.display = "none";
    generateQuiz();

    timeInterval = setInterval(function() {
        timeLeft--;
        questTime.textContent = "Time left: " + timeLeft;

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            showScore();
        }
    }, 1000);
    itsQuizTime.style.display = "block";
}

function showScore() {
    itsQuizTime.style.display = "none"
    gameover.style.display = "flex";
    clearInterval(timeInterval);
    highscoreInputName.value = "";
    finalScore.innerHTML = "You got " + score + " out of " + quizQuestions.length + "correct!";
}

enterScore.addEventListener("click", function highscore() {
    if (highscoreInputName.value === "") {
        alert("Initials are required");
        return false;
    }
    else {
        var savedHighscores = JSON.parse(localStorage.getItem("savedHighscores")) ||[];
        var currentUser = highscoreInputName.value.trim();
        var currentHighscore = {
            name: currentUser,
            score: score
        };
        
        gameover.style.display ="none";
        highscoreContainer.style.display = "flex";
        highscoreDiv.style.display = "block";
        endGame.style.display = "flex";
        
        savedHighscores.push(currentHighscore);
        localStorage.setItem("savedHighscores", JSON.stringify(savedHighscores));
        generatehighscores();

    }
});

function generatehighscores() {
    highscoreDisplay.innerHTML = "";
    highscoreDisplayScore.innerHTML = "";
    var highscores  = JSON.parse(localStorage.getItem("savedHighscores")) ||[];
    for (i=0; i<highscores.length; i++){
        var newNameSpan = document.createElement("li");
        var newScoreSpan = document.createElement("li");
        newNameSpan.textContent = highscores[i].name;
        newScoreSpan.textContent = highscores[i].score;
        highscoreDisplay.appendChild(newNameSpan);
        highscoreDisplayScore.appendChild(newScoreSpan);
    }
}

function showHighscores() {
    homePage.style.display = "none";
    gameover.style.display = "none";
    highscoreContainer.style.display = "flex";
    highscoreDiv.style.display = "block";
    endGame.style.display = "flex";

    generatehighscores();
}
function clearScore(){
    window.localStorage.clear();
    highscoreDisplay.textContent = "";
    highscoreDisplayScore.textContent = "";
}

function replayQuiz(){
    highscoreContainer.style.display = "none";
    gameover.style.display = "none";
    homePage.style.display = "flex";
    timeLeft = 80;
    score = 0;
    currentQuestionIndex = 0;
}

function checkAnswer(answer){
    correct = quizQuestions[currentQuestionIndex].correctAnswer;

    if (answer === correct && currentQuestionIndex !== finalQuestionIndex){
        score++;
        alert("Good job! That is correct.");
        currentQuestionIndex++;
        generateQuiz();

    }else if (answer !== correct && currentQuestionIndex !== finalQuestionIndex){
        alert("Wrong answer.")
        currentQuestionIndex++;
        generateQuiz();
        
    }else{
        showScore();
    }
}

questButtons.addEventListener("click",startQuiz);