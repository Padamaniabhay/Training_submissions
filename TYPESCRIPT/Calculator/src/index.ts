//calculator functionality
const calcMainBtn = {
  clearBtn: document.getElementById("clear")!,
  bkSpaceBtn: document.getElementById("bkSpace")!,
  degBtn: document.getElementById("deg")!,
  equalBtn: document.getElementById("equal")!,
};

//dropdown
const trigonometryBtn = document.getElementsByClassName("trigonometry")!;
const functionBtn = document.getElementsByClassName("function")!;

//trigonomatry functionality
const trigonomatryBtns = {
  sinBtn: document.getElementById("sin")!,
  cosBtn: document.getElementById("cos")!,
  tanBtn: document.getElementById("tan")!,
  cscBtn: document.getElementById("csc")!,
  secBtn: document.getElementById("sec")!,
  cotBtn: document.getElementById("cot")!,
};

//math operations
const mathOps = {
  sqrtBtn: document.getElementById("sqrt")!,
  reverseBtn: document.getElementById("reverse")!,
  tenExpBtn: document.getElementById("tenExp")!,
  logBtn: document.getElementById("log")!,
  lnBtn: document.getElementById("ln")!,
  piBtn: document.getElementById("pi")!,
  eBtn: document.getElementById("e")!,
  sqrBtn: document.getElementById("sqr")!,
  cubeBtn: document.getElementById("cube")!,
  powBtn: document.getElementById("pow")!,
  absBtn: document.getElementById("abs")!,
  factBtn: document.getElementById("factBtn")!,
  expBtn: document.getElementById("exp")!,
  modBtn: document.getElementById("mod")!,
  floorBtn: document.getElementById("floor")!,
  ceilBtn: document.getElementById("ceil")!,
  randBtn: document.getElementById("rand")!,
};

//numbers and operations
const numOperations = {
  numbers: document.querySelectorAll(".number")!,
  plusBtn: document.getElementById("plusBtn")!,
  subBtn: document.getElementById("subBtn")!,
  mulBtn: document.getElementById("mulBtn")!,
  divBtn: document.getElementById("divBtn")!,
  addBracketsBtn: document.getElementById("addBracketsBtn")!,
  closeBracketsBtn: document.getElementById("closeBracketsBtn")!,
  signChangeBtn: document.getElementById("signChange")!,
};

//memory Btns
const memoryBtns = {
  msBtn: document.getElementById("ms")!,
  mrBtn: document.getElementById("mr")!,
  mcBtn: document.getElementById("mc")!,
  mPlusBtn: document.getElementById("mplus")!,
  mMinusBtn: document.getElementById("mminus")!,
};

type Sign = "+" | "-" | "*" | "/";
type MathOperations = "sin" | "cos" | "tan" | "abs" | "sqrt";

interface Calc {
  input: HTMLInputElement;
  output: HTMLInputElement;
  evaluate(): void;
}

class Calculator implements Calc {
  input: HTMLInputElement;
  output: HTMLInputElement;
  OpenBracketCnt: number;
  private stack: number[];
  constructor() {
    this.input = document.getElementById("inputdisplay")! as HTMLInputElement;
    this.OpenBracketCnt = 0;
    this.output = document.getElementById("outputdisplay")! as HTMLInputElement;
    this.output.value = "0";
    this.stack = [];
  }

  clear(): void {
    this.input.value = "";
    this.output.value = "";
    this.OpenBracketCnt = 0;
  }

  backSpace(): void {
    //condition for closing bracket count
    if (this.input.value.slice(-1) === ")") this.OpenBracketCnt++;
    this.input.value = this.input.value.slice(0, -1);
  }

  addBrackets(): void {
    this.input.value += "(";
    this.OpenBracketCnt++;
  }

  closeBrackets(): void {
    if (this.OpenBracketCnt > 0) {
      this.input.value += ")";
      this.OpenBracketCnt--;
    }
  }

  //finding factorial of n with recursion
  fact(n: number): number {
    if (n == 1) {
      return 1;
    }
    return n * this.fact(n - 1);
  }

  appeandNumber(number: string): void {
    this.input.value += number;
  }

  appendInputstr(str: string): void {
    this.input.value += str;
  }

