document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('result');
    let currentInput = '';
    let previousInput = '';
    let operation = null;
    let shouldResetScreen = false;

    // Initialize display
    display.value = '0';

    // Number and decimal button handler
    document.querySelectorAll('.number, .decimal').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default button behavior
            const digit = button.textContent;
            
            if (digit === '.' && display.value.includes('.')) return;
            
            if (shouldResetScreen || display.value === '0') {
                display.value = digit;
                shouldResetScreen = false;
            } else {
                display.value += digit;
            }
            currentInput = display.value;
        });
    });

    // Operator button handler
    document.querySelectorAll('.operator').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentInput !== '') {
                if (previousInput !== '') {
                    calculate();
                }
                previousInput = display.value;
                operation = button.textContent;
                shouldResetScreen = true;
            }
        });
    });

    // Equals button handler
    document.querySelector('.equals').addEventListener('click', (e) => {
        e.preventDefault();
        if (currentInput !== '' && previousInput !== '') {
            calculate();
        }
    });

    // Clear button handler
    document.querySelector('.clear').addEventListener('click', (e) => {
        e.preventDefault();
        display.value = '0';
        currentInput = '';
        previousInput = '';
        operation = null;
        shouldResetScreen = false;
    });

    // Delete button handler
    document.querySelector('.delete').addEventListener('click', (e) => {
        e.preventDefault();
        if (display.value.length > 1) {
            display.value = display.value.slice(0, -1);
        } else {
            display.value = '0';
        }
        currentInput = display.value;
    });

    function calculate() {
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);
        
        if (isNaN(prev) || isNaN(current)) return;

        let result;
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '*':
                result = prev * current;
                break;
            case '/':
                if (current === 0) {
                    alert('Cannot divide by zero!');
                    return;
                }
                result = prev / current;
                break;
            default:
                return;
        }

        display.value = result;
        currentInput = result.toString();
        previousInput = '';
        operation = null;
        shouldResetScreen = true;
    }
});