import { defineSupportCode } from "cucumber";
import { browser, $, element, ElementArrayFinder, by } from "protractor";
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
import request = require("request-promise");

import { Vendedor } from "../../estoquei-project/src/app/models/vendedor";

async function getSellerId(id: String) {
  const options = {
    method: `GET`,
    json: true,
    uri: `http://localhost:3000/sellers/${id}`,
  };
  try {
    const response = await request(options);
    return response;
  } catch (error) {
    Promise.reject(error);
    expect(false).to.equal(true);
  }
}
async function checkSeller(
  id: String,
  name: String,
  monthly_sells: String,
  monthly_sales_price: String
) {
  const options = {
    method: `GET`,
    json: true,
    uri: `http://localhost:3000/sellers/${id}`,
  };
  try {
    const response = await request(options);
    return Promise.resolve(
      response.monthly_sells.toString() == monthly_sells.toString() &&
        response.monthly_sales_price.toString() ==
          monthly_sales_price.toString()
        ? expect(response.name.toString()).to.equal(name)
        : expect(false).to.equal(true)
    );
  } catch (error) {
    Promise.reject(error);
    expect(false).to.equal(true);
  }
}
async function compareSeller(
  id: String,
  name: String,
  monthly_sells: String,
  monthly_sales_price: String,
  seller: Vendedor
) {
  return Promise.resolve(
    seller.monthly_sells.toString() == monthly_sells.toString() &&
      seller.monthly_sales_price.toString() == monthly_sales_price.toString()
      ? expect(seller.name.toString()).to.equal(name)
      : expect(false).to.equal(true)
  );
}
var seller: Vendedor;
defineSupportCode(function ({ Given, When, Then }) {
  Given(/^eu estou na página "([^\"]*)"$/, async (pagename) => {
    await browser.get(
      `http://localhost:4200/${pagename.toString().toLowerCase()}`
    );
    await expect(element(by.css("#pagename")).getText()).to.eventually.equal(
      pagename.toString()
    );
  });
  Given(
    /^o vendedor está registrado com o id "(\d*)", nome "([^\"]*)", Número de vendas "(\d*)" e Valor bruto de vendas "([^\"]*)"$/,
    async (id, name, monthly_sells, monthly_sales_price) => {
      await browser.get("http://localhost:4200/");
      await checkSeller(
        id.toString(),
        name.toString(),
        monthly_sells.toString(),
        monthly_sales_price.toString()
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
  When(/^eu pergunto ao sistema pelo vendedor com id "(\d*)"$/, async (id) => {
    seller = await getSellerId(id.toString());
  });

  When(/^eu seleciono "([^\"]*)"$/, async (buttonName) => {
    browser.sleep(2000);
    await expect(element(by.buttonText(buttonName.toString())));
  });

  Then(
    /^o sistema retorna o vendedor que está registrado com o id "(\d*)", nome "([^\"]*)", Número de vendas "(\d*)" e Valor bruto de vendas "([^\"]*)"$/,
    async (id, name, monthly_sells, monthly_sales_price) => {
      await browser.get("http://localhost:4200/");
      await compareSeller(
        id.toString(),
        name.toString(),
        monthly_sells.toString(),
        monthly_sales_price.toString(),
        seller
      );
    }
  );
  Then(
    /^o sistema lista em uma tabela o vendedor com nome "([^\"]*)", o vendedor com nome "([^\"]*)" e o vendedor com nome "([^\"]*)", nesta ordem$/,
    async (seller1, seller2, seller3) => {
      let tmp_list = [seller1, seller2, seller3];
      await element
        .all(by.css("#sellername"))
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
});