  appendOperation(sign: Sign): void {
    this.input.value += sign;
  }

  //math operation like sin, cos, tan, sqrt which has operand and operation
  mathOps(operation: MathOperations): string {
    this.output.value = Math[operation](parseFloat(this.input.value)).toFixed(
      2
    );
    return (this.input.value = `${operation}(${this.input.value})`);
  }

  //math operation with revese like cosec, sec, cot which has operand and operation
  mathOpsWithReverse(
    realOps: "cosec" | "sec" | "cot",
    ops: "sin" | "cos" | "tan"
  ): void {
    c.output.value = c
      .findPower(eval(Math[ops](parseFloat(c.input.value)).toString()), -1)
      .toString();
    c.input.value = `${realOps}(${c.input.value})`;
  }

  //finding power(x^y)
  findPower(x: number, y: number): number {
    return Math.pow(x, y);
  }

  //replaceAll substring with some string
  replaceStr(
    str: string,
    findStr: "Π" | "e" | "log" | "ln" | "Math.Exp" | "cMath.Eil" | "floor",
    toStr:
      | "Math.PI"
      | "Math.E"
      | "Math.log10"
      | "Math.log"
      | "Math.exp"
      | "Math.ceil"
      | "Math.floor"
  ): string {
    return str.replaceAll(findStr, () => {
      return toStr;
    });
  }

