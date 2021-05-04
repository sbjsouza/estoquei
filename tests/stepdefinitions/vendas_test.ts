import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import * as fs from 'fs';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
import request = require("request-promise");

import { Vendas } from "../../estoquei-project/src/app/models/vendas";
import { parse } from 'querystring';
let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

let total_value = "";

const homedir = require('os').homedir();

async function getTotal(venda: Vendas) {
  return parseFloat(venda.value)*venda.quantity
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
) {
  const options = {
    method: `GET`,
    json: true,
    uri: `http://localhost:3000/vendas/${id}`,
  };
  try {
    const response = await request(options);
    return Promise.resolve(
      response.id.toString() == id.toString() 
        ? expect(response.product.toString()).to.equal(product)
        : expect(false).to.equal(true)
    );
  } catch (error) {
    Promise.reject(error);
    expect(false).to.equal(true);
  }
}

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de "([^\"]*)"$/, async (pagename)=> {
        await browser.get("http://localhost:4200/");
        await expect(element(by.css("#pagename")).getText()).to.eventually.equal(
        pagename.toString()
        );
    })

    Given(
        /^a venda cadastrada no sistema do produto "([^\"]*)" que tem id "([^\"]*)"$/,
        async (product, id) => {
          await browser.get("http://localhost:4200/");
          await checkProd(
            id.toString(),
            product.toString()
          );
        }
      );

    When(/^eu clico em "([^\"]*)"$/, async (button) => {
        await element(by.buttonText(<string> button)).click();
    });

    When(
        /^eu pergunto ao sistema sobre o total ganho na venda de id "(\d*)"$/,
        async (id) => {
          let sale = await getSaleID(id.toString());
          total_value = (await getTotal(sale)).toString();
        }
      );


    Then(/^o sistema baixa o arquivo "([^\"]*)"$/, async (file_name) => {
        
          await browser.wait(async function () {
            return await fs.existsSync(homedir+'/Downloads/'+<string>file_name);
          }, 30*1000, "Arquivo não foi baixado em 30 segundos")
    });

    Then(/^o sistema retorna o total de "([^\"]*)"$/, async (value) => {
        await expect(total_value).to.equal(value);
      });

})
