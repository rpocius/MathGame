/* 
Math Game

Solve addition or subtraction to move up
Paprasta lygtis sudet du math random skaicius ir textbox irasyt atsakymui.
Jei atsakymas teisingas - gauni kita klausima.
Jei neteisingas - issoka lentele su your high score ir start over mygtukas. Advanced - trys gyvybes
Pirmi penki klausimai is vienazenkliu skaiciu
Kiti penki is dvizenkliu
Ir taip tolyn iki 20 klausimu kada jau skelbi winner? Nereik per daug klausimu kad kazkas sugebetu pereit.

*/


// A function to generate a random number in a specific range.

function randomNum(min, max) {
    let currentNum = Math.floor(Math.random() * max);
    if (currentNum < min) {
        currentNum = Math.floor(Math.random() * max);
    } else return currentNum
}

// A function that generates either a plus or minus sign.
function plusOrMinus() {
    let num = Math.floor(Math.random() * 2)
    if (num === 0) {
        return "+"
    } else return "-"
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