// Start with '0' display on the calculator -> Check for firstOperand, Operator & secondOperand
// display shows the input number on the calculator screen
// firstOperand will hold the first number keyed-in -> it's currently set to 'null'
// Operator key will store the 'Operator'
// waitingForSecondOperand will check if firstOperand & Operator have been given
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
  };
  
// When a key is pressed on the calculator -> 
// the corresponding number gets displayed on the calculator screen
  function inputDigit(digit) {
    const { displayValue, waitingForSecondOperand } = calculator;
  
  // When a key is pressed on the calculator -> the display should be updated accordingly
    if (waitingForSecondOperand === true) {
      calculator.displayValue = digit;
      calculator.waitingForSecondOperand = false;
    } else {
      calculator.displayValue =
      // Ternary operator checks if the current display-screen shows '0'
      // If it is not '0' -> the clcked number is appended using string concatenation
        displayValue === '0' ? digit : displayValue + digit; 
    }
  }
  
  // If there is '0' on the display screen & decimal-key is pressed -> decimal is appended after the number
  // If the decimal is clicked multiple times -> the decimal gets appended only once
  function inputDecimal(dot) {
    if (calculator.waitingForSecondOperand === true) {
      calculator.displayValue = '0.';
      calculator.waitingForSecondOperand = false;
      return;
    }
  
    if (!calculator.displayValue.includes(dot)) {
      calculator.displayValue += dot;
    }
  }
  
  function handleOperator(nextOperator) {
  // Destructure the properties on the calculator object
    const { firstOperand, displayValue, operator } = calculator;
    // `parseFloat` converts the string contents of `displayValue`
    // to a floating-point number
    const inputValue = parseFloat(displayValue);
  
    if (operator && calculator.waitingForSecondOperand) {
      calculator.operator = nextOperator;
      return;
    }
  
    // verify that `firstOperand` is null and that the `inputValue`
    // is not a `NaN` value
    if (firstOperand == null && !isNaN(inputValue)) {
      // Update the firstOperand property
      calculator.firstOperand = inputValue;
    } else if (operator) {
      const currentValue = firstOperand || 0;
      const result = calculate(currentValue, inputValue, operator);
  
      calculator.displayValue = String(result);
      calculator.firstOperand = result;
    }
  
    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
  }
  
  // This function takes firstOperand, secondOperand & operator as arguments and return the value if '=' is clicked
  function calculate(firstOperand, secondOperand, operator) {
    if (operator === '+') {
      return firstOperand + secondOperand;
    } else if (operator === '-') {
      return firstOperand - secondOperand;
    } else if (operator === '*') {
      return firstOperand * secondOperand;
    } else if (operator === '/') {
      return firstOperand / secondOperand;
    }
  
    return secondOperand;
  }
  
  // When AC is pressed -> the display screen to be reset to the original screen
  function resetCalculator() {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
  }
  
  function updateDisplay() {
    const display = document.querySelector('.calculator-screen');
    display.value = calculator.displayValue;
  }
  
  updateDisplay();
  
  // Check to find-out that which key has been pressed on calculator
  // target represents the element which has been clicked on calculator keypad
  const keys = document.querySelector('.calculator-keys');
  keys.addEventListener('click', event => {
    const { target } = event;
    if (!target.matches('button')) {
      return;
    }
  
    // If an operator key is pressed -> display should show the operator
    if (target.classList.contains('operator')) {
      handleOperator(target.value);
      updateDisplay();
      return;
    }
  
    // If a decimal key is pressed -> decimal should be appended after the display number 
    if (target.classList.contains('decimal')) {
      inputDecimal(target.value);
      updateDisplay();
      return;
    }
  
    // If AC key is pressed -> it should clear everything on the calculator display
    if (target.classList.contains('all-clear')) {
      resetCalculator();
      updateDisplay();
      return;
    }
  
    inputDigit(target.value);
    updateDisplay();
  });