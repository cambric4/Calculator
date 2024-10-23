let displayScreen = document.querySelector("#display");
let displayResult = 0;
let decimalResult =0;
let firstOperand = 0;
let secondOperand = 0;
let operator = "";
let decimalCount = 0;

displayOutput(0);

let numPressed = document.querySelectorAll(".numbers")
numPressed.forEach(element => {
    element.addEventListener("click", ()=>{

        let operatorBtns = document.querySelectorAll(".operator")
        operatorBtns.forEach(element => {
            if (element.style.opacity = "0.5"){
                element.style.opacity = "1";
            }
        })
        if(element.value == "decimal" && decimalCount == 0){
            enterDecimal();
            return;
        } else if (element.value == "decimal"){
            return;
        } else
            enterNumber (+element.value);
        if (decimalCount != 0)
            decimalCount++;
    })
})

let operatorPressed = document.querySelectorAll(".operator")
operatorPressed.forEach(element => {
    element.addEventListener("click", () => {
        if(decimalCount != 0)
            decimalCount = 0;
        if( displayResult != 0 && typeof(displayResult) == "number" && firstOperand == 0){
            if (decimalResult != 0)
                firstOperand = decimalResult;
            else
            firstOperand = displayResult;
            displayResult = 0;

            element.style.opacity= "0.5";
            operator = element.value;
        } else if (displayResult != 0 && typeof(displayResult) == "number" && secondOperand == 0 && element.value !="equals"){
            secondOperand = displayResult;
            
            operation(firstOperand,operator,secondOperand);
            displayResult = 0;
            element.style.opacity= "0.5";
            operator = element.value;
        } else{
            secondOperand = displayResult;
            
            operation(firstOperand,operator,secondOperand);
            displayResult = 0;
        }
    })
})

function displayOutput(Result) {
    displayScreen.innerHTML = Result;
}


function operation(num1, operator, num2) {
    if (operator == "+")
        displayResult = num1+num2;
    else if (operator == "-")
        displayResult = num1-num2;
    else if (operator == "*")
        displayResult = num1*num2;
    else if (operator == "/")
        displayResult = num1/num2;
    else
        displayResult = "Error";

    firstOperand = displayResult;
    if(secondOperand != 0){
        operator = 0;
        secondOperand = 0;
    }
    displayOutput(displayResult);
}


function percentage(number){
    displayResult = number/100;
}


function enterNumber(newNumber){
    displayResult *= 10;
    displayResult += newNumber;

    if(decimalCount != 0){
        decimalResult = displayResult / (Math.pow(10,decimalCount));
        displayOutput(decimalResult);
        return;
    }
    displayOutput(displayResult);
}

function enterDecimal(){
    displayScreen.innerHTML = `${displayResult}.`;
    decimalCount++;
}

document.querySelectorAll(".controls").forEach(element => {
    let controlPressed = element.addEventListener("click",()=>{
        if (element.value == "clear"){
            clearDisplay();
        } else if(element.value == "signChange"){
            if(decimalCount == 0){
                displayResult *= -1;
                displayOutput(displayResult);
            } else{
                decimalResult *= -1;
                displayOutput(decimalResult);
            }
        } else{
                if(decimalCount == 0){
                displayResult /= 100;
                displayOutput(displayResult);
            } else{
                decimalResult /= 100;
                displayOutput(decimalResult);
            }
        }
    })
})
function clearDisplay(){
    firstOperand = 0;
    secondOperand = 0;
    operator = "";
    displayResult = 0;
    displayOutput(displayResult);
    decimalCount = 0;
}