const degbtn = document.getElementById("deg");
const trigonomatrybtn = document.getElementsByClassName("trigonometry");
const functionbtn = document.getElementsByClassName("function");
const clearBtn = document.getElementById("clear");
const bkSpaceBtn = document.getElementById("bkSpace");
const sqrtBtn = document.getElementById("sqrt");
const sinBtn = document.getElementById("sin");
const cosBtn = document.getElementById("cos");
const tanBtn = document.getElementById("tan");
const logBtn = document.getElementById("log");
const lnBtn = document.getElementById("ln");
const numbers = document.querySelectorAll(".number");
const plusBtn = document.getElementById("plusBtn");
const subBtn = document.getElementById("subBtn");
const mulBtn = document.getElementById("mulBtn");
const divBtn = document.getElementById("divBtn");
const addBracketsBtn = document.getElementById("addBracketsBtn");
const closeBracketsBtn = document.getElementById("closeBracketsBtn");
const factBtn = document.getElementById("factBtn");
const equalBtn = document.getElementById("equal");


class Calculator {
  constructor() {
    this.stack = [];
    this.input = document.getElementById("inputdisplay");
    this.OpenBracketCnt = 0;
    this.output = document.getElementById("outputdisplay");
  }

  clear() {
    this.input.value = "";
    this.output.value = "";
  }

  backeSpace() {
    this.input.value = this.input.value.slice(0, -1);
  }

  evaluate() {
    this.output.value = eval(this.input.value);
    this.input.value = "";
  }

  addBrackets() {
    this.input.value += "(";
    this.OpenBracketCnt++;
  }

  closeBrackets() {
    if (this.OpenBracketCnt > 0) {
      this.input.value += ")";
      this.OpenBracketCnt--;
    }
  }

  fact(n) {
    if (n == 1) {
      return 1;
    }
    return n * this.fact(n - 1);
  }

  appeandNumber(number) {
    this.input.value += number;
  }

  operation(sign) {
    this.input.value += sign;
  }

  mathOps(operation) {
    this.output.value = Math[operation](parseFloat(this.input.value)).toFixed(2);
    this.input.value = `${operation}(${this.input.value})`
  }

  mathValue(oprand) {
    this.output.value = Math[oprand].toFixed(2);
  }
}

const c = new Calculator();


//calculator functionality
clearBtn.addEventListener("click", c.clear.bind(c));
bkSpaceBtn.addEventListener("click", c.backeSpace.bind(c));
equalBtn.addEventListener("click", c.evaluate.bind(c));

//math operations
sqrtBtn.addEventListener("click", c.mathOps.bind(c, "sqrt"));
sinBtn.addEventListener("click", c.mathOps.bind(c, "sin"));
cosBtn.addEventListener("click", c.mathOps.bind(c, "cos"));
tanBtn.addEventListener("click", c.mathOps.bind(c, "tan"));
logBtn.addEventListener("click", c.mathOps.bind(c, "log10"));
lnBtn.addEventListener("click", c.mathOps.bind(c, "log"));
factBtn.addEventListener("click", () => {
  c.output.value = c.fact(c.input.value)
});


//adding listner to all numbers using forEach
numbers.forEach((number) => {
  number.addEventListener("click", c.appeandNumber.bind(c, number.innerHTML));
});


//operations
plusBtn.addEventListener("click", c.operation.bind(c, "+"));
subBtn.addEventListener("click", c.operation.bind(c, "-"));
mulBtn.addEventListener("click", c.operation.bind(c, "*"));
divBtn.addEventListener("click", c.operation.bind(c, "/"));



//Brackets
addBracketsBtn.addEventListener('click', c.addBrackets.bind(c));
closeBracketsBtn.addEventListener('click', c.closeBrackets.bind(c));





//toggleing degree and radian
degbtn.addEventListener("click", () => {
  degbtn.innerHTML = degbtn.innerHTML === "RAD" ? "DEG" : "RAD";
});

trigonomatrybtn[0].addEventListener("click", () => {
  trigonomatrybtn[0].childNodes[3].classList.toggle("visible");
  functionbtn[0].childNodes[3].className = "grid-container sub-section";
});

functionbtn[0].addEventListener("click", () => {
  trigonomatrybtn[0].childNodes[3].className = "grid-container sub-section";
  functionbtn[0].childNodes[3].classList.toggle("visible");
});
