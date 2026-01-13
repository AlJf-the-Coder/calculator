let operand1 = ['0'];
let operand2 = []; 
let operator = null;

const display = document.querySelector('#display')
const digitButtons = document.querySelectorAll('.digits button');
const operatorButtons = document.querySelectorAll('.operators button');
const clearButton = document.querySelector('.functions #clear')

clearButton.addEventListener('click', () => {
    display.textContent = '0';
    operand1 = ['0'];
    operand2 = [];
    operator = null;
})

digitButtons.forEach(btn => btn.addEventListener('click', 
    () => {
        const digit = btn.textContent;
        const hasParsedOperand1 = typeof operand1 == 'number';
        if (!hasParsedOperand1 && display.textContent == '0'){
            display.textContent = digit;
            operand1 = [digit];
            return;
        }

        if (hasParsedOperand1){
            const lastOpIndex = display.textContent.lastIndexOf(operator);
            const hasCompletedCalculation = lastOpIndex < 0; // no operator in display
            if (hasCompletedCalculation){
                //reset calculator
                display.textContent = digit;
                operand1 = [digit];
                operand2 = [];
                operator = null;
            } else if (operand2.length == 1 && operand2[0] == '0') {
                display.textContent = display.textContent.slice(0, lastOpIndex + 1) + digit;
                operand2 = [digit];
            } else {
                display.textContent += digit;
                operand2.push(digit)
            }
        } else {
            display.textContent += digit;
            operand1.push(digit)
        }
    })
)

operatorButtons.forEach(btn => btn.addEventListener('click', 
    () => {
        const currentOp = btn.textContent;
        const hasParsedOperand1 = typeof operand1 == 'number';

        if (hasParsedOperand1) {
            const lastOpIndex = display.textContent.lastIndexOf(operator)
            const hasCompletedCalculation =  lastOpIndex < 0; // no operator in display
            // replace operator if last input is also operator
            if (lastOpIndex == display.textContent.length - 1 && currentOp != '='){
                display.textContent = display.textContent.slice(0, -1) + currentOp;
                operator = currentOp;
                return;
            }

            if (lastOpIndex == display.textContent.length - 1 && currentOp == '='){
                operand2 = operand1;
            } else if (!hasCompletedCalculation){
                operand2 = +operand2.join('');
            } 

            if (!hasCompletedCalculation || operator != null && currentOp == '='){
                const result = operate(operand1, operator, operand2);
                operand1 = result;
                display.textContent = result.toString();
                operand2 = (currentOp != '=') ? [] : operand2;
            } else {
                operand2 = [];
            }
        } else {
            operand1 = +operand1.join('');
        }

        if (currentOp != '='){
            operator = currentOp;
            display.textContent += currentOp;
        }
    }
))

const operations = {
    '+': (a, b) => a + b,
    '−': (a, b) => a - b,
    '×': (a, b) => a * b,
    '÷': (a, b) => a / b,
}

function operate(a, op, b){
    return operations[op](a, b);
}