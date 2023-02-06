//calculator functionality
const clearBtn = document.getElementById("clear");
const bkSpaceBtn = document.getElementById("bkSpace");
const degBtn = document.getElementById("deg");

//dropdown
const trigonometryBtn = document.getElementsByClassName("trigonometry");
const functionBtn = document.getElementsByClassName("function");

//trigonomatry functionality
const sinBtn = document.getElementById("sin");
const cosBtn = document.getElementById("cos");
const tanBtn = document.getElementById("tan");
const cscBtn = document.getElementById("csc");
const secBtn = document.getElementById("sec");
const cotBtn = document.getElementById("cot");

//math operations
const sqrtBtn = document.getElementById("sqrt");
const reverseBtn = document.getElementById("reverse");
const tenExpBtn = document.getElementById("tenExp");
const logBtn = document.getElementById("log");
const lnBtn = document.getElementById("ln");
const piBtn = document.getElementById("pi");
const eBtn = document.getElementById("e");
const sqrBtn = document.getElementById("sqr");
const cubeBtn = document.getElementById("cube");
const powBtn = document.getElementById("pow");
const absBtn = document.getElementById("abs");
const factBtn = document.getElementById("factBtn");
const expBtn = document.getElementById("exp");
const modBtn = document.getElementById("mod");
const floorBtn = document.getElementById("floor");
const ceilBtn = document.getElementById("ceil");
const randBtn = document.getElementById("rand");

//numbers and operatiors
const numbers = document.querySelectorAll(".number");
const plusBtn = document.getElementById("plusBtn");
const subBtn = document.getElementById("subBtn");
const mulBtn = document.getElementById("mulBtn");
const divBtn = document.getElementById("divBtn");
const addBracketsBtn = document.getElementById("addBracketsBtn");
const closeBracketsBtn = document.getElementById("closeBracketsBtn");
const equalBtn = document.getElementById("equal");
const signChangeBtn = document.getElementById("signChange");

//memory Btns
const msBtn = document.getElementById("ms");
const mrBtn = document.getElementById("mr");
const mcBtn = document.getElementById("mc");
const mPlusBtn = document.getElementById("mplus");
const mMinusBtn = document.getElementById("mminus");

class Calculator {
  constructor() {
    this.input = document.getElementById("inputdisplay");
    this.OpenBracketCnt = 0;
    this.output = document.getElementById("outputdisplay");
    this.output.value = "0";
    this.stack = [];
  }

  clear() {
    this.input.value = "";
    this.output.value = "";
    this.OpenBracketCnt = 0;
  }

