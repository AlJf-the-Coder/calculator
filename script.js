let operand1;
let operand2;
let operator;

const display = document.querySelector('#display')
const digitButtons = document.querySelectorAll('.digits button');
const operatorButtons = document.querySelectorAll('.operators button');

digitButtons.forEach(btn => btn.addEventListener('click', 
    () => {
        const digit = btn.textContent;
        const operationDone = operator && !display.textContent.includes(operator)
        if (operationDone){
            //reset calculator
            display.textContent = digit;
            operand1 = digit;
            operator = null;
            operand2 = null;
        } else {
            display.textContent += digit;
        }
    }
))

operatorButtons.forEach(btn => btn.addEventListener('click', 
    () => {
        const currentOp = btn.textContent;
        const hasParsedOperand1 = typeof operand1 == 'number';

        if (hasParsedOperand1) {
            const lastOpIndex = display.textContent.lastIndexOf(operator)
            const hasCompletedCalculation =  lastOpIndex < 0; // no operator in display
            // replace operator if last input is also operator
            if (lastOpIndex == display.textContent.length - 1){
                display.textContent = display.textContent.slice(0, -1) + currentOp;
                operator = currentOp;
                return;
            }

            if (!hasCompletedCalculation){
                operand2 = display.textContent.slice(lastOpIndex + 1)
                // validate operand
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
            // case where operator is input first
            // ...
            operand1 = display.textContent;
            //validate operand
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