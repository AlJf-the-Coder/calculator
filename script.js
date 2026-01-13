let operand1 = null;
let operand2 = null; 
let operator = null;

const display = document.querySelector('#display')
const digitButtons = document.querySelectorAll('.digits button');
const operatorButtons = document.querySelectorAll('.operators button');
const clearButton = document.querySelector('.functions #clear')

clearButton.addEventListener('click', () => {
    display.textContent = '0';
    operand1 = null;
    operator = null;
    operand2 = null;
})

digitButtons.forEach(btn => btn.addEventListener('click', 
    () => {
        const digit = btn.textContent;
        const hasParsedOperand1 = typeof operand1 == 'number';
        if (!hasParsedOperand1 && display.textContent == '0'){
            display.textContent = digit;
            return;
        }

        if (hasParsedOperand1){
            const lastOpIndex = display.textContent.lastIndexOf(operator);
            const hasCompletedCalculation = lastOpIndex < 0; // no operator in display
            if (hasCompletedCalculation){
                //reset calculator
                display.textContent = digit;
                operand1 = null;
                operator = null;
                operand2 = null;
                return;
            } else if (display.textContent.slice(lastOpIndex + 1) == '0') {
                display.textContent = display.textContent.slice(0, lastOpIndex + 1) + digit;
                return;
            }
        }
        display.textContent += digit;
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
                operand2 = display.textContent.slice(lastOpIndex + 1)
                operand2 = +operand2;
            } 

            if (!hasCompletedCalculation || operator != null && currentOp == '='){
                const result = operate(operand1, operator, operand2);
                operand1 = result;
                display.textContent = result.toString();
            } else {
                operand2 = null;
            }
        } else {
            operand1 = display.textContent;
            operand1 = +operand1;
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