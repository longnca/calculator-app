// CALCULATOR PROGRAM

const display = document.getElementById("display")

function appendToDisplay(input) {
    if (input === '×') input = '*';
    if (input === '÷') input = '/';
    if (input === '−') input = '-';

    if (isOperator(input) && isOperator(lastCharacterInDisplay())) {
        return; // Prevent consecutive operators
    }
    display.value += input;
}

function clearDisplay() {
    display.value = "";
}

function calculate() {
    try{
        display.value = math.evaluate(display.value);
    }
    catch(error){
        display.value = "Error";
    }
}

function isOperator(char) {
    return ['+', '-', 'x', '/'].includes(char);
}

function lastCharacterInDisplay() {
    return display.value.slice(-1);
}