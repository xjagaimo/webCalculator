const CACHE_KEY = "calc_history";

// Check for storage
function checkForStorage() {
	return typeof(Storage) !== "undefined";
}

// Save history record to localStorage
function putHistory(data) {
	if (checkForStorage()) {
		let historyData = null;
		if (localStorage.getItem(CACHE_KEY) === null) {
			historyData = [];
		}
		else {
			historyData = JSON.parse(localStorage.getItem(CACHE_KEY));
		}

		historyData.unshift(data);

		if (historyData.length > 5) {
			historyData.pop();
		}

		localStorage.setItem(CACHE_KEY, JSON.stringify(historyData));
	}
}

// Get data from localStorage
function showHistory() {
	if (checkForStorage()) {
		return JSON.parse(localStorage.getItem(CACHE_KEY)) || [];
	}
	else {
		return [];
	}
}

// Render data to show on screen
function renderHistory() {
	const historyData = showHistory();
	let historyList = document.querySelector('#historyList');

	// delete konten HTML pada elemen historyList agar tidak menampilkan data ganda
	historyList.innerHTML = "";

	// create table rows
	for (let history of historyData) {
		let row = document.createElement('tr');
		row.innerHTML = "<td>" +history.firstNumber +"</td>";
		row.innerHTML += "<td>" +history.operator +"</td>";
		row.innerHTML += "<td>" +history.secondNumber +"</td>";
		row.innerHTML += "<td>" +history.result +"</td>";

		historyList.appendChild(row);
	}
}

// Reset history
function resetHistory() {
	localStorage.removeItem(CACHE_KEY);
}

//run code
renderHistory();