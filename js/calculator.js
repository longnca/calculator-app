const res = require('express/lib/response');
const math = require('mathjs');

function appendToDisplay(input, currentDisplay) {
    if (input === '×') input = '*';
    if (input === '÷') input = '/';
    if (input === '−') input = '-';

    if (currentDisplay === "0") {
        if (isOperator(input)) {
            return '0' + input;
        } else {
            return (input === '.') ? "0." : input;
        }
    } else {
        if (isOperator(input) && isOperator(lastCharacterInDisplay(currentDisplay))) {
            return currentDisplay;
        }
        let newDisplay = currentDisplay + input;
        if (!isOperator(input) && input !== ".") {
            newDisplay = formatDisplay(newDisplay); 
        }
        return newDisplay;
    }
}

function calculate(displayValue) {
    try {
        let result = math.evaluate(displayValue.replace(/,/g, ""));
        return new Intl.NumberFormat().format(result);
    }
    catch(error) {
        return "Error";
    }
}

function clearDisplay() {
    return "0";
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function lastCharacterInDisplay(displayValue) {
    return displayValue.slice(-1);
}

function formatDisplay(displayValue) {
    // split the display value at operators to preserve formatting of individual numbers
    let parts = displayValue.split(/([\+\-\*\/])/);
    let formattedParts = parts.map(part => {
        if (!isOperator(part) && part != "") {
            // remove existing commas for correct parsing and reformat
            return new Intl.NumberFormat().format(Number(part.replace(/,/g, '')));
        }
        return part;
    });
    return formattedParts.join('');
}

function toggleSign(displayValue) {
    let parts = displayValue.split(/([\+\-\*\/])/);
    if (parts.length === 1) {
        displayValue = toggle(parts[0]);
    } else {
        parts[parts.length - 1] = toggle(parts[parts.length - 1]);
        displayValue = parts.join('');
    }
    return formatDisplay(displayValue); // ensure the display is correctly formatted after toggling
}

function toggle(part) {
    if (part.charAt(0) === '-') {
        return part.slice(1); // remove minus sign if it's negative
    } else if (part !== '0') { // only toggle if not zero
        return '-' + part; // add minus sign if it's positive
    }
    return part;
}

function calculatePercentage(displayValue) {
    try {
        let result = math.evaluate(displayValue.replace(/,/g, ""));
        let percentage = result * 100;
        return new Intl.NumberFormat().format(percentage) + "%";
    }
    catch(error) {
        return "Error";
    }
}

module.exports = { appendToDisplay, calculate, clearDisplay, toggleSign, calculatePercentage };
