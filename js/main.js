import {MATH_OPERATORS, AUXILIARY_OPERATIONS} from "./constants.js";

const calculator = {
    displayValue: '0',
    firstDigit: null,
    waitingForSecondDigit: false,
    operator: null,
}

function clearAll() {
    calculator.displayValue = '0';
    calculator.firstDigit = null;
    calculator.waitingForSecondDigit = false;
    calculator.operator = null;
}

function inputDigit(digit) {
    const {displayValue, waitingForSecondDigit} = calculator;

    if (waitingForSecondDigit === true) {
        calculator.displayValue = digit;
        calculator.waitingForSecondDigit = false;
    } else {
        calculator.displayValue = displayValue === '0' ? digit : displayValue + digit;
    }
}

function updateDisplay() {
    const display = document.querySelector('.display-value');

    display.value = calculator.displayValue;
}

function addDecimal(comma) {
    const {displayValue} = calculator;

    if (!calculator.displayValue.includes(comma)) {
        calculator.displayValue += comma;
    }
}


function processMathOperator(mathOperator) {
    const {firstDigit, displayValue, operator} = calculator;
    const floatDisplayValue = parseFloat(displayValue)

    if (operator && calculator.waitingForSecondDigit) {
        calculator.operator = mathOperator;
        return;
    }

    if (firstDigit == null && !isNaN(floatDisplayValue)) {
        calculator.firstDigit = floatDisplayValue;
    }

    if (operator) {
        const result = calculate(firstDigit, floatDisplayValue, operator);
        calculator.displayValue = String(result);
        calculator.firstDigit = result;
    }

    calculator.operator = mathOperator;
    calculator.waitingForSecondDigit = true;
}


function calculate(firstDigit, secondDigit, operator) {
    switch (operator) {
        case MATH_OPERATORS.ADDITION:
            return firstDigit + secondDigit;

        case MATH_OPERATORS.SUBTRACTION:
            return firstDigit - secondDigit;

        case MATH_OPERATORS.MULTIPLICATION:
            return firstDigit * secondDigit;

        case MATH_OPERATORS.DIVISION:
            return firstDigit / secondDigit;

        case MATH_OPERATORS.EQUALLY:
            return secondDigit;
    }
}


const buttons = document.querySelector('.buttons');
buttons.addEventListener('click', (event) => {
    const {target} = event;
    const {value} = target;

    switch (value) {
        case MATH_OPERATORS.ADDITION:
        case MATH_OPERATORS.SUBTRACTION:
        case MATH_OPERATORS.MULTIPLICATION:
        case MATH_OPERATORS.DIVISION:
        case MATH_OPERATORS.EQUALLY:
            processMathOperator(value);
            break;
        case AUXILIARY_OPERATIONS.DECIMAL:
            addDecimal(value);
            break;
        case AUXILIARY_OPERATIONS.CLEAR:
            clearAll();
            break;
        default:
            inputDigit(value);
    }

    updateDisplay();
    console.log(calculator)
})
