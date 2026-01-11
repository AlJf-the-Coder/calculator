let operand1;
let operand2;
let operator;

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
        if (operand1) {
            const lastOpIndex = display.textContent.lastIndexOf(operator)
            // replace operator if last input is also operator
            if (lastOpIndex == display.textContent.length - 1){
                operator = btn.textContent;
                return;
            }
            operand2 = display.textContent.slice(lastOpIndex + 1)
            // validate operand
            operand2 = +operand2;

            const result = operate(operand1, operator, operand2);
            operand1 = result;
            display.textContent = result.toString();
        } else {
            // case where operator is input first
            // ...
            operand1 = display.textContent;
            //validate operand
            operand1 = +operand1;
        }
        if (operator != '='){
            operator = btn.textContent;
        }
        display.textContent += operator;
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