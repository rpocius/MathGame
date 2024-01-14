// Math Game
// Solve random addition or subtraction to move forward.

// An array that holds question and answer pairs.
let questionArr = [];
let index = questionArr.length + 1;
let highScore = 0;

// A function to generate a random number in a specific range.
function randomNum(min, max) {
    let currentNum = Math.floor(Math.random() * (max - min + 1) + min);
    if (currentNum < min) {
        currentNum = Math.floor(Math.random() * (max - min + 1) + min);
    } else return currentNum;
}

// A function that generates either a plus or minus sign.
function plusOrMinus() {
    let num = Math.floor(Math.random() * 2)
    return num === 0 ? "+" : "-";
}

// A function that formats the math question.
function askQuestion(min, max) {
    let num1 = randomNum(min, max);
    let num2 = randomNum(min, max);
    let action = plusOrMinus();

    // Make sure there will be no negative numbers.
    if (action === "-" && num1 < num2) {
        do {
            num1 = randomNum(min, max);
        }
        while (num1 < num2);
    };

    let question = num1 + " " + action + " " + num2;
    let answer = action === "+" ? num1 + num2 : num1 - num2;

    return [question, answer];
}

// Function to automatically increase difficulty
function askNewQuestion() {
    if (highScore <= 3) {
        questionArr.unshift(askQuestion(0, 10))
    } else if (highScore > 3 && highScore <= 6) {
        questionArr.unshift(askQuestion(11, 30))
    } else if (highScore > 6 && highScore <= 10) {
        questionArr.unshift(askQuestion(31, 50))
    } else if (highScore > 10 && highScore <= 20) {
        questionArr.unshift(askQuestion(51, 100))
    } else if (highScore > 20 && highScore <= 30) {
        questionArr.unshift(askQuestion(101, 500))
    } else { questionArr.unshift(askQuestion(500, 5000)) }
}

// A function that creates a child component with id "p1" and displays the question on DOM
function displayQuestionOnDOM() {
    let containerDiv = document.getElementById("container");

    // Create a div to hold the question and answer
    let questionDiv = document.createElement("div");
    questionDiv.className = "question";
    questionDiv.id = "question" + index;

    // Create a new paragraph element for the question
    let paragraph = document.createElement("p");
    paragraph.id = "p" + index;
    paragraph.className = "questionPar";

    // Get the question from questionArr and set it as the text content of the paragraph
    paragraph.textContent = questionArr[0][0];

    // Create an equal sign as a separate p element
    let equalSign = document.createElement("p");
    equalSign.className = "equalSign";
    equalSign.id = "equalSign" + index;
    equalSign.textContent = "=";

    // Create an input field
    let inputField = document.createElement("input");
    inputField.type = "number";
    inputField.id = "userAnswer" + index;

    // Remove non-numeric characters on input
    inputField.addEventListener("input", function () {
        this.value = this.value.replace(/[^0-9]/g, '');
    });

    // Add event listener for the Enter key
    inputField.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            checkAnswer();
        }
    });

    // Create a button
    let checkButton = document.createElement("button");
    checkButton.id = "checkButton" + index;
    checkButton.textContent = "Check";
    checkButton.onclick = checkAnswer;

    // Append the input field and button to the container div
    containerDiv.insertBefore(questionDiv, containerDiv.firstChild);
    //containerDiv.appendChild(questionDiv);
    questionDiv.appendChild(paragraph);
    questionDiv.appendChild(equalSign);
    questionDiv.appendChild(inputField);
    questionDiv.appendChild(checkButton);

    // Automatically focus on the input field
    inputField.focus();
}

// Function to to display user's answer as a p element when it's correct
function highlightCorrectAnswer() {
    // Get the question div and add the right class name
    let questionDiv = document.getElementById("question" + index);
    questionDiv.className = "question right";

    // Create a separate p element for the answer
    let answerPar = document.createElement("p");
    answerPar.id = "answerPar" + index;
    answerPar.className = "answerPar";
    answerPar.textContent = questionArr[0][1];

    // Remove the input field with the current index
    let inputFieldToRemove = document.getElementById("userAnswer" + index);
    if (inputFieldToRemove) {
        questionDiv.removeChild(inputFieldToRemove);
    }

    // Remove the button with the current index
    let buttonToRemove = document.getElementById("checkButton" + index);
    if (buttonToRemove) {
        questionDiv.removeChild(buttonToRemove);
    }

    // Append the p element with the right answer
    questionDiv.appendChild(answerPar);

}

