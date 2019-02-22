class Calculator {
    constructor(number = 0.0, operand = [], operation = []){
        this.number = number;
        this.operand = operand;
        this.operations = operation;
    }

    result = 0;

    preformOperation(operation, number) {
        if(operation === 'add' || operation === 'subtract') {
            this.operations.push(operation);
            this.setOperand(number);
        } else {
            this.operations.unshift(operation);
            this.setOperand(number);
        }
    }

    equal() {
        this.result = Number(this.number);
        let count = 0;
        this.operations.forEach(operation => {
            switch(operation) {
                case 'divide':
                    this.result = Number(this.operand[count]) / this.result;
                    break;
                case 'multiply':
                    this.result *= Number(this.operand[count]);
                    break;
                case "add": 
                    this.result += Number(this.operand[count]);
                    break;
                case "subtract":
                    this.result = Number(this.operand[count]) - this.result;
                    break;
                default:
                    console.log('Hi');
                    break;
            }
            count++;
        })
        this.operand = [];
        this.operations = [];
        return this.result;
    }

    showNumber() {
        return this.number;
    }

    setNumber(number) {
        this.number = number;
    }

    setOperand(operand) {
        this.operand.unshift(parseFloat(operand));
    }

    percent() {
        this.setNumber(this.number * 100);
        return this.number;
    }

    reset() {
        this.number = 0;
        this.operand = [];
        this.operations = [];
        return this.number;
    }

}

const calc = new Calculator(0);

const numBtns = document.querySelectorAll('.numBtn');
const display = document.getElementById('display');
let buttonLock = false;

numBtns.forEach(btn => btn.addEventListener("click", () => {
    if(btn.dataset.num ) {
        if(buttonLock) {
            display.innerText = calc.reset();
            buttonLock = false
        } else {
            let number = calc.showNumber();
            if(number === 0) {
                number = btn.dataset.num;
            } else {
                number += btn.dataset.num;
            }
    
            if(display.innerText == 0) {
                display.innerText = btn.dataset.num;
            } else {
                display.innerText += btn.dataset.num;
            }
            calc.setNumber(number);
        }
    }
    if(btn.dataset.operation) {
        if(!buttonLock) {
            switch(btn.dataset.operation) {
                case "add":    
                        calc.preformOperation('add', calc.showNumber());
                        calc.setNumber(0);
                        display.innerText += '+';
                        break;
                case "subtract":
                        calc.preformOperation('subtract', calc.showNumber());
                        calc.setNumber(0);
                        display.innerText += '-';
                        break;
                case "multiply":
                        calc.preformOperation('multiply', calc.showNumber());
                        calc.setNumber(0);
                        display.innerText += '*';
                        break;
                case "divide":
                        calc.preformOperation('divide', calc.showNumber());
                        calc.setNumber(0);
                        display.innerText += '/';
                        break;
                case "equal":
                        let result = calc.equal();
                        display.innerText = result;
                        calc.setNumber(Number(result));
                        break;
                case "clear":
                    display.innerText = calc.reset();
                    buttonLock = false
                    break;  
                case 'percent':
                    display.innerText = "%" + calc.percent();
                    buttonLock = true;
                default:
                    break;

            }
        } else {
            display.innerText = calc.reset();
            buttonLock = false
        }
    }
}));






