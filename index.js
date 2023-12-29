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


//Create a function to generate a random number in a specific range.

function randomNum(min, max) {
    let currentNum = Math.floor(Math.random() * max);
    if (currentNum < min) {
        currentNum = Math.floor(Math.random() * max);
    } else return currentNum
}

function plusOrMinus() {
    let num = Math.floor(Math.random() * 2)
    if (num = 0) {
        return "+"
    } else return "-"
}

//create a function to ask the mask question
let question = [];

function askQuestion(min, max) {
    let num1 = randomNum(min, max);
    let num2 = randomNum(min, max);
    let action = plusOrMinus();
    let quest = num1 + " " + action + " " + num2 + " =";
    let ans = action === "+" ? num1 + num2 : num1 - num2;
    return [quest, ans];
}

console.log(askQuestion(0, 10));

//TOLIAU:
//SUSETUPINT GIT IR GITHUB NAUJAM MAC 
//SUKURT HTML IR CSS
//PADARYT FUNKCIJA KURI PADUOS KLAUSIMA IR ATSAKYMA I DOM
//SUTVARKYT GALUTINAI