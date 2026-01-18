let operand1 = ['0'];
let operand2 = []; 
let operator = null;

const ERROR_MESSAGES = ["Oops! You divided by zero!"]
const states = {
    OPERAND1: "OPERAND1",
    OPERATOR: "OPERATOR",
    OPERAND2: "OPERAND2",
    SELF: "SELF",
    DONE: "DONE",
    ERROR: "ERROR",
}

const MAX_DECIMALS = 12;
const MAX_DIGITS = 14;
let state = states.OPERAND1;

const displayResult = document.querySelector('.display #result')
const displayCalculation = document.querySelector('.display #calculation')
const digitButtons = document.querySelectorAll('button.digit');
const dotButton = document.querySelector('button#dot');
const operatorButtons = document.querySelectorAll('button.operator');
const clearButton = document.querySelector('button#clear')
const backspaceButton = document.querySelector('button#backspace');

document.addEventListener('keydown', (e)=> {
    const key = e.key;
    console.log(key);
    const digits = '0123456789';
    if (digits.includes(key)){
        digitHandler(key);
        return;
    }
    switch (key){
        case 'Backspace':
            backspaceHandler();
            break;
        case '.':
            dotHandler();
            break;
        case '=':
        case 'Enter':
        case '+':
        case '-':
        case '*':
        case '/':
            operatorHandler(key);
            break;
    }
})

function backspaceHandler(){
    switch (state){
        case states.OPERAND1:
            if (operand1.pop() == '.'){
                dotButton.disabled = false;
            } 
            if (operand1.length == 0){
                operand1.push('0')
            }
            displayResult.textContent = operand1.join('')
            break;
        case states.OPERAND2:
            if (operand2.pop() == '.'){
                dotButton.disabled = false;
            } 
            if (operand2.length == 0){
                operand2.push('0')
            }
            displayResult.textContent = operand2.join('')
            break;
    }
}

function dotHandler(){
    if (dotButton.disabled) return;
    const dot = '.';
    switch (state){
        case states.OPERAND1:
            displayResult.textContent += dot;
            operand1.push(dot)
            break;
        case states.OPERATOR:
            displayResult.textContent = `0${dot}`;
            operand2 = ['0', dot];
            state = states.OPERAND2;
            break;
        case states.OPERAND2:
            displayResult.textContent += dot;
            operand2.push(dot)
            break;
        case states.SELF:
        case states.DONE:
            displayResult.textContent = `0${dot}`;
            displayCalculation.textContent = '';
            operand1 = ['0', dot];
            state = states.OPERAND1;
            break;
        case states.ERROR:
            displayResult.textContent = `0${dot}`;
            displayCalculation.textContent = '';
            operand1 = ['0', dot];
            operand2 = [];
            operator = null;
            state = states.OPERAND1;
    }
    dotButton.disabled = true;
}

function digitHandler(digit){
    switch (state){
        case states.OPERAND1:
            if (displayResult.textContent.length > MAX_DIGITS) return;
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
            dotButton.disabled = false;
            break;
        case states.OPERAND2:
            if (displayResult.textContent.length > MAX_DIGITS) return;
            if (operand2.length == 1 && operand2[0] == '0'){
                displayResult.textContent = digit;
                operand2 = [digit];
            } else {
                displayResult.textContent += digit;
                operand2.push(digit)
            }
            break;
        case states.SELF:
        case states.DONE:
            displayResult.textContent = digit;
            displayCalculation.textContent = '';
            operand1 = [digit];
            state = states.OPERAND1;
            dotButton.disabled = false;
            break;
        case states.ERROR:
            displayResult.textContent = digit;
            displayCalculation.textContent = '';
            operand1 = [digit];
            operand2 = [];
            operator = null;
            state = states.OPERAND1;
            dotButton.disabled = false;
    }
}

