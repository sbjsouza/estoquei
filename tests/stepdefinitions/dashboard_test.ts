import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import * as fs from 'fs';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

import { Vendas } from "../../estoquei-project/src/app/models/vendas";

let dashboardData = {};

async function getTotal(venda: Vendas) {
  return parseFloat(venda.value) * venda.quantity
}

async function getSaleID(id: String) {
  const options = {
    method: `GET`,
    json: true,
    uri: `http://localhost:3000/vendas/${id}`,
  };
  try {
    const response = await request(options);
    return response;
  } catch (error) {
    Promise.reject(error);
    expect(false).to.equal(true);
  }
}

async function checkProd(
  id: String,
  product: String,
  price: String,
  sales: String
) {
  const options = {
    method: `GET`,
    json: true,
    uri: `http://localhost:3000/vendas/${id}`,
  };
  try {
    const response = await request(options);
    expect(response.id.toString()).to.equal(id);
    expect(response.product.toString()).to.equal(product);
    expect(parseFloat(response.value.toString())).to.equal(parseFloat(price.toString()));
    expect(response.quantity.toString()).to.equal(sales);
    return Promise.resolve(true);
  } catch (error) {
    Promise.reject(error);
    expect(false).to.equal(true);
  }
}

defineSupportCode(function ({ Given, When, Then }) {
  Given(
    /^existe o produto "([^\"]*)" cadastrado com id "(\d*)" no valor de "(\d*)" reais com "(\d*)" vendas$/,
    async (product, id, price, sales) => {
      await checkProd(
        id.toString(),
        product.toString(),
        price.toString(),
        sales.toString(),
      );
    }
  );

  When(/^eu vou para página "([^\"]*)" com o título "([^\"]*)"$/, async (pagename, title) => {
    await browser.get(
      `http://localhost:4200/${pagename.toString().toLowerCase()}/`
    );
    await expect(element(by.css("#pagename")).getText()).to.eventually.equal(
      title.toString()
    );
  });

  Then(/^a tabela "([^\"]*)" contem respectivamente: "([^\"]*)", "([^\"]*)", "([^\"]*)"$/, async (table_id, product_1, product_2, product_3) => {
    const products = [product_1, product_2, product_3];
    await element
      .all(by.css(`#${table_id}-product`))
      .map(function (elm) {
        return elm.getText();
      })
      .then(function (texts) {
        console.log('texts', texts);
        let validate = true;
        texts.forEach((text, index) => {
          if (text != products[index]) {
            validate = false;
          }
        });
        expect(validate).to.equal(true);
      });
  });

  When(/^eu solicito ao servidor o "([^\"]*)"$/, async (endpoint) => {
    const options = {
      method: `GET`,
      json: true,
      uri: `http://localhost:3000/${endpoint}`,
    };
    const response = await request(options);
    dashboardData = response;
  });

  Then(/^o sistema retorna o dashboard contendo três itens na lista de "([^\"]*)" e três itens na lista de "([^\"]*)"$/, async (key_1, key_2) => {
    expect(dashboardData[key_1.toString()].length).to.equal(3);
    expect(dashboardData[key_2.toString()].length).to.equal(3);
  });

  Then(/^a lista de "([^\"]*)" contem respectivamente: "([^\"]*)" de id "([^\"]*)" com "([^\"]*)" vendas, "([^\"]*)" de id "([^\"]*)" com "([^\"]*)" vendas, "([^\"]*)" de id "([^\"]*)" com "([^\"]*)" vendas$/,
    async (key, product_1, id_1, quantity_1, product_2, id_2, quantity_2, product_3, id_3, quantity_3) => {
      const list = dashboardData[key.toString()];
      const expectedList = [
        {
          product: product_1,
          id: id_1,
          quantity: quantity_1,
        },
        {
          product: product_2,
          id: id_2,
          quantity: quantity_2,
        },
        {
          product: product_3,
          id: id_3,
          quantity: quantity_3,
        },
      ];
      for (let i = 0; i < 3; i++) {
        const expected = expectedList[i];
        const current = list[i];
        expect(current['product'].toString()).to.equal(expected['product'].toString());
        expect(parseFloat(current['quantity'].toString())).to.equal(parseFloat(expected['quantity'].toString()));
        expect(current['id'].toString()).to.equal(expected['id'].toString());
      }
    });

    Then(/^a lista de "([^\"]*)" contem respectivamente: "([^\"]*)" de id "([^\"]*)" faturando "([^\"]*)" reais, "([^\"]*)" de id "([^\"]*)" faturando "([^\"]*)" reais, "([^\"]*)" de id "([^\"]*)" faturando "([^\"]*)" reais$/,
      async (key, product_1, id_1, revenue_1, product_2, id_2, revenue_2, product_3, id_3, revenue_3) => {
        const list = dashboardData[key.toString()];
        const expectedList = [
          {
            product: product_1,
            id: id_1,
            revenue: revenue_1,
          },
          {
            product: product_2,
            id: id_2,
            revenue: revenue_2,
          },
          {
            product: product_3,
            id: id_3,
            revenue: revenue_3,
          },
        ];
        for (let i = 0; i < 3; i++) {
          const expected = expectedList[i];
          const current = list[i];
          const revenue = current['quantity'] * parseFloat(current['value'].toString());
          expect(current['product'].toString()).to.equal(expected['product'].toString());
          expect(revenue).to.equal(parseFloat(expected['revenue'].toString()));
          expect(current['id'].toString()).to.equal(expected['id'].toString());
        }
      });
    

});