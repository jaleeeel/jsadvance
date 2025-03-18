let numbers = [];

function insertNumber() {
    let input = document.getElementById("numberInput").value;
    let num = parseInt(input);
    
    if (!isNaN(num) && num > 0) {
        numbers.push(num);
        updateTable();
        document.getElementById("numberInput").value = "";
    } else {
        alert("Please enter a valid positive number.");
    }
}

function updateTable() {
    let table = document.getElementById("numbersTable");
    table.innerHTML = `
        <tr>
            <th>Number</th>
            <th>Type</th>
            <th>Actions</th>
        </tr>
    `;

    numbers.forEach((num, index) => {
        let type = num % 2 === 0 ? "EVEN" : "ODD";
        let typeClass = num % 2 === 0 ? "even" : "odd";
        table.innerHTML += `
            <tr>
                <td>${num}</td>
                <td class="${typeClass}">${type}</td>
                <td>
                    <button onclick="removeNumber(${index})">Remove</button>
                    <button onclick="editNumber(${index})">Edit</button>
                </td>
            </tr>
        `;
    });

    identifyHighLow();
}

function removeNumber(index) {
    numbers.splice(index, 1);
    updateTable();
}

function editNumber(index) {
    let newValue = prompt("Enter new value:", numbers[index]);
    let num = parseInt(newValue);
    
    if (!isNaN(num) && num > 0) {
        numbers[index] = num;
        updateTable();
    } else {
        alert("Invalid number.");
    }
}

function clearEntries() {
    document.getElementById("numberInput").value = "";
}

function clearItems() {
    numbers = [];
    updateTable();
    document.getElementById("highest").textContent = "-";
    document.getElementById("lowest").textContent = "-";
}

function getTotal() {
    let total = numbers.reduce((sum, num) => sum + num, 0);
    alert("Total sum: " + total);
}

function identifyHighLow() {
    if (numbers.length > 0) {
        document.getElementById("highest").textContent = Math.max(...numbers);
        document.getElementById("lowest").textContent = Math.min(...numbers);
    } else {
        document.getElementById("highest").textContent = "-";
        document.getElementById("lowest").textContent = "-";
    }
}

function sortNumbers() {
    let order = document.getElementById("sortOrder").value;
    if (order === "asc") {
        numbers.sort((a, b) => a - b);
    } else if (order === "desc") {
        numbers.sort((a, b) => b - a);
    }
    updateTable();
}
