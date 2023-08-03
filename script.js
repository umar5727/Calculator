const keys = document.querySelector('.keys-container');
const display = document.querySelector('.calc-display');
const previous = document .querySelector('.clc-prev');
var first_value, second_value, operator_;

display.textContent = '0';
var old_second_value='';
keys.addEventListener('click', e => {

    if (e.target.matches('button')) {
        const key = e.target;
        const action = key.dataset.action;
        const key_value = key.textContent;
        const display_value = display.textContent;
        const previousKeyType = keys.dataset.previousKeyType;
        // console.log(key_value)
        if (!action) {
            console.log('number key')
            if(previousKeyType === 'result'){
                previous.textContent=' ';
            }
            if (display_value === '0' || previousKeyType === 'operator' || previousKeyType === 'result') {
                display.textContent = key_value;
            }
            else {
                display.textContent = display_value + key_value;
            }
            keys.dataset.previousKeyType = 'number'
        }
        if (
            action === 'add' ||
            action === 'subtract' ||
            action === 'multiply' ||
            action === 'divide' ||
            action === 'percent'
        ) {
            console.log('operator key');
            keys.dataset.previousKeyType = 'operator';
            second_value = display_value;
            if (first_value &&
                operator_ &&
                previousKeyType !== 'operator' &&
                previousKeyType != 'result'
            ) {
                // console.log(first_value+ " values " +second_value)
                const c_value = calculate(first_value, operator_, second_value)
                display.textContent = c_value;
                first_value=c_value;
            }else{
            first_value = display_value;
            }
            operator_ = action;
            previous.textContent=display.textContent + " " + key_value;
        }
        if (action === 'decimal') {
            console.log('decimal')
            if (!display_value.includes('.') && previousKeyType === 'number') {

                display.textContent = display_value + '.';
            } else if (previousKeyType === 'operator' || previousKeyType === 'result') {
                display.textContent = '0.';
            }

            keys.dataset.previousKeyType = 'decimal';
        }
        if (action === 'clear') {
            console.log('clear')
            keys.dataset.previousKeyType = 'clear';
            display.textContent=0;

        }
        if (action === 'clearall') {
            first_value= '';
            second_value='';
            operator_='';
            c_value='';
            old_second_value='';
            keys.dataset.previousKeyType = 'clearall';
            display.textContent=0;
            previous.textContent=' ';
        }
        if (action === 'result') {
            console.log('result')
            second_value = display_value;
            if(first_value){
                if(previousKeyType === 'result'){
                    first_value=display_value;
                    second_value=old_second_value;
                }
                console.log(first_value+ " values " +second_value)
                display.textContent = calculate(first_value, operator_, second_value);
                previous.textContent += " "+ second_value + " " +key_value + " " +display.textContent;
                first_value='';
            }
            keys.dataset.previousKeyType = 'result';
             old_second_value = second_value;

        }
    }
})

const calculate = (first, operator_, second) => {
    const a = parseFloat(first);
    const b = parseFloat(second);
    let result = '';
    if (operator_ === 'add') {
        result = a + b;

    } else if (operator_ === 'subtract') {
        result = a - b;
    } else if (operator_ === 'multiply') {
        result = a * b;
    } else if (operator_ === 'divide') {
        result = a / b;
    } else if (operator_ === 'percent') {
        result = a * (b / 100);
    }
    
    return result;
}