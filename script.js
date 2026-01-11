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