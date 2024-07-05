// Create Calculator Layout
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