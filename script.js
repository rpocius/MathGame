// Math Game
// Solve random addition or subtraction to move forward.

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

// An array that holds question and answer pairs.
let questionArr = [];

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

    let question = num1 + " " + action + " " + num2 + " =";
    let answer = action === "+" ? num1 + num2 : num1 - num2;

    return [question, answer];
}

console.log(askQuestion(0, 10));
questionArr.push(askQuestion(0, 10))
console.log(questionArr[0][0]);



// DOM manipulation test

// A function that creates a child component with id "p1" and display the question
function displayQuestionOnDOM() {
    // Get the container div
    let containerDiv = document.getElementById("container");

    // Create a new paragraph element
    let p1 = document.createElement("p");
    p1.id = "p1";

    // Get the question from questionArr and set it as the text content of the paragraph
    p1.textContent = questionArr[0][0];

    // Append the paragraph element to the container div
    containerDiv.appendChild(p1);

    // Create an input field
    let inputField = document.createElement("input");
    inputField.type = "number";
    inputField.id = "userAnswer";

    // Create a button
    let checkButton = document.createElement("button");
    checkButton.textContent = "Check Answer";
    checkButton.onclick = checkAnswer;

    // Append the input field and button to the container div
    containerDiv.appendChild(inputField);
    containerDiv.appendChild(checkButton);
}

// Function to check the user's answer
function checkAnswer() {
    // Get the user's answer from the input field
    let userAnswer = parseInt(document.getElementById("userAnswer").value);

    // Check if the user's answer is equal to the correct answer (questionArr[0][1])
    if (userAnswer === questionArr[0][1]) {
        alert("Correct!");
    } else {
        alert("Incorrect. Try again!");
    }
}

// Call the function to display the question and input elements on the DOM
displayQuestionOnDOM();

/*
function askNewQuestion:
    1. questionArr.push(askQuestion(0, 10)) (find a way to automatically increase difficulty, probably easiest with an if statement. Is arr.length enough to track progress, or do I need a separate var?
    2. displayQuestionOnDOM (auto index the html elements' id)

function ckeckNewAnswer:
        1. checkAnswer
            if correct: askNewQuestion
            else: remove last correct answer from DOM

big counter at the top/bottom of the page, that shows highscore.



/* Tomorrow: 
    Create a function that automatically creates a new question-answer pair
    Create a function that automatically asks a new question if the answer is correct
    Go back when the answer is wrong?
    Automate increasing difficulty
    Point system? High score?
    Display sth when you win?

*/