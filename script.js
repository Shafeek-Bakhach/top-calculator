let add = (x1, x2) => x1 + x2;
let subtract = (x1, x2) => x1 - x2;
let multiply = (x1, x2) => x1 * x2;
let divide = (x1, x2) => x1 / x2;

let num1 = 0;
let op;
let num2 = 0;
let result = 0;

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

calcButtons.forEach((button) =>{
    button.addEventListener("click", (e) => {
        const classList = e.target.classList;
        if(classList.contains('number') && !op){
            num1 += e.target.textContent;
            viewport.textContent = +num1;
        }else if(classList.contains('operator') && !op){
            op = e.target.id;
            viewport.textContent += ' ' + e.target.textContent + ' ';
        }else if(num1 && op && classList.contains('number')){
            num2 += e.target.textContent;
            viewport.textContent += e.target.textContent;
        }else if(e.target.id === 'equal'){
            result = operate(+num1, op, +num2);
            viewport.textContent = result;
        }
    })
})

// if class is number and num1 = 0 then update num1
// elseif class is operator and op is undefined, fill in only one operator value
// elseif both num1 and op are not undefined, then update num2
// if equal is clicked, check if divide operator is being used and if 0 is num2, if so return snarky text else return result of operate
// update viewport text with result of operate