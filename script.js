let add = (x1, x2) => x1 + x2;
let subtract = (x1, x2) => x1 - x2;
let multiply = (x1, x2) => x1 * x2;
let divide = (x1, x2) => x1 / x2;

let num1;
let op;
let num2;

let operate = (num1, op, num2) => {
    if (op == "+"){
        return add(num1, num2);
    }else if(op == "-"){
        return subtract(num1, num2);
    }else if(op == "*"){
        return multiply(num1, num2)
    }else if(op == "/"){
        return divide(num1,num2);
    }
}

const calcButtons = document.querySelectorAll(".calc-button");
const viewport = document.querySelector(".viewport p");


calcButtons.forEach((button) =>{
    button.addEventListener("click", (e) => {
        const classList = e.target.classList;
        if(classList.contains('number')){
            if (viewport.textContent === '0'){viewport.textContent = e.target.textContent;}
            else{viewport.textContent += e.target.textContent;}
                
        }
})})