const oneBlockValute = document.querySelector(".one-block");
const twoBlockValute = document.querySelector(".two-block");
const oneInputNumber = document.querySelector(".one-window");
const twoInputNumber = document.querySelector(".two-window");

const url = "https://www.cbr-xml-daily.ru/daily_json.js";
const loadFetch = () => {
    fetch(url)
        .then((response) => response.json())

        .then((data) => {
            function nameValute(oneOrTwo) {
                for (const nameValute in data.Valute) {
                    const option = document.createElement("option");

                    option.textContent = nameValute;

                    oneOrTwo.append(option);
                }
            }
            nameValute(oneBlockValute);
            nameValute(twoBlockValute);
            const valute = data.Valute;
            //events blocks select
            oneBlockValute.addEventListener("change", () => {
                twoInputNumber.setAttribute(
                    "value",
                    (
                        (data.Valute[oneBlockValute.value].Value /
                            data.Valute[twoBlockValute.value].Value) *
                        oneInputNumber.value
                    ).toFixed(2)
                );
            });

            twoBlockValute.addEventListener("change", () => {
                twoInputNumber.setAttribute(
                    "value",
                    (
                        (data.Valute[oneBlockValute.value].Value /
                            data.Valute[twoBlockValute.value].Value) *
                        oneInputNumber.value
                    ).toFixed(2)
                );
            });
            //events blocks input

            oneInputNumber.addEventListener("input", () => {
                twoInputNumber.setAttribute(
                    "value",
                    (
                        (data.Valute[oneBlockValute.value].Value /
                            data.Valute[twoBlockValute.value].Value) *
                        oneInputNumber.value
                    ).toFixed(2)
                );
            });

            twoInputNumber.addEventListener("input", () => {
                oneInputNumber.setAttribute(
                    "value",
                    (
                        (data.Valute[twoBlockValute.value].Value /
                            data.Valute[oneBlockValute.value].Value) *
                        twoInputNumber.value
                    ).toFixed(2)
                );
            });
        });
};
loadFetch();
