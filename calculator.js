
let expression = "";//the current expression being built
let closingBracketsRequired = 0;//used to ensure matching number of closing and opening brackets

let numericButtons = document.querySelectorAll('.numeric');
let operationButtons = document.querySelectorAll('.operation');
let clearEntryButton = document.getElementById('clearEntry');
let allClearButton = document.getElementById('allClear');
let openBracketButton = document.getElementById('openBracket');
let closeBracketButton = document.getElementById('closeBracket');
let currentResult = document.getElementById("current-result");
let previousResult = document.getElementById('previous-result');
let submitButton = document.querySelector('.submit');

numericButtons.forEach(button => {
    button.addEventListener('click', function(){
        expression += button.innerHTML;
        currentResult.innerHTML = expression;
        console.log(expression);
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', function(){
       if(expression === ""){
           expression = "0";
       }
       expression += button.innerHTML;
       currentResult.innerHTML = expression;
       console.log(expression);
    });
});

clearEntryButton.addEventListener('click', function() {
    console.log(expression.length);
    let lastChar = expression[expression.length - 1];
    if(lastChar === "("){closingBracketsRequired--;}//if removed character is '(' reduce required closing brackets by 1
    if(lastChar === ")"){closingBracketsRequired++;}//if removed character is ')' increase required closing brackets by 1
    expression = expression.substring(0, expression.length -1);
    currentResult.innerHTML = expression;
});

allClearButton.addEventListener('click', function() {
    currentResult.innerHTML = "";
    expression = "";
    previousResult.innerHTML = "";
});

openBracketButton.addEventListener('click', function() {
    expression += openBracketButton.innerText;
    currentResult.innerHTML = expression;
    console.log(expression);
    closingBracketsRequired++;
});

closeBracketButton.addEventListener('click', function() {
    if(closingBracketsRequired > 0 ){
        expression += closeBracketButton.innerText;
        currentResult.innerHTML = expression;
        console.log(expression);
        closingBracketsRequired--;
    }
});

submitButton.addEventListener('click', function() {
    while(closingBracketsRequired > 0 ){
        expression += ")";
        closingBracketsRequired--;
    }
    previousResult.innerHTML = expression + " =";
    try{
        expression = eval(expression).toString();
        if(isNaN(expression)) throw "NaN Error";
        currentResult.innerHTML = expression;
    }catch{
        expression = "";
        currentResult.innerHTML = "ERROR";
    }
    console.log(expression);
});