function operatorHandler(currentOp){
    switch (state){
        case states.OPERAND1:
            if (currentOp == '=' || currentOp == 'Enter'){
                operand1 = +operand1.join('');
                let result;
                if (operator && typeof operand2 == "number"){
                    result = operate(operand1, operator, operand2);
                    displayCalculation.textContent = `${operand1}${operator}${operand2}=`
                    state = states.DONE;
                } else {
                    result = operand1;
                    displayCalculation.textContent = `${operand1}=`
                    state = states.SELF;
                }
                displayResult.textContent = result.toString();
                operand1 = result;
                dotButton.disabled = false;
            } else {
                operand1 = +operand1.join('');
                displayCalculation.textContent += `${operand1}${currentOp}`;
                operand2 = [];
                operator = currentOp;
                state = states.OPERATOR;
                dotButton.disabled = false;
            }
            break;
        case states.OPERATOR:
            if (currentOp == "=" || currentOp == 'Enter'){
                operand2 = operand1;
                const result = operate(operand1, operator, operand2);
                if (typeof result == "string"){
                    displayResult.textContent = result;
                    displayCalculation.textContent = '';
                    state = states.ERROR;
                } else {
                    displayCalculation.textContent = `${operand1}${operator}${operand2}=`
                    displayResult.textContent = roundDecimals(result);
                    operand1 = +displayResult.textContent;
                    state = states.DONE;
                }
                dotButton.disabled = false;
            } else {
                displayCalculation.textContent = displayCalculation.textContent.slice(0, -1) + currentOp;
                operator = currentOp;
            }
            break;
        case states.OPERAND2:
            operand2 = +operand2.join('');
            const result = operate(operand1, operator, operand2);
            dotButton.disabled = false;
            if (typeof result == "string"){
                displayResult.textContent = result;
                displayCalculation.textContent = '';
                state = states.ERROR;
                return;
            }
            displayResult.textContent = roundDecimals(result);
            if (currentOp == '=' || currentOp == 'Enter'){
                displayCalculation.textContent = `${operand1}${operator}${operand2}=`;
                state = states.DONE;
            } else {
                displayCalculation.textContent = `${result}${currentOp}`;
                operator = currentOp;
                operand2 = []; 
                state = states.OPERATOR;
            }
            operand1 = +displayResult.textContent;
            break;
        case states.SELF:
            if (currentOp == '=' || currentOp == 'Enter') return;
            displayCalculation.textContent = `${operand1}${currentOp}`;
            operator = currentOp;
            operand2 = []; 
            state = states.OPERATOR;
            dotButton.disabled = false;
            break;
        case states.DONE:
            if (currentOp == '=' || currentOp == 'Enter'){
                const result = operate(operand1, operator, operand2);
                displayCalculation.textContent = `${operand1}${operator}${operand2}=`
                displayResult.textContent = roundDecimals(result);
                operand1 = +displayResult.textContent;
            } else {
                displayCalculation.textContent = `${operand1}${currentOp}`;
                operator = currentOp;
                operand2 = []; 
                state = states.OPERATOR;
                dotButton.disabled = false;
            }
            break;
    }
}

backspaceButton.addEventListener('click', backspaceHandler);

clearButton.addEventListener('click', () => {
    displayResult.textContent = '0';
    displayCalculation.textContent = '';
    operand1 = ['0'];
    operand2 = [];
    operator = null;
    dotButton.disabled = false;
    state = states.OPERAND1;
})

dotButton.addEventListener('click', dotHandler);

digitButtons.forEach(btn => btn.addEventListener('click', 
    () => digitHandler(btn.textContent))
)

operatorButtons.forEach(btn => btn.addEventListener('click', 
    () => operatorHandler(btn.textContent))
)

function roundDecimals(num){
    const numString = num.toString();

    if (!numString.includes('.')) return numString;

    const decimals = numString.slice(numString.indexOf('.') + 1).length;
    return (decimals > MAX_DECIMALS) ? 
                num.toFixed(MAX_DECIMALS)
                    .replace(/\.?0+$/, "") :  
                numString;
}

const operations = {
    '+': (a, b) => a + b,
    '−': (a, b) => a - b,
    '-': (a, b) => a - b,
    '×': (a, b) => a * b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
    '÷': (a, b) => (b != 0) ? a / b : "Oops! You divided by zero!",
}

function operate(a, op, b){
    return operations[op](a, b);
}