// Function to to display user's answer as a p element when it's incorrect
function highlightIncorrectAnswer() {
    // Get the question div and add the wrong class name
    let questionDiv = document.getElementById("question" + index);
    questionDiv.className = "question wrong";

    // Get the user's input value, assign it's value to newly created p element
    let inputAnswer = parseInt(document.getElementById("userAnswer" + index).value);

    let answerPar = document.createElement("p");
    answerPar.id = "answerPar" + index;
    answerPar.className = "answerPar";
    answerPar.textContent = inputAnswer;

    // Change the equal sign to unequal, add a ? symbol if there is no user input value
    let signToEdit = document.getElementById("equalSign" + index);
    if (signToEdit) {
        if (inputAnswer) {
            signToEdit.textContent = "≠";
        } else {
            signToEdit.textContent = "≠";
            answerPar.textContent = "?";
        }
    }

    // Remove the input field with the current index
    let inputFieldToRemove = document.getElementById("userAnswer" + index);
    if (inputFieldToRemove) {
        questionDiv.removeChild(inputFieldToRemove);
    }

    // Remove the button with the current index
    let buttonToRemove = document.getElementById("checkButton" + index);
    if (buttonToRemove) {
        questionDiv.removeChild(buttonToRemove);
    }

    // Append the created p element
    questionDiv.appendChild(answerPar);
}

// Function to update the highscore on the page
function updateHighScore() {
    // Get the highscore div
    let highScoreDiv = document.getElementById("highscore");

    // Clear the existing content in the div
    highScoreDiv.innerHTML = "";

    // Create a new h3 element that displays the current highscore and append it to highScoreDiv
    let h3 = document.createElement("h3");
    h3.textContent = "Score: " + highScore;
    highScoreDiv.appendChild(h3);
}

// Function to check the user's answer
function checkAnswer() {
    // Get the user's answer from the input field
    let userAnswer = parseInt(document.getElementById("userAnswer" + index).value);
    // Check if the user's answer is equal to the correct answer (questionArr[0][1])
    if (userAnswer === questionArr[0][1]) {
        highlightCorrectAnswer()
        highScore++;
        updateHighScore()
        askNewQuestion();
        index = questionArr.length + 1;
        displayQuestionOnDOM();
    } else {
        highScore--;
        highlightIncorrectAnswer();
        updateHighScore()
        askNewQuestion();
        index = questionArr.length + 1;
        displayQuestionOnDOM();
    }
}

// Function to update the timer on the page
function updateTimer(seconds) {
    let timerDiv = document.getElementById("timer");

    // Clear the existing content in the div
    timerDiv.innerHTML = "";

    // Create a new h3 element that displays the current time and append it to timerDiv
    let h3 = document.createElement("h3");
    h3.textContent = "Time left: " + seconds + " seconds";
    timerDiv.appendChild(h3);
}

// Function to start the game with a timer
function startGameWithTimer() {
    let timerSeconds = 119; // 2 minutes

    // Update the timer every second
    let timerInterval = setInterval(function () {
        updateTimer(timerSeconds);
        timerSeconds--;

        if (timerSeconds < 0) {
            clearInterval(timerInterval);
            gameOver();
        }
    }, 1000);

    // Start the game
    askNewQuestion();
    displayQuestionOnDOM();
}

// Create a start button
function startButton() {
    let containerDiv = document.getElementById("container");

    let startButton = document.createElement("button");
    startButton.id = "startButton";
    startButton.textContent = "Start";
    startButton.onclick = function () {
        containerDiv.removeChild(startButton);
        startGameWithTimer(); // Start the game with a timer
    };

    containerDiv.appendChild(startButton);
    startButton.focus();
}

// Function to show score when time is up
function gameOver() {
    let containerDiv = document.getElementById("container");
    containerDiv.innerHTML = "";

    let scoreDiv = document.createElement("div");
    scoreDiv.id = "scoreDiv";
    containerDiv.appendChild(scoreDiv);

    let scoreCard = document.createElement("h3");
    scoreCard.textContent = "Game Over! Your final score is: " + highScore;
    scoreDiv.appendChild(scoreCard);

    let restartButton = document.createElement("button");
    restartButton.id = "restartButton";
    restartButton.textContent = "Restart";
    restartButton.onclick = function () {
        containerDiv.innerHTML = "";
        startGameWithTimer(); // Start the game with a timer
    };

    scoreDiv.appendChild(restartButton);
    restartButton.focus();
}


updateHighScore();
startButton();