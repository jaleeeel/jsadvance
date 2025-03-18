const btn1 = document.getElementById("btn1");
const btn2 = document.getElementById("btn2");
const btn3 = document.getElementById("btn3");
const btn4 = document.getElementById("btn4");
const identifyHighLow = document.getElementById("identifyHighLow");
const sortOrder = document.getElementById("sortOrder");

const tbl = document.getElementById("tblNumbers");


let total = 0;
let isAscending = true;

let numbersArr = new Array();

function insertNumber() {
    const txtNumber = document.getElementById("txtNum").value;

    let num;
    let regex = /^[0-9]+$/; // regular expression for checking valid positive number values.


    if(txtNumber.match(regex)){
        num = parseInt(txtNumber);
        numbersArr.push(num);
        console.log(numbersArr);
        document.getElementById("txtNum").value = "";
    } else {
        alert("Please input a positive number");
        document.getElementById("txtNum").value = "";
        return;
    }

    iterateNumbers();
}

btn1.addEventListener("click", () => {
    insertNumber();
});

document.getElementById("txtNum").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        insertNumber();
    }
});

btn2.addEventListener("click", () => {
    document.getElementById("txtNum").value = "";
});

btn3.addEventListener("click", () => {
    numbersArr = [];
    total = 0;

    // reset all trs
    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    document.getElementById("btn4").style.display = "none";

});

btn4.addEventListener("click", () => {
    const trTotal = document.createElement("tr");
    const tdTotalLabel = document.createElement("td");
    const tdTotalValue = document.createElement("td");

    trTotal.style.height = "30px";

    tdTotalLabel.style.fontWeight = "bold";
    tdTotalLabel.innerHTML = "TOTAL";

    tdTotalValue.style.textDecoration = "underline";
    tdTotalValue.innerHTML = total;
        
    trTotal.appendChild(tdTotalLabel);
    trTotal.appendChild(tdTotalValue);
    tbl.appendChild(trTotal);
});
identifyHighLow.addEventListener("click", () => {
    if (numbersArr.length === 0) {
        alert("No numbers available to identify highest and lowest.");
        return;
    }

    const highest = Math.max(...numbersArr);
    const lowest = Math.min(...numbersArr);

    const trHighLow = document.createElement("tr");
    const tdHighLowLabel = document.createElement("td");
    const tdHighLowValue = document.createElement("td");

    trHighLow.style.height = "30px";
    tdHighLowLabel.style.fontWeight = "bold";
    tdHighLowLabel.innerHTML = `HIGHEST: ${highest}  LOWEST: ${lowest}`;

    tdHighLowValue.style.textDecoration = "underline";

    trHighLow.appendChild(tdHighLowLabel);
    trHighLow.appendChild(tdHighLowValue);
    tbl.appendChild(trHighLow);

    console.log(`Highest: ${highest}, Lowest: ${lowest}`);
});
sortOrder.addEventListener("click", () => {
    if (numbersArr.length === 0) {
        alert("No numbers available to sort.");
        return;
    }

    if (isAscending) {
        numbersArr.sort((a, b) => a - b); // Sort in ascending order
        sortOrder.innerHTML = "Descending";
    } else {
        numbersArr.sort((a, b) => b - a); // Sort in descending order
        sortOrder.innerHTML = "Ascending";
    }

    isAscending = !isAscending; // Toggle order for next click
    iterateNumbers(); // Refresh table with sorted values
});




function deleteNumber(i) {
    numbersArr.splice(i,1);
    iterateNumbers();
    console.log(numbersArr)
}

function editNumber(i) {

    const editTxt = prompt("Enter new number: ", numbersArr[i]);
    const regex = /^[0-9]+$/; // regular expression for checking valid positive number values.
    
    if(editTxt == null || editTxt == "") {
        alert("You did not input a new value!");
    } else {
        if(editTxt.match(regex)) {
            numbersArr[i] = parseInt(editTxt);
            iterateNumbers();
            console.log(numbersArr);
        } else {
            alert("You did not input a valid number!");
        }
    } 
}

function iterateNumbers() {
    // reset all trs
    while(tbl.hasChildNodes()) {
        tbl.removeChild(tbl.firstChild);
    }

    if(!(numbersArr.length == 0)) {

        total = 0;

        console.log(`Array Length: ${numbersArr.length}`);

        // Loop for iterating numbers from the array in a table
        for(let i=0 ; i < numbersArr.length ; i++) {

            const tr = document.createElement("tr");
            const td1 = document.createElement("td");
            const td2 = document.createElement("td");
            const td3 = document.createElement("td"); // for the delete button
            const td4 = document.createElement("td"); // for the delete button
            const btnDelete = document.createElement("button");
            const btnEdit = document.createElement("button");

            td1.style.width = "70px";
            td1.innerHTML = numbersArr[i];

            td2.style.width = "70px";

            if(numbersArr[i] %2 == 0) {
                td2.style.color = "green";
                td2.innerHTML = "EVEN";
            } else {
                td2.style.color = "blue";
                td2.innerHTML = "ODD";
            }

            btnDelete.setAttribute("onclick", `deleteNumber(${i})`) ;
            btnDelete.innerHTML = "Remove"; 

            btnEdit.setAttribute("onclick", `editNumber(${i})`) ;
            btnEdit.innerHTML = "Edit";

            td3.appendChild(btnDelete);
            td4.appendChild(btnEdit);

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            tbl.appendChild(tr);

            if(!(numbersArr.length == 0)) {
                document.getElementById("btn4").style.display = "inline";
                document.getElementById("identifyHighLow").style.display = "inline";
                document.getElementById("sortOrder").style.display = "inline";
            }
            
            total += numbersArr[i];
            console.log(numbersArr[i]);

            console.log(`Total: ${total}`)
        }
    } else {
        total = 0;
        document.getElementById("btn4").style.display = "none";
        document.getElementById("identifyHighLow").style.display = "none";
        document.getElementById("sortOrder").style.display = "none";
    }

}
