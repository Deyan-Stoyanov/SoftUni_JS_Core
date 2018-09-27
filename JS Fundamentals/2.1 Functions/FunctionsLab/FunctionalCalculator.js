function calculate(firstNumber, secondNumber, sign) {
    function add(firstNumber, secondNumber) {
        return firstNumber + secondNumber;
    }

    function subtract(firstNumber, secondNumber) {
        return firstNumber - secondNumber;
    }

    function multiply(firstNumber, secondNumber) {
        return firstNumber * secondNumber;
    }

    function divide(firstNumber, secondNumber) {
        return firstNumber / secondNumber;
    }
    switch (sign) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
    }
}

console.log(calculate(3, 2, '+'));
