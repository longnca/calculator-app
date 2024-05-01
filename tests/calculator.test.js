const { appendToDisplay, calculate, clearDisplay, toggleSign, calculatePercentage } = require('../js/calculator');

test('append "5" to empty display should return "5"', () => {
    expect(appendToDisplay('5', '')).toBe('5');
});

test('calculate "1+1" should return "2"', () => {
    expect(calculate('1+1')).toBe('2');
});

test('clear display should return "0"', () => {
    // Assuming clearDisplay function returns '0'
    expect(clearDisplay()).toBe('0');
});

test('toggle sign of "5" should return "-5"', () => {
    // Assuming toggleSign function changes the sign and returns new value
    expect(toggleSign('5')).toBe('-5');
});

test('calculate percentage of "10" should return "1,000%"', () => {
    // Assuming calculatePercentage function appends '%' to the result
    expect(calculatePercentage('10')).toBe('1,000%');
});
