// const { method } = require("lodash");
// const { JavascriptModulesPlugin } = require("webpack");

const oneBlockValute = document.querySelector(
  ".content-global-block__one-block-valute"
);
const twoBlockValute = document.querySelector(
  ".content-global-block__two-block-valute"
);
const oneInputNumber = document.querySelector(".one-valute-window");
const twoInputNumber = document.querySelector(".two-valute-window");

const url = "https://www.cbr-xml-daily.ru/daily_json.js";
const url2 = "https://open.exchangerate-api.com/v6/latest";
const inputSwap = document.querySelector(".content-global-block__swap-button");
const loadFetch = () => {
  fetch(url)
    .then((response) => response.json())

    .then((data) => {
      console.log(data);

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

      //swap
    //   inputSwap.addEventListener("click", () => {
    //     const swap = oneBlockValute.value;
    //     oneBlockValute.value = twoBlockValute.value;
    //     twoBlockValute.value = swap;
    //     calculated();
    //   });
    });
};
loadFetch();