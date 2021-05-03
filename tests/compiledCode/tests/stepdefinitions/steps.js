"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const cucumber_1 = require("cucumber");
const protractor_1 = require("protractor");
let chai = require("chai").use(require("chai-as-promised"));
let expect = chai.expect;
const request = require("request-promise");
function getSellerId(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: `GET`,
            json: true,
            uri: `http://localhost:3000/sellers/${id}`,
        };
        try {
            const response = yield request(options);
            return response;
        }
        catch (error) {
            Promise.reject(error);
            expect(false).to.equal(true);
        }
    });
}
function checkSeller(id, name, monthly_sells, monthly_sales_price) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: `GET`,
            json: true,
            uri: `http://localhost:3000/sellers/${id}`,
        };
        try {
            const response = yield request(options);
            return Promise.resolve(response.monthly_sells.toString() == monthly_sells.toString() &&
                response.monthly_sales_price.toString() ==
                    monthly_sales_price.toString()
                ? expect(response.name.toString()).to.equal(name)
                : expect(false).to.equal(true));
        }
        catch (error) {
            Promise.reject(error);
            expect(false).to.equal(true);
        }
    });
}
function compareSeller(id, name, monthly_sells, monthly_sales_price, seller) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(seller.monthly_sells.toString() == monthly_sells.toString() &&
            seller.monthly_sales_price.toString() == monthly_sales_price.toString()
            ? expect(seller.name.toString()).to.equal(name)
            : expect(false).to.equal(true));
    });
}
var seller;
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página "([^\"]*)"$/, (pagename) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get(`http://localhost:4200/${pagename.toString().toLowerCase()}`);
        yield expect(protractor_1.element(protractor_1.by.css("#pagename")).getText()).to.eventually.equal(pagename.toString());
    }));
    Given(/^o vendedor está registrado com o id "(\d*)", nome "([^\"]*)", Número de vendas "(\d*)" e Valor bruto de vendas "([^\"]*)"$/, (id, name, monthly_sells, monthly_sales_price) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield checkSeller(id.toString(), name.toString(), monthly_sells.toString(), monthly_sales_price.toString());
    }));
    When(/^eu vou para página "([^\"]*)"$/, (pagename) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get(`http://localhost:4200/${pagename.toString().toLowerCase()}/`);
        yield expect(protractor_1.element(protractor_1.by.css("#pagename")).getText()).to.eventually.equal(pagename.toString());
    }));
    When(/^eu pergunto ao sistema pelo vendedor com id "(\d*)"$/, (id) => __awaiter(this, void 0, void 0, function* () {
        seller = yield getSellerId(id.toString());
    }));
    When(/^eu seleciono "([^\"]*)"$/, (buttonName) => __awaiter(this, void 0, void 0, function* () {
        protractor_1.browser.sleep(2000);
        yield expect(protractor_1.element(protractor_1.by.buttonText(buttonName.toString())));
    }));
    Then(/^o sistema retorna o vendedor que está registrado com o id "(\d*)", nome "([^\"]*)", Número de vendas "(\d*)" e Valor bruto de vendas "([^\"]*)"$/, (id, name, monthly_sells, monthly_sales_price) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield compareSeller(id.toString(), name.toString(), monthly_sells.toString(), monthly_sales_price.toString(), seller);
    }));
    Then(/^o sistema lista em uma tabela o vendedor com nome "([^\"]*)", o vendedor com nome "([^\"]*)" e o vendedor com nome "([^\"]*)", nesta ordem$/, (seller1, seller2, seller3) => __awaiter(this, void 0, void 0, function* () {
        let tmp_list = [seller1, seller2, seller3];
        yield protractor_1.element
            .all(protractor_1.by.css("#sellername"))
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
    }));
});
