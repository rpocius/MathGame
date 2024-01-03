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
let test1 = askQuestion(0, 10);
questionArr.push(askQuestion(0, 10))
console.log(questionArr[0][0]);

// Begin DOM manipulation
