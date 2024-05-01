const { appendToDisplay, calculate, clearDisplay, toggleSign, calculatePercentage } = require('./calculator');

describe('Basic operations', () => {
    test('append "5" to empty display should return "5"', () => {
        expect(appendToDisplay('5', '')).toBe('5');
    });

    test('calculate "1+1" should return "2"', () => {
        expect(calculate('1+1')).toBe('2');
    });

    test('clear display should return "0"', () => {
        expect(clearDisplay()).toBe('0');
    });
});

describe('Feature tests', () => {
    test('toggle sign of "5" should return "-5"', () => {
        expect(toggleSign('5')).toBe('-5');
    });

    test('calculate percentage of "0.68" should return "68%"', () => {
        expect(calculatePercentage('0.68')).toBe('68%');
    });
});

describe('Error handling', () => {
    test('calculate incomplete expression "5+" should return an error', () => {
        expect(calculate('5+')).toBe('Error');
    });

    test('calculate "10/0" should return Infinity sign', () => {
        expect(calculate('10/0')).toBe('∞');
    });
});

describe('Edge cases', () => {
    test('toggle sign of "0" should return "0"', () => {
        expect(toggleSign('0')).toBe('0');
    });

    test('append multiple decimal points "1.2.3" should return "NaN"', () => {
        let display = appendToDisplay('.', '1.2');
        expect(appendToDisplay('3', display)).toBe('NaN');
    });
})