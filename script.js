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

let num1 = 0;
let op;
let num2 = 0;
let updateSecond = false;
let result = 0;
let reset = () => {
    num1=0;
    num2=0;
    op=undefined;
}

calcButtons.forEach((button) =>{
    button.addEventListener("click", (e) => {
        const classList = e.target.classList;
        if(op == 'divide' && num2 == 0 && e.target.id === 'equal'){
            viewport.textContent = 'You quackin fool!';
            reset();
            
        }
        if(classList.contains("number") && updateSecond){
            num2 += e.target.textContent;
            viewport.textContent = +num2;
            console.log(`updating num2: ${num2}`);
        }else if(classList.contains("number") && !updateSecond){
            num1 += e.target.textContent;
            viewport.textContent = +num1;
            console.log(`updating num1: ${num1}`)
        }
        if(classList.contains("operator") && ['plus', 'minus','divide','multiply'].includes(e.target.id)){

            if(num1 != 0 && num2 != 0){
                console.log("in place evaluation triggered!")
                result = operate(+num1, op, +num2);
                console.log(`result stored in memory is ${result}`)
                viewport.textContent = result;
                num1 = result;
                num2 = 0;
                console.log(`num1: ${num1}`)
                console.log(`num2: ${num2}`)
            }
            op = e.target.id;
            updateSecond = true;
            console.log(op)
        }
        if(e.target.id === 'equal' && num1 != 0 && num2 != 0){
            console.log(`num1: ${num1}`)
            console.log(`num2: ${num2}`)
            result = operate(+num1, op, +num2);
            updateSecond = false;
            viewport.textContent = result;
            console.log(`stored result is ${result}`);
        }
        if(e.target.id === 'ac'){
            viewport.textContent = '0';
            reset();
        }
    }
)});
// viewport starts off as 0
// number clicks enters digits one by one, updates num1, "1" + "2" = "12"
// operator is clicked (does not show up in viewport!) "="
// next tap after operator tap sets viewport to that number "7"
// next tap "-" sets viewport to 12 + 7 = 19
// next tap "1" sets viewport to 1
// hitting equal "=" sets 19-1 = 18

// so operators are never shown
// needs to be a loop of some kind, same button can be pressed more than once

// how to update the variables in the correct order?
// button gets clicks, read its class
// if class is number and operator is defined, then update num2 else update num1