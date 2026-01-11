const display = document.querySelector('#display')
const digitButtons = document.querySelectorAll('.digits button');
const operatorButtons = document.querySelectorAll('.operators button');

digitButtons.forEach(btn => btn.addEventListener('click', 
    () => {
        display.textContent += btn.textContent;
    }
))

operatorButtons.forEach(btn => btn.addEventListener('click', 
    () => {
        display.textContent += btn.textContent;
    }
))

function add(a, b){
    return a + b;
}

function subtract(a, b){
    return a - b;
}

function multiply(a, b){
    return a * b;
}

function divide(a, b){
    return a / b;
}

let operand1;
let operand2;
let operator;

function operate(a, op, b){
    switch (op){
        case '+':
            return add(a, b);
        case '-':
            return add(a, b);
        case '*':
            return add(a, b);
        case '/':
            return add(a, b);
        default:
            return;
    }
}