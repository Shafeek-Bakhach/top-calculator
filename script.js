let add = (x1, x2) => x1 + x2;
let subtract = (x1, x2) => x1 - x2;
let multiply = (x1, x2) => x1 * x2;
let divide = (x1, x2) => x1 / x2;

let operate = (num1, op, num2) => {
    if (op == "plus" || op == "+"){
        return add(num1, num2);
    }else if(op == "minus" || op == "-"){
        return subtract(num1, num2);
    }else if(op == "multiply" || op == "*"){
        return multiply(num1, num2)
    }else if(op == "divide" || op == "/"){
        return divide(num1,num2);
    }
}

let updateViewport = (num) => {viewport.textContent = num.toFixed(2)}
let roundResult = (num) => {
    // Source - https://stackoverflow.com/a/11832950
    // Posted by Brian Ustas, modified by community. See post 'Timeline' for change history
    // Retrieved 2026-07-20, License - CC BY-SA 4.0
    return Math.round((num + Number.EPSILON) * 100) / 100
};

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
    result=0;
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
            viewport.textContent = num2;

        }else if(classList.contains("number") && !updateSecond){
            num1 += e.target.textContent;
            viewport.textContent = num1;
        }
        if(classList.contains("operator") && ['plus', 'minus','divide','multiply'].includes(e.target.id)){

            if(num1 != 0 && num2 != 0){
                result = operate(+num1, op, +num2);
                viewport.textContent = roundResult(result);
                num1 = result;
                num2 = '';
            }
            op = e.target.id;
            updateSecond = true;
        }
        if(e.target.id === 'equal' && num1 != 0 && num2 != 0){

            result = operate(+num1, op, +num2);
            updateSecond = false;
            viewport.textContent = roundResult(result);
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
                viewport.textContent = roundResult(result);
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
                let prefix = num2.slice(0,1);
                if(prefix == '-'){
                    num2 = num2.slice(1);
                    viewport.textContent = num2;
                }
                else{
                    num2 = '-' + num2
                    viewport.textContent = num2;
                }
            }else if(!updateSecond){
                let prefix = num1.slice(0,1);
                if(prefix == '-'){
                    num1 = num1.slice(1);
                    viewport.textContent = num1;
                }
                else{
                    num1 = '-' + num1
                    viewport.textContent = num1;
                }

            }
        }
    }
)});

document.addEventListener("keypress", (e) =>{
    let key = e.key;
    console.log(key);
    let isNumber = ['0','1','2','3','4','5','6','7','8','9','0'].includes(key);
    let isOperator = ['+', '-', '*', '/'].includes(key);

    if(isNumber && updateSecond){
        num2 += key;
        viewport.textContent = num2;

    }else if(isNumber && !updateSecond){
        num1 += key;
        viewport.textContent = num1;
        }
    if(isOperator){
        if(num1 != 0 && num2 != 0){
            result = operate(+num1, op, +num2);
            
            viewport.textContent = roundResult(result);
            num1 = result;
            num2 = '';
        }
        op = key;
        updateSecond = true;
    }
    if(key == 'Enter' && num1 != 0 && num2 != 0){

        result = operate(+num1, op, +num2);
        updateSecond = false;
        viewport.textContent = roundResult(result);
    }

    if(key == '%'){
        if (result != 0){
            result /= 100;
            viewport.textContent = roundResult(result);
        }
        else if(updateSecond){
            num2 /= 100;
            viewport.textContent = +num2;
        }else if(!updateSecond){
            num1 /= 100;
            viewport.textContent = +num1;
        }
    
    }
    if(key == "."){
        if(updateSecond && !num2.includes('.')){
            num2 += '.'
            viewport.textContent = num2;
        }else if(!updateSecond && !num1.includes('.')){
            num1 += '.'
            viewport.textContent = num1;
        }
    }
    if(key == 'Enter' && result == Infinity){
        viewport.textContent = 'You quackin fool!';
        reset(); 
    }
}
);