// Get the display element 
const display = document.getElementById("display");

// Set display to '0' initially
display.value = "0";

// Function to display input values
function appendToDisplay(input) {
    if (input === '×') input = '*';
    if (input === '÷') input = '/';
    if (input === '−') input = '-';

    // Handle replacing '0' when first number is input
    if (display.value === "0") {
        if (isOperator(input)) {
            // if the first character after '0' is an operator, then append it
            display.value = '0' + input;
        } else {
            // replace '0' with input unless it's a decimal point
            display.value = (input === '.') ? "0." : input;
        }
    } else {
        if (isOperator(input) && isOperator(lastCharacterInDisplay())) {
            return; // prevent consecutive operators
        }
        display.value += input;
    }

    // Format display after appending new input if it's not an operator
    if (!isOperator(input) && input !== '.') {
        formatDisplay();
    }
}

// Function to reset the display to "0" after pressing the Clear button
function clearDisplay() {
    display.value = "0";
}

// Function to evaluate the math operations
function calculate() {
    try {
        display.value = new Intl.NumberFormat().format(math.evaluate(display.value.replace(/,/g, '')));
    }
    catch(error) {
        display.value = "Error";
    }
}

function isOperator(char) {
    return ['+', '-', '*', '/'].includes(char);
}

function lastCharacterInDisplay() {
    return display.value.slice(-1);
}

// Function to format display values, adding thousand separators (e.g. 10,000)
function formatDisplay() {
    let parts = display.value.split(/([\+\-\*\/])/);
    let formattedParts = parts.map(part => {
        if (!isOperator(part) && part != "") {
            return new Intl.NumberFormat().format(Number(part.replace(/,/g, '')));
        }
        return part;
    });
    display.value = formattedParts.join('');
}

// Backspace button: Function to remove the last character in the display
function removeLastCharacter() {
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
        formatDisplay(); // reformat display to handle commas after removal
    } else {
        clearDisplay(); // reset to '0' if only one digit is left
    }
}

// +/- Button: Function to toggle the sign of the number displayed
function toggleSign() {
    let parts = display.value.split(/([\+\-\*\/])/);
    if (parts.length === 1) {
        display.value = toggle(parts[0]);
    } else {
        parts[parts.length - 1] = toggle(parts[parts.length - 1]);
        display.value = parts.join('');
    }
    formatDisplay(); // ensure the display is correctly formatted after toggling
}

function toggle(part) {
    if (part.charAt(0) === '-') {
        return part.slice(1); // remove minus sign if it's negative
    } else if (part !== '0') { // only toggle if not zero
        return '-' + part; // add minus sign if it's positive
    }
    return part;
}

// % Button: Function to calculate percentage
function calculatePercentage() {
    try {
        let result = math.evaluate(display.value.replace(/,/g, ""));
        let percentage = result * 100;
        display.value = new Intl.NumberFormat().format(percentage) + "%";
    }
    catch(error) {
        display.value = "Error";
    }
}