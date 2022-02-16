let calcSecondFlag = true; 
let degFlag = true;
let trigonometryInverseFlag = true;
let trigonometryHyperbolicFlag = true;
let feFlag = true;
// Column-1 function change on pressing the "2nd" button.
function handleCalcSecondBtn() {
  if (calcSecondFlag) {
    document.getElementById("calcSecondBtn").style.backgroundColor = 
      "var(--function-change-btns-background)";
    document.getElementById("square").innerHTML = "&#119909;<sup>3</sup>";
    document.getElementById("root").innerHTML = "&#8731;&#119909;";
    document.getElementById("power").innerHTML = "<sup>y</sup>&radic;&#119909;";
    document.getElementById("power10").innerHTML = "2<sup>&#119909;</sup>";
    document.getElementById("log").innerHTML = "log<sub>2</sub>&#119909;";
    document.getElementById("ln").innerHTML = "e<sup>&#119909;</sup>";
    calcSecondFlag = !calcSecondFlag;
  } else {
    document.getElementById("calcSecondBtn").style.backgroundColor =
      "var(--operator-background)";
    document.getElementById("square").innerHTML = "&#119909;<sup>2</sup>";
    document.getElementById("root").innerHTML = "&radic;&#119909;";
    document.getElementById("power").innerHTML = "&#119909;<sup>y</sup>";
    document.getElementById("power10").innerHTML = "10<sup>&#119909;</sup>";
    document.getElementById("log").innerHTML = "log";
    document.getElementById("ln").innerHTML = "ln";
    calcSecondFlag = !calcSecondFlag;
  }
}
// For 2nd button under trigonomatry functions
function handleTrigonometryInverse() {
  if (trigonometryInverseFlag) {
    document.getElementById("trigonometryInverse").style.backgroundColor = 
      "var(--function-change-btns-background)";
    if (trigonometryHyperbolicFlag) {
      document.getElementById("sin").innerHTML = "sin<sup>-1</sup>";
      document.getElementById("cos").innerHTML = "cos<sup>-1</sup>";
      document.getElementById("tan").innerHTML = "tan<sup>-1</sup>";
      trigonometryInverseFlag = !trigonometryInverseFlag;
    } else {
      document.getElementById("sin").innerHTML = "sin<sup>-1</sup>h";
      document.getElementById("cos").innerHTML = "cos<sup>-1</sup>h";
      document.getElementById("tan").innerHTML = "tan<sup>-1</sup>h";
      trigonometryInverseFlag = !trigonometryInverseFlag;
    }
  } else {
    document.getElementById("trigonometryInverse").style.backgroundColor = 
      "var(--main-background)";
    if (trigonometryHyperbolicFlag) {
      document.getElementById("sin").innerHTML = "sin";
      document.getElementById("cos").innerHTML = "cos";
      document.getElementById("tan").innerHTML = "tan";
      trigonometryInverseFlag = !trigonometryInverseFlag;
    } else {
      document.getElementById("sin").innerHTML = "sinh";
      document.getElementById("cos").innerHTML = "cosh";
      document.getElementById("tan").innerHTML = "tanh";
      trigonometryInverseFlag = !trigonometryInverseFlag;
    }
  }
}
// For hyp button under trigonomatry functions
function handleTrigonometryHyperbolic() {
  if (trigonometryHyperbolicFlag) {
    document.getElementById("trigonometryHyperbolic").style.backgroundColor = 
      "var(--function-change-btns-background)";
    if (trigonometryInverseFlag) {
      document.getElementById("sin").innerHTML = "sinh";
      document.getElementById("cos").innerHTML = "cosh";
      document.getElementById("tan").innerHTML = "tanh";
      trigonometryHyperbolicFlag = !trigonometryHyperbolicFlag;
    } else {
      document.getElementById("sin").innerHTML = "sin<sup>-1</sup>h";
      document.getElementById("cos").innerHTML = "cos<sup>-1</sup>h";
      document.getElementById("tan").innerHTML = "tan<sup>-1</sup>h";
      trigonometryHyperbolicFlag = !trigonometryHyperbolicFlag;
    }
  } else {
    document.getElementById("trigonometryHyperbolic").style.backgroundColor = 
      "var(--main-background)";
    if (trigonometryInverseFlag) {
      document.getElementById("sin").innerHTML = "sin";
      document.getElementById("cos").innerHTML = "cos";
      document.getElementById("tan").innerHTML = "tan";
      trigonometryHyperbolicFlag = !trigonometryHyperbolicFlag;
    } else {
      document.getElementById("sin").innerHTML = "sin<sup>-1</sup>";
      document.getElementById("cos").innerHTML = "sin<sup>-1</sup>";
      document.getElementById("tan").innerHTML = "sin<sup>-1</sup>";
      trigonometryHyperbolicFlag = !trigonometryHyperbolicFlag;
    }
  }
}
// Function for evaluation of mathematical expression:
function evaluate(expression) {
  let expressionToken = expression.split("");  
  let operand = [];     // operand stack
  let operator = [];    // operator stack
  for (let i = 0; i < expressionToken.length; i++)
  {
    if (expressionToken[i] == " ")
    {
      continue;
    }
    // Conditions to push or pop operands
    if (expressionToken[i] >= "0" && expressionToken[i] <= "9" 
       || expressionToken[i] == "." || expressionToken[i] == "-")
    {
      let num = "";
      while (i < expressionToken.length && expressionToken[i] >= "0" && 
      expressionToken[i] <= "9" || expressionToken[i] == "." || expressionToken[i] == "-")
      {
        num = num + expressionToken[i++];
      }
      operand.push(parseFloat(num));
      i--;
    }
    // Conditions to push or pop operators
    else if (expressionToken[i] == "(")
    {     
      operator.push(expressionToken[i]);     
    }
    else if (expressionToken[i] == ")")
    {
      if (expressionToken[i-2] == "-") {
        operand.push(expressionToken[i-1]*-1);
      }
      while (operator[operator.length - 1] != "(") {
        operand.push(calculate(operator.pop(), operand.pop(), operand.pop()));
      }
      operator.pop();
    }
    else if (expressionToken[i] == "+" || expressionToken[i] == "–" 
    || expressionToken[i] == "×" || expressionToken[i] == "÷" 
    || expressionToken [i] == "^" || expressionToken[i] == "%" 
    || expressionToken[i] == "√")
    {
      while (operator.length > 0 
        && precedence(expressionToken[i], operator[operator.length - 1]))
      {
        operand.push(
          calculate(operator.pop(), operand.pop(), operand.pop())
        );
      }
      operator.push(expressionToken[i]);   
		}
	}
  while (operator.length > 0) {
    operand.push(calculate(operator.pop(), operand.pop(), operand.pop()));
  }
  return operand.pop();    // Result of "evaluate" function
}
// Function to check precedence of operators.
/* It will return true only if the second Operator has 
    equal or higher precedence than first Operator.*/
