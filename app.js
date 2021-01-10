// HTML ELEMENTS
let input = document.getElementById("input");
let history = document.getElementById("history");
const operators = document.getElementsByClassName("operator");
const numbers = document.getElementsByClassName("number");
// EVALUATION VARIABLE
let evaluation = "";
// CHECKS THE EVALUATION AND CONVERTS NUMBER DECIMALS TO 2 NUMBERS
function result(evalField) {
    // Get rid of the decimals
    if (!Number.isInteger(evalField)) {
        // Check if result is in milinions
        if (evalField > 1e6) {
            evaluation = (evalField / 1e6).toFixed(2) + "e6"
            return (evalField / 1e6).toFixed(2) + "m"
        } else {
            evaluation = evalField.toFixed(2);
            return evalField.toFixed(2);
        }
    } else {
        // Check if result is in milinions
        if (evalField > 1e6) {
            evaluation = (evalField / 1e6).toFixed(2) + "e6"
            return (evalField / 1e6).toFixed(2) + "m"
        } else {
            evaluation = evalField
            return evalField
        }
    }
}
// CLICK LISTENER FOR NUMBERS
for (let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener("click", () => {
        if (input.innerHTML.length <= 14) {
            input.innerHTML += numbers[i].id
            evaluation += numbers[i].id
        }
    })
};
// CLICK LISTENER FOR OPERATORS
for (let i = 0; i < operators.length; i++) {
    operators[i].addEventListener("click", () => {
        let lastChar = evaluation.toString().slice(-1);
        let opr = operators[i].id;
        // Equal operator
        if (opr == "=") {
            if (lastChar == "+" && lastChar == "-" && lastChar == "/" && lastChar == "*") {
                history.innerHTML = input.innerHTML.slice(0, -1)
                input.innerHTML = result(eval(evaluation.slice(0, -1)));
            } else if (input.innerHTML) {
                history.innerHTML = input.innerHTML;
                input.innerHTML = result(eval(evaluation))
            } else {
                alert("Please type a valid mathematical equation!")
            }
            // Clear all
        } else if (opr == "clear") {
            input.innerHTML = ""
            evaluation = ""
        }
        // AC clear last digit
        else if (opr == "aClear") {
            if (input.innerHTML.slice(-1) !== "m") {
                input.innerHTML = input.innerHTML.slice(0, -1)
                evaluation = evaluation.toString().slice(0, -1)
            }
        }
        // Allows for negative multiplication 
        else if (lastChar == "*" && input.innerHTML.length <= 13) {
            if (opr == "-") {
                input.innerHTML += opr
                evaluation += opr
            }
            // Prevents two operator in a row input ** // ++ etc.
        } else if (!isNaN(lastChar) && input.innerHTML.length <= 14) {
            if (opr == "/") {
                input.innerHTML += "&divide"
                evaluation += opr
            } else if (opr == "*") {
                input.innerHTML += "&times"
                evaluation += opr
            } else {
                input.innerHTML += opr
                evaluation += opr
            }
        }
    })
};
// KEY LISTENER FOR OPERATORS / * - + AND NUMBERS
document.addEventListener("keypress", (event) => {
    let key = String.fromCharCode(event.which);
    let lastChar = evaluation.toString().slice(-1);
    if (!isNaN(key) && input.innerHTML.length <= 13) {
        input.innerHTML += key;
        evaluation += key;
    } else if (key == "-" && lastChar == "*" && input.innerHTML.length <= 13) {
        input.innerHTML += key;
        evaluation += key;
    } else if (!isNaN(lastChar) && input.innerHTML.length <= 13) {
        if (key == "/") {
            input.innerHTML += "&divide";
            evaluation += key;
        } else if (key == "*") {
            input.innerHTML += "&times";
            evaluation += key;
        } else if (key == "+" || key == "-") {
            input.innerHTML += key;
            evaluation += key;
        }
    }
})
// KEY LISTENER FOR EVALUATION = , backspace and delete
document.addEventListener("keyup", (event) => {
    // enter key
    if (event.keyCode === 13) {
        let lastChar = evaluation.toString().slice(-1);
        if (lastChar == "+" && lastChar == "-" && lastChar == "/" && lastChar == "*") {
            history.innerHTML = input.innerHTML.slice(0, -1);
            input.innerHTML = result(eval(evaluation.slice(0, -1)));
        } else if (input.innerHTML) {
            history.innerHTML = input.innerHTML;
            input.innerHTML = result(eval(evaluation));
        } else {
            alert("Please type a valid mathematical equation!");
        }
        // Backspace
    } else if (event.keyCode == 8) {
        if (input.innerHTML.slice(-1) !== "m") {
            input.innerHTML = input.innerHTML.slice(0, -1);
            evaluation = evaluation.toString().slice(0, -1);
        }
        // Delete
    } else if (event.keyCode == 46) {
        input.innerHTML = "";
        evaluation = "";
    }
});