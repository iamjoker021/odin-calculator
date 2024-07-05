// Create Calculator Layout
const calculator_layout = [
    ["AC",        'back'],
    [7,  8,   9,  '/'],
    [4,  5,   6,  '*'],
    [1,  2,   3,  '-'],
    [0, '.', '=', '+']
]

const divKeyPad = document.querySelector('div.keypad');
for (const key of calculator_layout.flat()) {
    const divKey = document.createElement('div');
    divKey.id = key;

    const buttonKey = document.createElement('button');
    buttonKey.id = key;
    buttonKey.textContent = key;
    if (typeof buttonKey === 'number') {
        buttonKey.classList.add('num-keys');
    }
    else if (['+', '*', '-', '/'].includes(key)) {
        buttonKey.classList.add('operators');
    }

    divKey.appendChild(buttonKey);
    divKeyPad.appendChild(divKey);

}