// object values
const calculator = {
    displayValue: '0',
    firstOperand: null,
    waitingForSecondOperand: false,
    operator: null,
};

// update display
const updateDisplay = () => {
    const display = document.querySelector('.screen');
    display.value = calculator.displayValue;
};
updateDisplay();

// handle key press
const keys = document.querySelector('.keys');
keys.addEventListener('click', (event) => {
    const { target } = event;
    if(!target.matches('button')){
        return;
    }

    if(target.classList.contains('operator')){
        handleOperator(target.value);
        updateDisplay();
        return;
    }

    if(target.classList.contains('decimal')){
        inputDecimal(target.value);
        updateDisplay();
        return;
    }

    if(target.classList.contains('all-clear')){
        resetCalculator();
        updateDisplay();
        return;
    }

    inputDigit(target.value);
    updateDisplay();
});

// input digit
const inputDigit = (digit) => {
    const {displayValue, waitingForSecondOperand} = calculator;

    if(waitingForSecondOperand === true){
        calculator.displayValue = digit;
        calculator.waitingForSecondOperand = false;
    } 
    else{
        calculator.displayValue = 
        displayValue === '0' ? digit : displayValue + digit;
    }
};

// input decimal
const inputDecimal = (dot) => {
    if(calculator.waitingForSecondOperand === true){
        calculator.displayValue = '0.';
        calculator.waitingForSecondOperand = false;
        return;
    } 
    if(!calculator.displayValue.includes(dot)){
    calculator.displayValue += dot;
    }
};

// handle operators
const handleOperator = (nextOperator) => {
    const { firstOperand, displayValue, operator } = calculator;
    const inputValue = parseFloat(displayValue);

    if(operator && calculator.waitingForSecondOperand){
        calculator.operator = nextOperator;
        return;
    }
    if(firstOperand == null && !isNaN(inputValue)){
        calculator.firstOperand = inputValue;
    } 
    else if (operator){
        const result = calculate(firstOperand, inputValue, operator);

        calculator.displayValue = `${parseFloat(result.toFixed(7))}`;
        calculator.firstOperand = result;
    }

    calculator.waitingForSecondOperand = true;
    calculator.operator = nextOperator;
};

// calculator logic
const calculate = (firstOperand, secondOperand, operator) => {
    if(operator === '+') {
        return firstOperand + secondOperand;
    }else if (operator === '-'){
        return firstOperand - secondOperand;
    }else if (operator === '*'){
        return firstOperand * secondOperand;
    }else if (operator === '/'){
        return firstOperand / secondOperand;
    }
   return secondOperand;
};

// reset calulator
const resetCalculator = () => {
    calculator.displayValue = '0';
    calculator.firstOperand = null;
    calculator.waitingForSecondOperand = false;
    calculator.operator = null;
};

console.log("calculate");

//  cursor
const coords = { x: 0, y: 0 };
const circles = document.querySelectorAll(".circle");

const colors = [
    "#867fef",
    "#857fd9",
    "#7974c0",
    "#7974c0",
    "#6f6ab7",
    "#645fac",
    "#5b56a1",
    "#524d98",
    "#4a458f",
    "#413c84",
    "#38347a",
    "#2f2c70",
    "#282567",
    "#201d5a",
    "#18164c",
    "#131142",
    "#0f0e3b",
    "#0a0a31",
    "#060624",
    "#03031e"
];

circles.forEach(function (circle, index) {
  circle.x = 0;
  circle.y = 0;
  circle.style.backgroundColor = colors[index % colors.length];
});

window.addEventListener("mousemove", function(e){
  coords.x = e.clientX;
  coords.y = e.clientY;
  
});

function animateCircles() {
  
  let x = coords.x;
  let y = coords.y;
  
  circles.forEach(function (circle, index) {
    circle.style.left = x - 12 + "px";
    circle.style.top = y - 12 + "px";
    
    circle.style.scale = (circles.length - index) / circles.length;
    
    circle.x = x;
    circle.y = y;

    const nextCircle = circles[index + 1] || circles[0];
    x += (nextCircle.x - x) * 0.3;
    y += (nextCircle.y - y) * 0.3;
  });
 
  requestAnimationFrame(animateCircles);
}

animateCircles();