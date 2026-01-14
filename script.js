let operand1 = ['0'];
let operand2 = []; 
let operator = null;

const ERROR_MESSAGES = ["Oops! You divided by zero!"]
const states = {
    OPERAND1: "OPERAND1",
    OPERATOR: "OPERATOR",
    OPERAND2: "OPERAND2",
    DONE: "DONE",
    ERROR: "ERROR",
}
let state = states.OPERAND1;

const displayResult = document.querySelector('.display #result')
const displayCalculation = document.querySelector('.display #calculation')
const digitButtons = document.querySelectorAll('.digits button');
const operatorButtons = document.querySelectorAll('.operators button');
const clearButton = document.querySelector('.functions #clear')

clearButton.addEventListener('click', () => {
    displayResult.textContent = '0';
    displayCalculation.textContent = '';
    operand1 = ['0'];
    operand2 = [];
    operator = null;
    state = states.OPERAND1;
})

digitButtons.forEach(btn => btn.addEventListener('click', 
    () => {
        const digit = btn.textContent;
        switch (state){
            case states.OPERAND1:
                if (operand1.length == 1 && operand1[0] == '0'){
                    displayResult.textContent = digit;
                    operand1 = [digit];
                } else {
                    displayResult.textContent += digit;
                    operand1.push(digit)
                }
                break;
            case states.OPERATOR:
                displayResult.textContent = digit;
                operand2 = [digit];
                state = states.OPERAND2;
                break;
            case states.OPERAND2:
                if (operand2.length == 1 && operand2[0] == '0'){
                    displayResult.textContent = digit;
                    operand2 = [digit];
                } else {
                    displayResult.textContent += digit;
                    operand2.push(digit)
                }
                break;
            case states.DONE:
                displayResult.textContent = digit;
                operand1 = [digit];
                state = states.OPERAND1;
                break;
            case states.ERROR:
                displayResult.textContent = digit;
                displayCalculation.textContent = '';
                operand1 = [digit];
                operand2 = [];
                operator = null;
                state = states.OPERAND1;
        }
    })
)

operatorButtons.forEach(btn => btn.addEventListener('click', 
    () => {
        const currentOp = btn.textContent;
        switch (state){
            case states.OPERAND1:
                if (currentOp == '='){
                    if (operator && typeof operand2 == "number") {
                        operand1 = +operand1.join('');
                        const result = operate(operand1, operator, operand2);
                        displayCalculation.textContent = `${operand1}${operator}${operand2}=`
                        displayResult.textContent = result.toString();
                        operand1 = result;
                        state = states.DONE;
                    }
                } else {
                    operand1 = +operand1.join('');
                    displayCalculation.textContent += `${operand1}${currentOp}`;
                    operand2 = [];
                    operator = currentOp;
                    state = states.OPERATOR;
                }
                break;
            case states.OPERATOR:
                if (currentOp == "="){
                    operand2 = operand1;
                    const result = operate(operand1, operator, operand2);
                    displayResult.textContent = result.toString();
                    if (typeof result == "string"){
                        displayCalculation.textContent = '';
                        state = states.ERROR;
                    } else {
                        displayCalculation.textContent = `${operand1}${operator}${operand2}=`
                        operand1 = result;
                        state = states.DONE;
                    }
                } else {
                    displayCalculation.textContent = displayCalculation.textContent.slice(0, -1) + currentOp;
                    operator = currentOp;
                }
                break;
            case states.OPERAND2:
                operand2 = +operand2.join('');
                const result = operate(operand1, operator, operand2);
                displayResult.textContent = result.toString();
                if (typeof result == "string"){
                    displayCalculation.textContent = '';
                    state = states.ERROR;
                    return;
                }
                if (currentOp == '='){
                    displayCalculation.textContent = `${operand1}${operator}${operand2}=`;
                    state = states.DONE;
                } else {
                    displayCalculation.textContent = `${result}${currentOp}`;
                    operator = currentOp;
                    operand2 = []; 
                    state = states.OPERATOR;
                }
                operand1 = result;
                break;
            case states.DONE:
                if (currentOp == '='){
                    const result = operate(operand1, operator, operand2);
                    displayCalculation.textContent = `${operand1}${operator}${operand2}=`;
                    operand1 = result;
                    displayResult.textContent = result.toString();
                } else {
                    displayCalculation.textContent = `${operand1}${currentOp}`;
                    operator = currentOp;
                    operand2 = []; 
                    state = states.OPERATOR;
                }
                break;
        }
    }
))

const operations = {
    '+': (a, b) => a + b,
    '−': (a, b) => a - b,
    '×': (a, b) => a * b,
    '÷': (a, b) => (b != 0) ? a / b : "Oops! You divided by zero!",
}

function operate(a, op, b){
    return operations[op](a, b);
}