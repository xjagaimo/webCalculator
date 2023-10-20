// Main object
const calculator = {
	displayNumber: '0',
	operator: null,
	firstNumber: null,
	waitingForSecondNum: false
};

// Functions
function updateDisplay() {
	document.querySelector("#displayNumber").innerText = calculator.displayNumber;
}

function clearCalc() {
	calculator.displayNumber = '0';
	calculator.operator = null;
	calculator.firstNumber = null;
	calculator.waitingForSecondNum = false;
}

function inputAngka(angka) {
	if (calculator.displayNumber === "0") {
		calculator.displayNumber = angka;
	} 
	else {
		calculator.displayNumber += angka;
	}
}

function inverseNum() {
	if (calculator.displayNumber === '0') {
        return;
    }
	calculator.displayNumber = calculator.displayNumber * -1;
}

function handleOperator (operator) {
	if (!calculator.waitingForSecondNum) {
		calculator.operator = operator;
		calculator.waitingForSecondNum = true;
		calculator.firstNumber = calculator.displayNumber;

		// reset screen
		calculator.displayNumber = '0';
	}
	else {
		alert('Operator sudah ditetapkan!');
	}
}

function hasilHitung() {
	if (calculator.firstNumber == null || calculator.operator == null) {
		alert("Anda belum menetapkan operator!");
		return;
	}

	let result = 0;
	if (calculator.operator === '+') {
		result = parseInt(calculator.firstNumber) + parseInt(calculator.displayNumber)
	} 
	else {
		result = parseInt(calculator.firstNumber) - parseInt(calculator.displayNumber)
	}

	//objek yang akan dikirimkan sebagai argumen putHistory()
	const history = {
		firstNumber: calculator.firstNumber,
		secondNumber: calculator.displayNumber,
		operator: calculator.operator,
		result: result
	};

	putHistory(history);
	calculator.displayNumber = result;
	renderHistory();
}

// Algorithms
// show numbers when clicked
const buttons = document.querySelectorAll(".button");
for (let button of buttons) {
	button.addEventListener('click', function(event) {
		// getting object
		const target = event.target;

		//clearing the display
		if (target.classList.contains('clear')) {
			clearCalc();
			updateDisplay();
			return;
		}

		// Inverting the number
		if (target.classList.contains('negative')) {
			inverseNum();
			updateDisplay();
			return;
		}

		//Operator
		if (target.classList.contains('operator')) {
			handleOperator(target.innerText);
			updateDisplay();
			return;
		}

		// Equals/Result
		if (target.classList.contains('equals')) {
			hasilHitung();
			updateDisplay();
			return;
		}

		inputAngka(target.innerText);
		updateDisplay();
	});
}

//reset history list
const reset = document.querySelector(".reset");
reset.addEventListener('click', function(event) {
	resetHistory();
	renderHistory();
});


