var numArray = [];
var symbolArray = [];

var num1 = document.getElementById('num1');
var num2 = document.getElementById('num2');
var num3 = document.getElementById('num3');
var num4 = document.getElementById('num4');
var num5 = document.getElementById('num5');
var num6 = document.getElementById('num6');
var num7 = document.getElementById('num7');
var num8 = document.getElementById('num8');
var num9 = document.getElementById('num9');
var zero = document.getElementById('zero');
var dot = document.getElementById('dot');

var clear = document.getElementById('clear');

var display = document.getElementById('display');
var output = document.getElementById('output');

var plus = document.getElementById('plus');
var minus = document.getElementById('minus');
var times = document.getElementById("times");
var divide = document.getElementById('divide'); 

var equal = document.getElementById('equal');
var switchSign = document.getElementById('switchSign');
var percent = document.getElementById('percent');

var adding = false;
var subtracting = false;
var multiplying = false;
var dividing = false;

var negative = false;

var number = '';


clear.addEventListener("click", (e) => {
    number = number.toString();
    
    if( symbolArray[symbolArray.length - 1] == "add" || symbolArray[symbolArray.length - 1] == "subtract" || symbolArray[symbolArray.length - 1] == "multiply" || symbolArray[symbolArray.length - 1] == "divide") {
        number = display.innerText;
        let num = number.split("");
        num.pop();
        number = num.join("");
        symbolArray.pop();
    }  else {
        let num = number.split("");
        num.pop();
        number = num.join("");
        numArray.pop();
        if(number == "") {
            number = '0';
        }
    }
        display.innerText = number;
}) 

num1.addEventListener("click", () => {
    NumberButtonPush(1);
})

num2.addEventListener("click", () => {
    NumberButtonPush(2);
})

num3.addEventListener("click", () => {
    NumberButtonPush(3);
})

num4.addEventListener("click", () => {
    NumberButtonPush(4);
})

num5.addEventListener("click", () => {
    NumberButtonPush(5);
})

num6.addEventListener("click", () => {
    NumberButtonPush(6);
})

num7.addEventListener("click", () => {
    NumberButtonPush(7);
})

num8.addEventListener("click", () => {
    NumberButtonPush(8);
})

num9.addEventListener("click", () => {
    NumberButtonPush(9);
})

zero.addEventListener("click", () => { 
    NumberButtonPush(0)
})

dot.addEventListener("click", () => { 
    NumberButtonPush(".")
})

plus.addEventListener("click", () => {
    if(!adding && number != '') {
        adding = true
        numArray.push(number); 
        number = '';
        display.innerText += '+';
        symbolArray.push('add');
    }
}) 

times.addEventListener("click", () => {
    if(!multiplying && number != '') {
        multiplying = true
        numArray.push(number); 
        number = '';
        display.innerText += '*';
        symbolArray.unshift('multiply');
    }
})

divide.addEventListener("click", () => {
    if(!dividing && number != '') {
        dividing = true
        numArray.push(number); 
        number = '';
        display.innerText += '/';
        symbolArray.unshift('divide');
    }
})

minus.addEventListener("click", () => {
    if(!subtracting) {
        subtracting = true
        numArray.push(number); 
        number = '';
        display.innerText += '-';
        symbolArray.push('subtract');
    }
})

switchSign.addEventListener('click', () => {
    
    if(!negative) {
        display.innerText = "-" + display.innerText;
        negative = !negative;
    } else
    {
        let a = display.innerText.split('');
        a.shift();
        a.join();
        display.innerText = a;
        negative = !negative;
    }
})

percent.addEventListener('click', () => {
    var numPercent = Number(number)/100;
    display.innerText = numPercent;
})

equal.addEventListener("click", () => {
    
        numArray.push(number); 
        number = '';
        var result = 0;
        result = Number(numArray[0]);
    for( let i = 0; i < numArray.length; i++) {
        if(i < symbolArray.length) {
            let a = i+1;
            if(symbolArray[i] == "multiply") {
                if(negative) {
                    result *= -Number(numArray[a])
                } else {
                    result *= Number(numArray[a]);
                }
            } else if(symbolArray[i] == "divide") {
                if(negative) {
                    result /= -Number(numArray[a])
                } else {
                    result /= Number(numArray[a]);
                } 
            } else if(symbolArray[i] == "add") {
                if(negative) {
                    result += -Number(numArray[a])
                } else {
                    result += Number(numArray[a]);
                }
            } else if (symbolArray[i] == "subtract") {
                if(negative) {
                    result -= -Number(numArray[a])
                } else {
                    result -= Number(numArray[a]);
                } 
            }
        }
    }
    number = result
    display.innerText = result;
    numArray = [];
    symbolArray = [];
    result = 0;
})

function NumberButtonPush(input) {


    adding = false;
    subtracting = false;
    multiplying = false;
    dividing = false; 

   
    if(display.innerText == 0) {
        display.innerText = input;
        number += input;
    } else {
        display.innerText += input;
        number += input;
    }
}