  //evaluating input string and display output
  evaluate(): void {
    try {
      const str = this.input.value;

      //factorial replacement
      let newStr: string = str.replaceAll(/\d+\!/g, (x: string) => {
        const n = parseFloat(x.slice(0, -1));
        return this.fact(n).toString();
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
      newStr = newStr.replaceAll(/\d+\^\d+/g, (x: string): string => {
        return this.findPower(
          parseFloat(x.slice(0, x.indexOf("^"))),
          parseFloat(x.slice(x.indexOf("^") + 1))
        ).toString();
      });

      this.output.value = eval(newStr) || "";
    } catch (err) {
      this.output.value = "ERROR";
    }
  }

  //memory operation functions
  memoryStore = (): void => {
    this.stack.push(parseFloat(this.output.value));
    this.input.value = "0";
    console.log("Stack : ", this.stack);
  };

  memoryRestore = (): void => {
    this.input.value = this.stack.pop()?.toString()!;
    console.log("Stack : ", this.stack);
  };

  memoryClear = (): void => {
    this.stack = [];
    console.log("Stack : ", this.stack);
  };

  memoryPlus = (): void => {
    this.input.value = "0";
    this.stack[this.stack.length - 1] += parseInt(this.output.value);
    console.log("Stack : ", this.stack);
  };

  memoryMinus = (): void => {
    this.input.value = "0";
    this.stack[this.stack.length - 1] -= parseInt(this.output.value);
    console.log("Stack : ", this.stack);
  };
}

const c = new Calculator();

//calculator functionality
calcMainBtn.clearBtn.addEventListener("click", c.clear.bind(c));
calcMainBtn.bkSpaceBtn.addEventListener("click", c.backSpace.bind(c));
calcMainBtn.equalBtn.addEventListener("click", c.evaluate.bind(c));

//trigonometry operations
trigonomatryBtns.sinBtn.addEventListener("click", c.mathOps.bind(c, "sin"));
trigonomatryBtns.cosBtn.addEventListener("click", c.mathOps.bind(c, "cos"));
trigonomatryBtns.tanBtn.addEventListener("click", c.mathOps.bind(c, "tan"));
trigonomatryBtns.cscBtn.addEventListener(
  "click",
  c.mathOpsWithReverse.bind(c, "cosec", "sin")
);
trigonomatryBtns.secBtn.addEventListener(
  "click",
  c.mathOpsWithReverse.bind(c, "sec", "cos")
);
trigonomatryBtns.cotBtn.addEventListener(
  "click",
  c.mathOpsWithReverse.bind(c, "cot", "tan")
);

//math operations
mathOps.sqrtBtn.addEventListener("click", c.mathOps.bind(c, "sqrt"));
mathOps.reverseBtn.addEventListener("click", () => {
  c.evaluate();
  c.input.value = `1/(${c.input.value})`;
  c.output.value = c.findPower(parseFloat(c.output.value), -1).toString();
});
mathOps.sqrBtn.addEventListener("click", c.appendInputstr.bind(c, "^2"));
mathOps.cubeBtn.addEventListener("click", c.appendInputstr.bind(c, "^3"));
mathOps.tenExpBtn.addEventListener("click", c.appendInputstr.bind(c, "10^"));
mathOps.powBtn.addEventListener("click", c.appendInputstr.bind(c, "^"));
mathOps.piBtn.addEventListener("click", c.appendInputstr.bind(c, "Π"));
mathOps.eBtn.addEventListener("click", c.appendInputstr.bind(c, "e"));
mathOps.factBtn.addEventListener("click", c.appendInputstr.bind(c, "!"));
mathOps.modBtn.addEventListener("click", c.appendInputstr.bind(c, "%"));
mathOps.absBtn.addEventListener("click", c.mathOps.bind(c, "abs"));
mathOps.expBtn.addEventListener("click", (): void => {
  c.appendInputstr("exp(");
  c.OpenBracketCnt++;
});
mathOps.ceilBtn.addEventListener("click", (): void => {
  c.appendInputstr("ceil(");
  c.OpenBracketCnt++;
});
mathOps.floorBtn.addEventListener("click", (): void => {
  c.appendInputstr("floor(");
  c.OpenBracketCnt++;
});
mathOps.randBtn.addEventListener("click", (): void => {
  c.output.value = Math.random().toString();
});

mathOps.logBtn.addEventListener("click", (): void => {
  c.appendInputstr("log(");
  c.OpenBracketCnt++;
});
mathOps.lnBtn.addEventListener("click", (): void => {
  c.appendInputstr("ln(");
  c.OpenBracketCnt++;
});

//adding listner to all numbers using forEach
numOperations.numbers.forEach((number: Element): void => {
  number.addEventListener("click", c.appeandNumber.bind(c, number.innerHTML));
});

//operations
numOperations.plusBtn.addEventListener("click", c.appendOperation.bind(c, "+"));
numOperations.subBtn.addEventListener("click", c.appendOperation.bind(c, "-"));
numOperations.mulBtn.addEventListener("click", c.appendOperation.bind(c, "*"));
numOperations.divBtn.addEventListener("click", c.appendOperation.bind(c, "/"));
numOperations.signChangeBtn.addEventListener("click", () => {
  c.output.value = (-1 * parseFloat(c.output.value)).toString();
});

//Brackets
numOperations.addBracketsBtn.addEventListener("click", c.addBrackets.bind(c));
numOperations.closeBracketsBtn.addEventListener(
  "click",
  c.closeBrackets.bind(c)
);

//toggleing degree and radian button
calcMainBtn.degBtn.addEventListener("click", (): void => {
  calcMainBtn.degBtn.innerHTML =
    calcMainBtn.degBtn.innerHTML === "RAD" ? "DEG" : "RAD";
  calcMainBtn.degBtn.style.backgroundColor = "#00FFFF";
  if (calcMainBtn.degBtn.innerHTML === "DEG")
    calcMainBtn.degBtn.style.backgroundColor = "#FFFFFF";
});

//dropdown event listners
trigonometryBtn[0].addEventListener("click", (): void => {
  (trigonometryBtn[0].childNodes[3] as HTMLDivElement).classList.toggle(
    "visible"
  );
  (functionBtn[0].childNodes[3] as HTMLDivElement).className =
    "grid-container sub-section";
});

functionBtn[0].addEventListener("click", (): void => {
  (trigonometryBtn[0].childNodes[3] as HTMLDivElement).className =
    "grid-container sub-section";
  (functionBtn[0].childNodes[3] as HTMLDivElement).classList.toggle("visible");
});

//memory listners
memoryBtns.msBtn.addEventListener("click", c.memoryStore);
memoryBtns.mrBtn.addEventListener("click", c.memoryRestore);
memoryBtns.mcBtn.addEventListener("click", c.memoryClear);
memoryBtns.mPlusBtn.addEventListener("click", c.memoryPlus);
memoryBtns.mMinusBtn.addEventListener("click", c.memoryMinus);
