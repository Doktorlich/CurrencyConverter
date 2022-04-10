const oneBlockValute = document.querySelector(".one-block");
const twoBlockValute = document.querySelector(".two-block");
const oneInputNumber = document.querySelector(".one-window");
const twoInputNumber = document.querySelector(".two-window");

const url = "https://www.cbr-xml-daily.ru/daily_json.js";

let dataObj = [];
let currRub = {
    Value: 1,
};
const loadFetch = () => {
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            data.Valute["RUB"] = currRub;
            function addNameValute(oneOrTwo) {
                for (const nameValute in data.Valute) {
                    const option = document.createElement("option");
                    option.setAttribute("value", nameValute);
                   
                    option.textContent = nameValute;
                    oneOrTwo.append(option);
                }
                
            }
  
            addNameValute(oneBlockValute);
            addNameValute(twoBlockValute);
            addDataObj(data);
        });
};
loadFetch();

function addDataObj(obj) {
    dataObj.push(obj);
}

function getValue() {
    twoInputNumber.setAttribute(
        "value",
        (
            (dataObj[0].Valute[oneBlockValute.value].Value /
                dataObj[0].Valute[twoBlockValute.value].Value) *
            oneInputNumber.value
        ).toFixed(2)
    );
}
//events blocks input
function checkValue() {
    twoInputNumber.setAttribute(
        "value",
        (
            (dataObj[0].Valute[oneBlockValute.value].Value /
                dataObj[0].Valute[twoBlockValute.value].Value) *
            oneInputNumber.value
        ).toFixed(2)
    );
}

oneBlockValute.addEventListener("change", getValue);
twoBlockValute.addEventListener("change", getValue);
oneInputNumber.addEventListener("input", checkValue);
twoInputNumber.addEventListener("input", checkValue);