  backSpace() {
    //condition for closing bracket count
    if (this.input.value.slice(-1) === ")") this.OpenBracketCnt++;
    this.input.value = this.input.value.slice(0, -1);
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

  //finding factorial of n with recursion
  fact(n) {
    if (n == 1) {
      return 1;
    }
    return n * this.fact(n - 1);
  }

  appeandNumber(number) {
    this.input.value += number;
  }

  appendInputstr(str) {
    this.input.value += str;
  }

  appendOperation(sign) {
    this.input.value += sign;
  }

  //math operation like sin, cos, tan, sqrt which has operand and operation
  mathOps(operation) {
    this.output.value = Math[operation](parseFloat(this.input.value)).toFixed(
      2
    );
    return (this.input.value = `${operation}(${this.input.value})`);
  }

  //math operation with revese like cosec, sec, cot which has operand and operation
  mathOpsWithReverse(realOps, ops) {
    c.output.value = c.findPower(
      eval(Math[ops](parseFloat(c.input.value))),
      -1
    );
    c.input.value = `${realOps}(${c.input.value})`;
  }

  //finding power(x^y)
  findPower(x, y) {
    return Math.pow(x, y);
  }

  //replaceAll substring with some string
  replaceStr(str, findStr, replaceStr) {
    return str.replaceAll(findStr, () => {
      return replaceStr;
    });
  }

  //evaluating input string and display output
  evaluate() {
    try {
      const str = this.input.value;

      //factorial replacement
      let newStr = str.replaceAll(/\d+\!/g, (x) => {
        const n = parseFloat(x.slice(0, -1));
        return this.fact(n);
      });

      //pi replacement
      newStr = this.replaceStr(newStr, "Π", "Math.PI");

      //e replacement
      newStr = this.replaceStr(newStr, "e", "Math.E");

      //log replacement
      newStr = this.replaceStr(newStr, "log", "Math.log10");

      //ln replacement
      newStr = this.replaceStr(newStr, "ln", "Math.log");

      //exp replacement
      newStr = this.replaceStr(newStr, "Math.Exp", "Math.exp");

      //ceil replacement
      newStr = this.replaceStr(newStr, "cMath.Eil", "Math.ceil");

      //floor replacement
      newStr = this.replaceStr(newStr, "floor", "Math.floor");

      //x^y, x^2 replacement
      newStr = newStr.replaceAll(/\d+\^\d+/g, (x) => {
        return this.findPower(
          parseFloat(x.slice(0, parseFloat(x.indexOf("^")))),
          parseFloat(x.slice(parseFloat(parseFloat(x.indexOf("^") + 1))))
        );
      });

      this.output.value = eval(newStr) || "";
    } catch (err) {
      this.output.value = "ERROR";
    }
  }

  //memory operation functions
  memoryStore = () => {
    this.stack.push(parseInt(this.output.value));
    this.input.value = 0;
    console.log("Stack : ", this.stack);
  };

  memoryRestore = () => {
    this.input.value = this.stack.pop();
    console.log("Stack : ", this.stack);
  };

  memoryClear = () => {
    this.stack = [];
    console.log("Stack : ", this.stack);
  };

  memoryPlus = () => {
    this.input.value = 0;
    this.stack[this.stack.length - 1] += parseInt(this.output.value);
    console.log("Stack : ", this.stack);
  };

  memoryMinus = () => {
    this.input.value = 0;
    this.stack[this.stack.length - 1] -= parseInt(this.output.value);
    console.log("Stack : ", this.stack);
  };
}

const c = new Calculator();

//calculator functionality
clearBtn.addEventListener("click", c.clear.bind(c));
bkSpaceBtn.addEventListener("click", c.backSpace.bind(c));
equalBtn.addEventListener("click", c.evaluate.bind(c));

//trigonometry operations
sinBtn.addEventListener("click", c.mathOps.bind(c, "sin"));
cosBtn.addEventListener("click", c.mathOps.bind(c, "cos"));
tanBtn.addEventListener("click", c.mathOps.bind(c, "tan"));
cscBtn.addEventListener("click", c.mathOpsWithReverse.bind(c, "cosec", "sin"));
secBtn.addEventListener("click", c.mathOpsWithReverse.bind(c, "sec", "cos"));
cotBtn.addEventListener("click", c.mathOpsWithReverse.bind(c, "cot", "tan"));

//math operations
sqrtBtn.addEventListener("click", c.mathOps.bind(c, "sqrt"));
reverseBtn.addEventListener("click", () => {
  c.evaluate();
  c.input.value = `1/(${c.input.value})`;
  c.output.value = c.findPower(parseFloat(c.output.value), -1);
});
sqrBtn.addEventListener("click", c.appendInputstr.bind(c, "^2"));
cubeBtn.addEventListener("click", c.appendInputstr.bind(c, "^3"));
tenExpBtn.addEventListener("click", c.appendInputstr.bind(c, "10^"));
powBtn.addEventListener("click", c.appendInputstr.bind(c, "^"));
piBtn.addEventListener("click", c.appendInputstr.bind(c, "Π"));
eBtn.addEventListener("click", c.appendInputstr.bind(c, "e"));
factBtn.addEventListener("click", c.appendInputstr.bind(c, "!"));
modBtn.addEventListener("click", c.appendInputstr.bind(c, "%"));
absBtn.addEventListener("click", c.mathOps.bind(c, "abs"));
expBtn.addEventListener("click", () => {
  c.appendInputstr("exp(");
  c.OpenBracketCnt++;
});
ceilBtn.addEventListener("click", () => {
  c.appendInputstr("ceil(");
  c.OpenBracketCnt++;
});
floorBtn.addEventListener("click", () => {
  c.appendInputstr("floor(");
  c.OpenBracketCnt++;
});
randBtn.addEventListener("click", () => {
  c.output.value = Math.random();
});

signChangeBtn.addEventListener("click", () => {
  c.output.value = -1 * parseFloat(c.output.value);
});
logBtn.addEventListener("click", () => {
  c.appendInputstr("log(");
  c.OpenBracketCnt++;
});
lnBtn.addEventListener("click", () => {
  c.appendInputstr("ln(");
  c.OpenBracketCnt++;
});

//adding listner to all numbers using forEach
numbers.forEach((number) => {
  number.addEventListener("click", c.appeandNumber.bind(c, number.innerHTML));
});

//operations
plusBtn.addEventListener("click", c.appendOperation.bind(c, "+"));
subBtn.addEventListener("click", c.appendOperation.bind(c, "-"));
mulBtn.addEventListener("click", c.appendOperation.bind(c, "*"));
divBtn.addEventListener("click", c.appendOperation.bind(c, "/"));

//Brackets
addBracketsBtn.addEventListener("click", c.addBrackets.bind(c));
closeBracketsBtn.addEventListener("click", c.closeBrackets.bind(c));

//toggleing degree and radian button
degBtn.addEventListener("click", () => {
  degBtn.innerHTML = degBtn.innerHTML === "RAD" ? "DEG" : "RAD";
  degBtn.style.backgroundColor = "#00FFFF";
  if (degBtn.innerHTML === "DEG") degBtn.style.backgroundColor = "#FFFFFF";
});

//dropdown event listners
trigonometryBtn[0].addEventListener("click", () => {
  trigonometryBtn[0].childNodes[3].classList.toggle("visible");
  functionBtn[0].childNodes[3].className = "grid-container sub-section";
});

functionBtn[0].addEventListener("click", () => {
  trigonometryBtn[0].childNodes[3].className = "grid-container sub-section";
  functionBtn[0].childNodes[3].classList.toggle("visible");
});

//memory listners
msBtn.addEventListener("click", c.memoryStore);
mrBtn.addEventListener("click", c.memoryRestore);
mcBtn.addEventListener("click", c.memoryClear);
mPlusBtn.addEventListener("click", c.memoryPlus);
mMinusBtn.addEventListener("click", c.memoryMinus);
