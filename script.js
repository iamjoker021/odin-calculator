const OPERATORS = ['+', '*', '-', '/'];
const DIV0_MESSAGE = "Press AC, DivBy0Error";

// Create Calculator Layout
const createKeypadLayout = () => {
    const calculator_layout = [
        ["AC",        'back'],
        [7,  8,   9,  '/'],
        [4,  5,   6,  '*'],
        [1,  2,   3,  '-'],
        [0, '.', '=', '+']
    ]
    
    const divKeyPad = document.querySelector('div.keypad');
    for (const row of calculator_layout) {
        const keyRow = document.createElement('div');
        keyRow.classList.add('key-row');
        for (const key of row) {
            const divKey = document.createElement('div');
            divKey.id = key;
        
            const buttonKey = document.createElement('button');
            buttonKey.id = key;
            buttonKey.textContent = key;
            if (typeof key === 'number') {
                buttonKey.classList.add('num-keys');
            }
            else if (OPERATORS.includes(key)) {
                buttonKey.classList.add('operators');
            }
            else if (key === '=') {
                buttonKey.classList.add('equal');
            }
            else if (key === '.') {
                buttonKey.classList.add('dot');
            }
            divKey.appendChild(buttonKey);
            keyRow.appendChild(divKey)
        }
        divKeyPad.appendChild(keyRow);
    }
}

// Calculator Funtions
const calculator = {
    'add': (num1, num2) => (num1 || 0) + (num2 || 0),
    'subtract': (num1,  num2) => (num1 || 0) - (num2 || 0),
    'multiply': (num1, num2) => (num1 || 1) * (num2 || 1),
    'divide': (num1, num2) => {
        console.log(num1, num2)
        if (num2 === 0) {
            return DIV0_MESSAGE;
        }
        return (num1 || 1) / (num2 || 1);
    },
}

// Type Number in Display on Key Press
const typeOnDisplay = (buttonValue) => {
    const inputDisplay = document.querySelector('input');
    const existingValue = inputDisplay.value;

    if (existingValue === DIV0_MESSAGE || buttonValue === DIV0_MESSAGE) {
        inputDisplay.value = DIV0_MESSAGE;
        return;
    }

    if (buttonValue === ".") {
        const lastValues = existingValue.split(/\+|\-|\*|\//g).at(-1);
        if(!lastValues.includes('.')) {
            inputDisplay.value = existingValue + buttonValue;
        }
    }
    else if (!isNaN(parseFloat(buttonValue))) {
        if (existingValue == '0') {
            inputDisplay.value = parseFloat(buttonValue);
        }
        else {
            inputDisplay.value = existingValue + parseFloat(buttonValue);
        }
    }
    else if (OPERATORS.includes(buttonValue)) {
        inputDisplay.value = existingValue + buttonValue;
    }
    else if (buttonValue === 'back') {
        inputDisplay.value = existingValue.slice(0, -1) || '0';
    }
}

// Clear Display Screen
const allClear = () => {
    const inputDisplay = document.querySelector('input');
    inputDisplay.value = '0';
}


// Is Operator already exist
const isValidOperatorAlreadyExist = (buttonValue) => {
    const inputDisplay = document.querySelector('input');
    const existingValue = inputDisplay.value;

    // Exception to include negative value if existing operator is multiply or divide
    if (buttonValue === '-') {
        if (existingValue[existingValue.length-1] === '*' || existingValue[existingValue.length-1] === '/') {
            return false;
        }
    }

    return existingValue.search(/\+|\-|\*|\//g) != -1;
}

// Operate the value
const operate = () => {
    const inputDisplay = document.querySelector('input');
    const existingValue = inputDisplay.value;

    let result;

    if (existingValue.includes('/')) {
        result = calculator.divide(...existingValue.split('/').map(parseFloat));
    }
    else if (existingValue.includes('*')) {
        result = calculator.multiply(...existingValue.split('*').map(parseFloat));
    }
    else if (existingValue.includes('+')) {
        result = calculator.add(...existingValue.split('+').map(parseFloat));
    }
    else if (existingValue.includes('-')) {
        result = calculator.subtract(...[existingValue.substring(0, existingValue.lastIndexOf('-')), existingValue.substring(existingValue.lastIndexOf('-') + 1, existingValue.length)].map(parseFloat));
    }

    return result;
}

const executeEqual = () => {

    const result = operate();
    allClear();
    if (result === DIV0_MESSAGE) {
        typeOnDisplay(result);
    }
    typeOnDisplay(Math.round(result * 10000) / 10000);
}

// Create Keypad Layout
createKeypadLayout();

// Add Event Listener on Buttons
const keypad = document.querySelector('div.keypad');
keypad.addEventListener('click', (e) => {    

    const buttonValue = e.target.id;

    if (buttonValue === 'AC') {
        allClear();
    }
    else if (buttonValue === '.' || buttonValue >= 0 && buttonValue <= 9 || buttonValue === 'back') {
        typeOnDisplay(buttonValue);
    }
    else if (buttonValue === '=') {
        if (isValidOperatorAlreadyExist(buttonValue)) {
            executeEqual();
        }
    }
    else if (OPERATORS.includes(buttonValue)) {
        if (isValidOperatorAlreadyExist(buttonValue)) {
            executeEqual();
        }
        typeOnDisplay(buttonValue);
        
    }
})