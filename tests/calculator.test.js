// Import the calculator functions to be tested
const { appendToDisplay, calculate, clearDisplay, toggleSign, calculatePercentage } = require('./calculator');

// Section: Basic Operations
describe('Basic operations', () => {
    // Test appending a digit to an empty display
    test('append "5" to empty display should return "5"', () => {
        expect(appendToDisplay('5', '')).toBe('5');
    });

    // Test a simple addition calculation
    test('calculate "1+1" should return "2"', () => {
        expect(calculate('1+1')).toBe('2');
    });

    // Test clearing the display
    test('clear display should return "0"', () => {
        expect(clearDisplay()).toBe('0');
    });
});

// Section: Feature Tests
describe('Feature tests', () => {
    // Test toggling the sign of a number
    test('toggle sign of "5" should return "-5"', () => {
        expect(toggleSign('5')).toBe('-5');
    });

    // Test calculating a percentage
    test('calculate percentage of "0.68" should return "68%"', () => {
        expect(calculatePercentage('0.68')).toBe('68%');
    });
});

// Section: Error Handling
describe('Error handling', () => {
    // Test handling an incomplete expression
    test('calculate incomplete expression "5+" should return an error', () => {
        expect(calculate('5+')).toBe('Error');
    });

    // Test handling division by zero
    test('calculate "10/0" should return Infinity sign', () => {
        expect(calculate('10/0')).toBe('∞');
    });
});

// Section: Edge Cases
describe('Edge cases', () => {
    // Test toggling the sign of zero
    test('toggle sign of "0" should return "0"', () => {
        expect(toggleSign('0')).toBe('0');
    });

    // Test appending multiple decimal points resulting in an invalid number
    test('append multiple decimal points "1.2.3" should return "NaN"', () => {
        let display = appendToDisplay('.', '1.2');
        expect(appendToDisplay('3', display)).toBe('NaN');
    });
});
