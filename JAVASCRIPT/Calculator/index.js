const degbtn = document.getElementById("deg");
const trigonomatrybtn = document.getElementsByClassName("trigonometry");
const functionbtn = document.getElementsByClassName("function");
const input = document.getElementById("inputdisplay");
const clearBtn = document.getElementById("clear");
const bkSpaceBtn = document.getElementById("bkSpace");
const sqrtBtn = document.getElementById("sqrt");
const sinBtn = document.getElementById("sin");
const cosBtn = document.getElementById("cos");
const tanBtn = document.getElementById("tan");
const logBtn = document.getElementById("log");
const lnBtn = document.getElementById("ln");

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

class Calculator {
  constructor(inputEle) {
    this.input = inputEle;
    this.stack = [];
  }

  clear() {
    this.input.value = "";
    this.input.innerHTML = "";
  }

  backeSpace() {
    this.input.value = this.input.value.slice(0, -1);
    this.input.innerHTML = this.input.value;
  }

  fact(n) {
    return n * this.fact(n - 1);
  }

  mathOps(operation) {
    // console.log(operation);
    this.input.value = Math[operation](parseFloat(this.input.value)).toFixed(2);
  }

  mathValue(oprand) {
    return Math[oprand];
  }
}

const c = new Calculator(input);

clearBtn.addEventListener("click", c.clear.bind(c));
bkSpaceBtn.addEventListener("click", c.backeSpace.bind(c));
bkSpaceBtn.addEventListener("click", c.backeSpace.bind(c));
sqrtBtn.addEventListener("click", c.mathOps.bind(c, "sqrt"));
cosBtn.addEventListener("click", c.mathOps.bind(c, "cos"));
tanBtn.addEventListener("click", c.mathOps.bind(c, "tan"));
logBtn.addEventListener("click", c.mathOps.bind(c, "log10"));
lnBtn.addEventListener("click", c.mathOps.bind(c, "log"));
