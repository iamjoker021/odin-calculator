const OPERATORS = ['+', '*', '-', '/'];
const DIV0_MESSAGE = "Dont divide number by 0";

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

    if (existingValue === DIV0_MESSAGE) {
        inputDisplay.value = buttonValue;
    }

    if (buttonValue === ".") {
        if(!existingValue.includes('.')) {
            inputDisplay.value = existingValue + buttonValue;
        }
    }
    else if (typeof +buttonValue === 'number') {
        if (existingValue == '0') {
            inputDisplay.value = buttonValue;
        }
        else {
            inputDisplay.value = existingValue + buttonValue;
        }
    }
    else if (OPERATORS.includes(buttonValue)) {
        inputDisplay.value = existingValue + buttonValue;
    }
}

// Clear Display Screen
const allClear = () => {
    const inputDisplay = document.querySelector('input');
    inputDisplay.value = '0';
}

// Backspace Number on Screen
const backspace = () => {
    const inputDisplay = document.querySelector('input');
    inputDisplay.value = inputDisplay.value.slice(0, -1) || '0';
}

// Is Operator already exist
const isOperatorAlreadyExist = () => {
    const inputDisplay = document.querySelector('input');
    const existingValue = inputDisplay.value;
    return existingValue.search(/\+|\-|\*|\//g) != -1;
}

// Operate the value
const operate = () => {
    const inputDisplay = document.querySelector('input');
    const existingValue = inputDisplay.value;

    let result;

    if (existingValue.includes('+')) {
        result = calculator.add(...existingValue.split('+').map(parseFloat));
    }
    else if (existingValue.includes('*')) {
        result = calculator.multiply(...existingValue.split('*').map(parseFloat));
    }
    else if (existingValue.includes('/')) {
        result = calculator.divide(...existingValue.split('/').map(parseFloat));
    }
    else if (existingValue.includes('-')) {
        result = calculator.subtract(...[existingValue.substring(0, existingValue.lastIndexOf('-')), existingValue.substring(existingValue.lastIndexOf('-') + 1, existingValue.length)].map(parseFloat));
    }
    return result;
}

// Create Keypad Layout
createKeypadLayout();

// Add Event Listener on Buttons
const keypad = document.querySelector('div.keypad');
keypad.addEventListener('click', (e) => {    

    const buttonValue = e.target.id;

    if (buttonValue === '.' || buttonValue >= 0 && buttonValue <= 9) {
        typeOnDisplay(buttonValue);
    }
    else if (buttonValue === 'AC') {
        allClear();
    }
    else if (buttonValue === 'back') {
        backspace();
    }
    else if (buttonValue === '=') {
        if (isOperatorAlreadyExist()) {
            const result = operate();
            allClear();
            typeOnDisplay(Math.round(result * 10000) / 10000);
        }
    }
    else if (OPERATORS.includes(buttonValue)) {
        if (isOperatorAlreadyExist()) {
            const result = operate();
            allClear();
            typeOnDisplay(Math.round(result * 10000) / 10000);
        }
        typeOnDisplay(buttonValue);
    }
})