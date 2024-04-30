const display = document.getElementById("display");

// Set display to '0' initially
display.value = "0";

function appendToDisplay(input) {
    if (input === '×') input = '*';
    if (input === '÷') input = '/';
    if (input === '−') input = '-';

    // Handle replacing '0' when first number is input
    if (display.value === "0") {
        if (isOperator(input)) {
            // If the first character after '0' is an operator, append it
            display.value = '0' + input;
        } else {
            // Replace '0' with input unless it's a decimal point
            display.value = (input === '.') ? "0." : input;
        }
    } else {
        if (isOperator(input) && isOperator(lastCharacterInDisplay())) {
            return; // Prevent consecutive operators
        }
        display.value += input;
    }

    // Format display after appending new input if it's not an operator
    if (!isOperator(input) && input !== '.') {
        formatDisplay();
    }
}

function clearDisplay() {
    display.value = "0";
}

function calculate() {
    try {
        // Use math.evaluate then format the output
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

function formatDisplay() {
    // Split the display value at operators to preserve formatting of individual numbers
    let parts = display.value.split(/([\+\-\*\/])/);
    let formattedParts = parts.map(part => {
        if (!isOperator(part)) {
            // Remove existing commas for correct parsing and reformat
            return new Intl.NumberFormat().format(Number(part.replace(/,/g, '')));
        }
        return part;
    });
    display.value = formattedParts.join('');
}
