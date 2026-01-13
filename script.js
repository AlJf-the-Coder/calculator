let operand1 = ['0'];
let operand2 = []; 
let operator = null;

const ERROR_MESSAGES = ["Oops! You divided by zero!"]

const displayResult = document.querySelector('.display #result')
const digitButtons = document.querySelectorAll('.digits button');
const operatorButtons = document.querySelectorAll('.operators button');
const clearButton = document.querySelector('.functions #clear')

clearButton.addEventListener('click', () => {
    displayResult.textContent = '0';
    operand1 = ['0'];
    operand2 = [];
    operator = null;
})

digitButtons.forEach(btn => btn.addEventListener('click', 
    () => {
        if (ERROR_MESSAGES.includes(displayResult.textContent)) return;
        const digit = btn.textContent;
        const hasParsedOperand1 = typeof operand1 == 'number';
        if (!hasParsedOperand1 && displayResult.textContent == '0'){
            displayResult.textContent = digit;
            operand1 = [digit];
            return;
        }

        if (hasParsedOperand1){
            const lastOpIndex = displayResult.textContent.lastIndexOf(operator);
            const hasCompletedCalculation = lastOpIndex < 0; // no operator in displayResult
            if (hasCompletedCalculation){
                //reset calculator
                displayResult.textContent = digit;
                operand1 = [digit];
                operand2 = [];
                operator = null;
            } else if (operand2.length == 1 && operand2[0] == '0') {
                displayResult.textContent = display.textContent.slice(0, lastOpIndex + 1) + digit;
                operand2 = [digit];
            } else {
                displayResult.textContent += digit;
                operand2.push(digit)
            }
        } else {
            displayResult.textContent += digit;
            operand1.push(digit)
        }
    })
)

operatorButtons.forEach(btn => btn.addEventListener('click', 
    () => {
        if (ERROR_MESSAGES.includes(displayResult.textContent)) return;
        const currentOp = btn.textContent;
        const hasParsedOperand1 = typeof operand1 == 'number';

        if (hasParsedOperand1) {
            const lastOpIndex = displayResult.textContent.lastIndexOf(operator)
            const hasCompletedCalculation =  lastOpIndex < 0; // no operator in displayResult
            // replace operator if last input is also operator
            if (lastOpIndex == displayResult.textContent.length - 1 && currentOp != '='){
                displayResult.textContent = display.textContent.slice(0, -1) + currentOp;
                operator = currentOp;
                return;
            }

            if (lastOpIndex == displayResult.textContent.length - 1 && currentOp == '='){
                operand2 = operand1;
            } else if (!hasCompletedCalculation){
                operand2 = +operand2.join('');
            } 

            if (!hasCompletedCalculation || operator != null && currentOp == '='){
                const result = operate(operand1, operator, operand2);
                displayResult.textContent = result.toString();
                if (typeof result == "string"){
                    return;
                }
                operand1 = result;
                operand2 = (currentOp != '=') ? [] : operand2;
            } else {
                operand2 = [];
            }
        } else {
            operand1 = +operand1.join('');
        }

        if (currentOp != '='){
            operator = currentOp;
            displayResult.textContent += currentOp;
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