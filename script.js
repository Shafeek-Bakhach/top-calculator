let add = (x1, x2) => x1 + x2;
let subtract = (x1, x2) => x1 - x2;
let multiply = (x1, x2) => x1 * x2;
let divide = (x1, x2) => x1 / x2;

let operate = (num1, op, num2) => {
    if (op == "plus"){
        return add(num1, num2);
    }else if(op == "minus"){
        return subtract(num1, num2);
    }else if(op == "multiply"){
        return multiply(num1, num2)
    }else if(op == "divide"){
        return divide(num1,num2);
    }
}

const calcButtons = document.querySelectorAll(".calc-button");
const viewport = document.querySelector(".viewport p");

// Initially I tried the number variables as number types, but it's tricky with the '-' and decimals
// strings are converted to numbers in the operations so it works
let num1 = '';
let op;
let num2 = '';
let updateSecond = false; // Helps me keep track of which number variable to update
let result = 0;
let reset = () => { // I noticed I kept repeating this logic with the AC and dividing by 0 situations
    num1='';
    num2='';
    op=undefined;
}

calcButtons.forEach((button) =>{
    button.addEventListener("click", (e) => {
        const classList = e.target.classList;
        if(op == 'divide' && num2 == 0 && e.target.id === 'equal'){
            viewport.textContent = 'You quackin fool!';
            reset(); 
        }
        // This is the crux of the calculator
        if(classList.contains("number") && updateSecond){
            num2 += e.target.textContent;
            viewport.textContent = +num2;

        }else if(classList.contains("number") && !updateSecond){
            num1 += e.target.textContent;
            viewport.textContent = +num1;
        }
        if(classList.contains("operator") && ['plus', 'minus','divide','multiply'].includes(e.target.id)){

            if(num1 != 0 && num2 != 0){
                result = operate(+num1, op, +num2);
                viewport.textContent = result;
                num1 = result;
                num2 = '';
            }
            op = e.target.id;
            updateSecond = true;
        }
        if(e.target.id === 'equal' && num1 != 0 && num2 != 0){

            result = operate(+num1, op, +num2);
            updateSecond = false;
            viewport.textContent = result;
        }
        if(e.target.id === 'ac'){
            viewport.textContent = '0';
            reset();
        }
        if(e.target.id === 'backspace'){
            if(updateSecond && num2.length > 1){
                num2 = num2.slice(0,num2.length - 1);
                viewport.textContent = +num2;
            }else if(!updateSecond && num1.length > 1){
                num1 = num1.slice(0, num1.length - 1);
                viewport.textContent = +num1;
            }
        }
        if(e.target.id === 'percent'){
            if (result != 0){
                result /= 100;
                viewport.textContent = +result;
            }
            else if(updateSecond){
                num2 /= 100;
                viewport.textContent = +num2;
            }else if(!updateSecond){
                num1 /= 100;
                viewport.textContent = +num1;
            }
        
        }
        if(e.target.id === 'period'){
            if(updateSecond && !num2.includes('.')){
                num2 += '.'
                viewport.textContent = num2;
            }else if(!updateSecond && !num1.includes('.')){
                num1 += '.'
                viewport.textContent = num1;
            }
        }
        if(e.target.id === 'plus-minus'){
            if(updateSecond){
                num2 = '-' + num2
                viewport.textContent = num2;
            }else if(!updateSecond){
                num1 = '-' + num1
                viewport.textContent = num1;
            }
        }
    }
)});
