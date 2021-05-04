import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import request = require("request-promise");

import { Lojas } from "../../estoquei-project/src/app/models/lojas";

async function getStoreById(id: String) {
  const options = {
    method: `GET`,
    json: true,
    uri: `http://localhost:3000/lojas/${id}`,
  };
  try {
    const response = await request(options);
    return response;
  } catch (error) {
    Promise.reject(error);
    expect(false).to.equal(true);
  }
}
async function checkStore(
  id: String,
  name: String,
  store_profit: String,
) {
  const options = {
    method: `GET`,
    json: true,
    uri: `http://localhost:3000/lojas/${id}`,
  };
  try {
    const response = await request(options);
    return Promise.resolve(
      response.id.toString() == id.toString() &&
        response.store_profit.toString() ==
        store_profit.toString()
        ? expect(response.name.toString()).to.equal(name)
        : expect(false).to.equal(true)
    );
  } catch (error) {
    Promise.reject(error);
    expect(false).to.equal(true);
  }
}
async function compareStore(
  id: String,
  name: String,
  store_profit: String,
  loja: Lojas
) {
  return Promise.resolve(
    loja.id.toString() == id.toString() &&
      loja.store_profit.toString() == store_profit.toString()
      ? expect(loja.name.toString()).to.equal(name)
      : expect(false).to.equal(true)
  );
}
var loja: Lojas;
defineSupportCode(function ({ Given, When, Then }) {
// Given eu estou na página "Lojas"
    Given(/^eu estou na página "([^\"]*)"$/, async (pagename) => {
        await browser.get("http://localhost:4200/" + pagename.toString().toLowerCase());
        await expect(element(by.css("#pagename")).getText()).to.eventually.equal(
        pagename.toString()
        );
    });;
    Given(
        /^a loja está registrada com o id "([^\"]*)", nome "([^\"]*)" e Lucro "(\d*)"$/,
        async (id, name, store_profit) => {
          await browser.get("http://localhost:4200/");
          await checkStore(
            id.toString(),
            name.toString(),
            store_profit.toString(),
          );
        }
      );
    Given(
    /^o vendedor está registrado com o id "(\d*)", nome "([^\"]*)", Número de vendas "(\d*)" e Valor bruto de vendas "([^\"]*)"$/,
    async (id, name, store_profit) => {
      await browser.get("http://localhost:4200/");
      await checkStore(
        id.toString(),
        name.toString(),
        store_profit.toString(),
      );
    }
  );
  When(/^eu vou para página "([^\"]*)"$/, async (pagename) => {
    await browser.get(
      `http://localhost:4200/${pagename.toString().toLowerCase()}/`
    );
    await expect(element(by.css("#pagename")).getText()).to.eventually.equal(
      pagename.toString()
    );
  });
  When(/^eu pergunto ao sistema pela loja com id "(\d*)"$/, async (id) => {
    loja = await getStoreById(id.toString());
  });

  When(/^eu seleciono "([^\"]*)"$/, async (buttonProfit) => {
    browser.sleep(2000);
    await expect(element(by.buttonText(buttonProfit.toString())));
  });
      // Then o sistema lista as lojas com nome "Descontão", "Atacadão", "Varejão" e "Lojão", nesta ordem
  Then(/^o sistema lista as lojas com nome "([^\"]*)", "([^\"]*)", "([^\"]*)" e "([^\"]*)", nesta ordem$/,
      async (loja1, loja2, loja3, loja4) => {
      let tmp_list = [loja1, loja2, loja3, loja4];
      await element
          .all(by.css("#lojaname"))
          .map(function (elm) {
          return elm.getText();
          })
          .then(function (texts) {
          let validate = true;
          texts.forEach((text, index) => {
              if (text != tmp_list[index]) {
              validate = false;
              }
          });
          expect(validate).to.equal(true);
          });
   }
  );
  Then(
    /^o sistema retorna a loja que está registrada com o id "(\d*)", nome "([^\"]*)" e Lucro "([^\"]*)"$/,
    async (id, name, store_profit) => {
      await browser.get("http://localhost:4200/");
      await compareStore(
        id.toString(),
        name.toString(),
        store_profit.toString(),
        loja
      );
    }
  );
//   Then(
//     /^o sistema lista em uma tabela o vendedor com nome "([^\"]*)", o vendedor com nome "([^\"]*)" e o vendedor com nome "([^\"]*)", nesta ordem$/,
//     async (seller1, seller2, seller3) => {
//       let tmp_list = [seller1, seller2, seller3];
//       await element
//         .all(by.css("#sellername"))
//         .map(function (elm) {
//           return elm.getText();
//         })
//         .then(function (texts) {
//           let validate = true;
//           texts.forEach((text, index) => {
//             if (text != tmp_list[index]) {
//               validate = false;
//             }
//           });
//           expect(validate).to.equal(true);
//         });
//     }
//   );
});
