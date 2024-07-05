// Create Calculator Layout
const createCalculator = () => {
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
            else if (['+', '*', '-', '/'].includes(key)) {
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

const typeNumOnDisplay = (buttonNum) => {
    const inputDisplay = document.querySelector('input');
    const existingNum = inputDisplay.value;

    if (existingNum > 0) {
        inputDisplay.value = existingNum + buttonNum;
    }
    else {
        inputDisplay.value = buttonNum;
    }
}

createCalculator();

// Add Event Listener on Buttons
const keypad = document.querySelector('div.keypad');
keypad.addEventListener('click', (e) => {
    

    const buttonValue = e.target.id;

    // If number is typed, append buttonNum to existingNum
    if (buttonValue >= 0 && buttonValue <= 9) {
        typeNumOnDisplay(buttonValue);
    }
})