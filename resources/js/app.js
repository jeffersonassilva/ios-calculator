const btnClear = document.querySelector('.clear');
const btnPercentage = document.querySelector('.percentage');
const btnCalculate = document.querySelector('.calculate');
const btnNumbers = document.querySelectorAll('.numbers');
const btnComma = document.querySelector('.comma');
const btnInvertNumber = document.querySelector('.invert-number');
const ArithmeticButtons = document.querySelectorAll('.arithmetic-buttons');
const display = document.getElementById('display');

/**
 * Evento ao clilcar no botão de linpar a calculadora
 */
btnClear.addEventListener("click", function () {
    clearDisplay();
});

/**
 * Evento ao clilcar no botão de percentagem
 */
btnPercentage.addEventListener("click", function () {
    percentage();
});

/**
 * Evento ao clilcar no botão de igualdade
 */
btnCalculate.addEventListener("click", function () {
    calculate();
});

/**
 * Evento ao clilcar que adiciona a vírgula
 */
btnComma.addEventListener("click", () => {
    const displayValue = display.value;
    const lastChar = displayValue.slice(-1);
    const currentNumber = displayValue.split(/[\+\-\*\/]/).pop();

    if (!displayValue || ['+', '-', '*', '/'].includes(lastChar)) {
        appendToDisplay('0,');
    } else if (!currentNumber.includes(',')) {
        appendToDisplay(',');
    }
});

/**
 * Evento ao clilcar no botão de inverter sinal
 */
btnInvertNumber.addEventListener("click", function () {
    let displayValue = display.value;
    const regex = /[-+]?\d*\,?\d+(\.\d+)?(?=[^\d]*$)/;
    const match = displayValue.match(regex);

    if (match) {
        let lastNumber = match[0];

        if (lastNumber.startsWith('-')) {
            displayValue = displayValue.replace(lastNumber, lastNumber.slice(1));
        } else {
            displayValue = displayValue.replace(lastNumber, '-' + lastNumber);
        }

        display.value = displayValue;
    }
});

/**
 * Evento ao clilcar em qualquer botão numérico
 */
btnNumbers.forEach(el => el.addEventListener("click", function (event) {
    checkError();
    appendToDisplay(event.target.textContent);
}));

/**
 * Evento ao clilcar em qualquer botão aritmético
 */
ArithmeticButtons.forEach(el => el.addEventListener("click", function (event) {
    checkError();
    const displayValue = display.value;
    const lastChar = displayValue.slice(-1);
    const currentExpression = displayValue.split(/[\+\-\*\/]/);

    if (displayValue !== '' && !['+', '-', '*', '/'].includes(lastChar)) {
        if (currentExpression.length > 1) {
            calculate();
        }
        appendToDisplay(event.target.dataset.value);
    }
}));

/**
 * Função responsável por adicionar um item ao display, seja número ou símbolo aritmético
 */
function appendToDisplay(value) {
    display.value += value;
}

/**
 * Função responsável por limpar o display
 */
function clearDisplay() {
    display.value = '';
}

/**
 * Função responsável por calcular a porcentagem
 */
function percentage() {
    const numberCalculated = display.value / 100;
    const numberFormated = numberCalculated.toString().replaceAll('.', ',');

    if (isNaN(numberCalculated)) {
        display.value = ""
    } else {
        display.value = numberFormated
    }
}

/**
 * Função responsável por checar se há algum erro no display
 */
function checkError() {
    if (display.value === 'Error') {
        clearDisplay();
    }
}

/**
 * Função responsável por calcular o resultado final
 */
function calculate() {
    try {
        if (display.value !== 'Error') {
            const stringFormatted = display.value.replaceAll(',', '.');
            let result = eval(stringFormatted);

            result = parseFloat(result.toFixed(10));

            display.value = result.toString().replaceAll('.', ',');
        }
    } catch (e) {
        display.value = 'Error';
    }
}