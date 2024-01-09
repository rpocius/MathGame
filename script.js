// Math Game
// Solve random addition or subtraction to move forward.

// An array that holds question and answer pairs.
let questionArr = [];
let index = questionArr.length + 1;

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

    let question = num1 + " " + action + " " + num2 + " =";
    let answer = action === "+" ? num1 + num2 : num1 - num2;

    return [question, answer];
}

//function to automatically increase difficulty
function askNewQuestion() {
    //first 5 questions
    if (questionArr.length >= 0 && questionArr.length <= 3) {
        questionArr.unshift(askQuestion(0, 10))
    } else if (questionArr.length > 3 && questionArr.length <= 6) {
        questionArr.unshift(askQuestion(11, 30))
    } else if (questionArr.length > 6 && questionArr.length <= 10) {
        questionArr.unshift(askQuestion(31, 50))
    } else if (questionArr.length > 10 && questionArr.length <= 20) {
        questionArr.unshift(askQuestion(51, 100))
    } else {questionArr.unshift(askQuestion(101, 1000))}
}



// A function that creates a child component with id "p1" and displays the question
function displayQuestionOnDOM() {
    // Get the container div
    let containerDiv = document.getElementById("container");

    // Create a new paragraph element
    let paragraph = document.createElement("p");
    paragraph.id = "p" + index;

    // Get the question from questionArr and set it as the text content of the paragraph
    paragraph.textContent = questionArr[0][0];

    // Append the paragraph element to the container div
    containerDiv.appendChild(paragraph);

    // Create an input field
    let inputField = document.createElement("input");
    inputField.type = "number";
    inputField.id = "userAnswer" + index;

    // Remove non-numeric characters on input
    inputField.addEventListener("input", function() {
        this.value = this.value.replace(/[^0-9]/g, '');  
    });

    // Create a button
    let checkButton = document.createElement("button");
    checkButton.id = "checkButton" + index;
    checkButton.textContent = "Check Answer";
    checkButton.onclick = checkAnswer;

    // Append the input field and button to the container div
    containerDiv.appendChild(inputField);
    containerDiv.appendChild(checkButton);
}

// Function to remove the last incorrect question from the DOM
function removeLastIncorrectQuestion() {
    // Get the container div
    let containerDiv = document.getElementById("container");

    // Remove the paragraph with the current index
    let paragraphToRemove = document.getElementById("p" + index);
    if (paragraphToRemove) {
        containerDiv.removeChild(paragraphToRemove);
    }

    // Remove the input field with the current index
    let inputFieldToRemove = document.getElementById("userAnswer" + index);
    if (inputFieldToRemove) {
        containerDiv.removeChild(inputFieldToRemove);
    }

    // Remove the button with the current index
    let buttonToRemove = document.getElementById("checkButton" + index);
    if (buttonToRemove) {
        containerDiv.removeChild(buttonToRemove);
    }
}

// Function to check the user's answer
function checkAnswer() {
    // Get the user's answer from the input field
    let userAnswer = parseInt(document.getElementById("userAnswer" + index).value);
    // Check if the user's answer is equal to the correct answer (questionArr[0][1])
    if (userAnswer === questionArr[0][1]) {
        alert("Correct!");

        //remove button
        let containerDiv = document.getElementById("container");
        let buttonToRemove = document.getElementById("checkButton" + index);
        if (buttonToRemove) {
            containerDiv.removeChild(buttonToRemove);
        }

        askNewQuestion();
        index = questionArr.length + 1;
        displayQuestionOnDOM();
    } else {
        alert("Incorrect. Try again!");
        removeLastIncorrectQuestion();
        questionArr.shift();
        index = questionArr.length
        askNewQuestion();
        index = questionArr.length + 1;
        displayQuestionOnDOM();
    }
}

// Ask the first question that will be displayed when page loads. Change to a start button?
askNewQuestion();
// Call the function to display the question and input elements on the DOM
displayQuestionOnDOM();


/* Tomorrow: 
    Better automate increasing difficulty
    Point system? High score? Big counter at the top/bottom of the page, that shows highscore.
    Display sth when you win? 
    Create a timer and make high score based on time/difficulty ratio?
    CSS
*/