function precedence(firstOperator, secondOperator)
{
  if (secondOperator == "(" || secondOperator == ")" || secondOperator == "-")
  {
    return false;
  }  
  else if ((firstOperator == "^" || firstOperator == "√") 
  && (secondOperator == "+" || secondOperator == "–"))
  {
    return false;
  }
  else if ((firstOperator == "^" || firstOperator == "√" || firstOperator == "÷")
  && (secondOperator == "×" || secondOperator == "%"))
  {
    return false;
  }
  else if ((firstOperator == "%") && (secondOperator == "×" || secondOperator == "÷"))
  {
    return false;
  }
  else if ((firstOperator == "×" || firstOperator == "÷" || firstOperator == "%")
   && (secondOperator == "+" || secondOperator == "–"))
  {
    return false;
  }
  else
  {
    return true;
  }
}
// Function to calculate string value according to precedence.
function calculate(operator, secondOperand, firstOperand)
{
  switch (operator){
    case "^":
      return firstOperand ** secondOperand;
    case "√":
      return nthRoot(secondOperand,firstOperand)
    case "%":
      return firstOperand % secondOperand;
    case "+":
      return firstOperand + secondOperand;
    case "–":
      return firstOperand - secondOperand;
    case "×":
      return firstOperand * secondOperand;
    case "÷":
      if (secondOperand == 0)
      {
        screen.value = "infinity";
      }
      return parseFloat(firstOperand / secondOperand);
    }
    return 0;
}
// Function for finding nth root.
function nthRoot(redicant, index) {
  if (redicant < 0) {
    if (index % 2 === 1) return -nthRoot(-redicant, index)
    if (index % 2 === -1) return -1 / nthRoot(-redicant, -index)
  }
  return redicant ** (1 / index)
}
// To take the input using the keyboard
document.onkeyup = function(event){
  switch (event.key) {
    case "Backspace":
      document.getElementById("backspace").click();
      break;
    case "Delete":
      document.getElementById("clear").click();
      break;
    case "e":
    case "E":
      document.getElementById("e").click();
      break;
    // operators
    case "+":
      document.getElementById("addition").click();
      break;
    case "-":
      document.getElementById("subtraction").click();
      break;
    case "*":
      document.getElementById("multiply").click();
      break;
    case "/":
      document.getElementById("divide").click();
      break;
    case "^":
      document.getElementById("power").click();
      break;
    case "%":
      document.getElementById("mod").click();
      break;
    case "(":
      document.getElementById("openBracket").click();
      break;
    case ")":
      document.getElementById("closeBracket").click();
      break;
    case "!":
      document.getElementById("factorial").click();
      break;
    // Result
    case "=":
    case "Enter":
      document.getElementById("equal").click();
      break;
    // operands
    case "1":
      document.getElementById("1").click();
      break;
    case "2":
      document.getElementById("2").click();
      break;
    case "3":
      document.getElementById("3").click();
      break;
    case "4":
      document.getElementById("4").click();
      break;
    case "5":
      document.getElementById("5").click();
      break;
    case "6":
      document.getElementById("6").click();
      break;
    case "7":
      document.getElementById("7").click();
      break;
    case "8":
      document.getElementById("8").click();
      break;   
    case "9":
      document.getElementById("9").click();
      break;
    case "0":
      document.getElementById("0").click();
      break;
    case ".":
      document.getElementById(".").click();
      break;       
  } 
}
// Other Functionalities & Event Handlers
let screen = document.getElementById("screen");
let history = document.getElementById("history");
let buttons = Array.from(document.getElementsByTagName("button"));
let memory = 0;
buttons.map(button => {
  button.addEventListener("click", (e) => {
    switch (e.target.innerText) {
      case "C":
        screen.value = "";
        history.value = "";
        break;
      case "π":
        screen.value = Math.PI;
        break;
      case "e":
        screen.value = Math.E;
        break;
      case "⌫":
        screen.value = screen.value.slice(0, -1);
        break;
      // Operators
      case "mod":
        history.value += screen.value + "%";
        screen.value = "";
        break;
      case "+":
      case "–":
      case "÷":
      case "×":
      case "(":
      case ")":
        history.value += screen.value + e.target.innerText;
        screen.value = "";
        break;
      case "𝑥y":
        history.value += screen.value + "^";
        screen.value = "";
        break;
      case "±":
        screen.value *= -1;
        break;
      // Factorial
      case "n!":
        if (screen.value > 0) {
          let fact = 1;
          for (i = 1; i <= screen.value; i++) {
            fact *= i;
          }
          screen.value = fact;
        } else if (screen.value == 0) screen.value = 1;
        else screen.value = "invalid input";
        break;
      // Converts -ve into +ve
      case "|𝑥|":
        if (screen.value < 0) screen.value = screen.value * -1;
        break;
      // Inverse
      case "1/𝑥":
        if (screen.value == 0) screen.value = "infinity";
        else screen.value = 1 / screen.value;
        break;
      // Root
      case "√𝑥":
        screen.value = Math.sqrt(screen.value);
        break;
      case "∛𝑥":
        screen.value = Math.cbrt(screen.value);
        break;
      case "y√𝑥":
        history.value += screen.value + "√";
        screen.value = "";
        break;
      // Functions
      case "floor":
        screen.value = Math.floor(screen.value);
        break;
      case "ceiling":
        screen.value = Math.ceil(screen.value);
        break;
      case "round":
        screen.value = Math.round(screen.value);
        break;
      // Power
      case "10𝑥":
        screen.value = 10 ** screen.value;
        break;
      case "2𝑥":
        screen.value = 2 ** screen.value;
        break;
      case "e𝑥":
        screen.value = Math.E ** screen.value;
        break;
      case "𝑥3":
        screen.value = screen.value ** 3;
        break;
      case "𝑥2":
        screen.value = screen.value ** 2;
        break;  
      // Trigonometric functions
      case "sin":
        if (degFlag) {
          screen.value = Math.sin((screen.value * Math.PI) / 180).toPrecision(10);
        } else {
          screen.value = Math.sin(screen.value).toPrecision(10);
        }
        break;
      case "cos":
        if (degFlag) {
          screen.value = Math.cos((screen.value * Math.PI) / 180).toPrecision(10);
        } else {
          screen.value = Math.cos(screen.value).toPrecision(10);
        }
        break;
      case "tan":
        if (degFlag) {
          screen.value = Math.tan((screen.value * Math.PI) / 180).toPrecision(10);
        } else {
          screen.value = Math.tan(screen.value).toPrecision(10);
        }
        break;
      case "sin-1":
        if (degFlag) {
          screen.value = Math.asin(screen.value);
          screen.value = (screen.value * 180) / Math.PI;
        } else {
          screen.value = Math.asin(screen.value);
        }
        break;
      case "cos-1":
        if (degFlag) {
          screen.value = Math.acos(screen.value);
          screen.value = (screen.value * 180) / Math.PI;
        } else {
          screen.value = Math.acos(screen.value);
        }
        break;
      case "tan-1":
        if (degFlag) {
          screen.value = Math.atan(screen.value);
          screen.value = (screen.value * 180) / Math.PI;
        } else {
          screen.value = Math.atan(screen.value);
        }
        break;
      case "sinh":
        if (degFlag) {
          screen.value = Math.sinh((screen.value * Math.PI) / 180);
        } else {
          screen.value = Math.sinh(screen.value);
        }
        break;
      case "cosh":
        if (degFlag) {
          screen.value = Math.cosh((screen.value * Math.PI) / 180);
        } else {
          screen.value = Math.cosh(screen.value);
        }
        break;
      case "tanh":
        if (degFlag) {
          screen.value = Math.tanh((screen.value * Math.PI) / 180);
        } else {
          screen.value = Math.tanh(screen.value);
        }
        break;
      case "sin-1h":
        if (degFlag) {
          screen.value = Math.asinh(screen.value);
          screen.value = (screen.value * 180) / Math.PI;
        } else {
          screen.value = Math.asinh(screen.value);
        }
        break;
      case "cos-1h":
        if (degFlag) {
          screen.value = Math.acosh(screen.value);
          screen.value = (screen.value * 180) / Math.PI;
        } else {
          screen.value = Math.acosh(screen.value);
        }
        break;
      case "tan-1h":
        if (degFlag) {
          screen.value = Math.atanh(screen.value);
          screen.value = (screen.value * 180) / Math.PI;
        } else {
          screen.value = Math.atanh(screen.value);
        }
        break;
      // Memory Functions
      case "M+":
        document.getElementById("MR").disabled = false;
        document.getElementById("MC").disabled = false;
        memory += parseFloat(screen.value);
        screen.value = "";
        break;
      case "M-":
        document.getElementById("MR").disabled = false;
        document.getElementById("MC").disabled = false;
        memory -= parseFloat(screen.value);
        screen.value = "";
        break;
      case "MS":
        document.getElementById("MR").disabled = false;
        document.getElementById("MC").disabled = false;
        memory = parseFloat(screen.value);
        break;
      case "MR":
        screen.value = memory;
        break;
      case "MC":
        memory = 0;
        document.getElementById("MR").disabled = true;
        document.getElementById("MC").disabled = true;
        break;      
      // Logarithm
      case "exp":
        let num = evaluate(screen.value);
        screen.value = num.toExponential(10);
        break;
      case "log":
        screen.value = Math.log10(screen.value);
        break;
      case "ln":
        screen.value = Math.log10(screen.value) / Math.log10(Math.PI);
        break;
      case "log2𝑥":
        screen.value = Math.log2(screen.value);
        break;
      // Evaluate
      case "=":
        history.value += screen.value;
        screen.value = "";
        if (feFlag) {
          screen.value = evaluate(history.value)
          history.value = "";
        } else {
          screen.value = evaluate(history.value).toExponential(10);
          history.value = "";
        }
        break;
      case "hyp":
      case "2nd":
      case "nd":
        break;
      // Choice for the mode of calc
      case "DEG":
      case "RAD":
        if (degFlag) {
          document.getElementById("deg").innerHTML = "RAD";
          degFlag = !degFlag;
        } else {
          document.getElementById("deg").innerHTML = "DEG";
          degFlag = !degFlag;
        }
        break;
      // Choice for the mode of calc
      case "F-E":
        if (feFlag) {
          document.getElementById("fe").style.background = 
            "var(--function-change-btns-background)";
          feFlag = !feFlag;
        } else {
          document.getElementById("fe").style.background = 
            "var(--main-background)";
          feFlag = !feFlag;
        }
        break;
      // Default case (for numbers, operators and decimal.)
      default:
        screen.value += e.target.innerText;
    }
  });
})