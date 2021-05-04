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
const fs = require("fs");
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
const request = require("request-promise");
let pAND = ((p, q) => p.then(a => q.then(b => a && b)));
let total_value = "";
const homedir = require('os').homedir();
function getTotal(venda) {
    return __awaiter(this, void 0, void 0, function* () {
        return parseFloat(venda.value) * venda.quantity;
    });
}
function getSaleID(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: `GET`,
            json: true,
            uri: `http://localhost:3000/vendas/${id}`,
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
function checkProd(id, product) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: `GET`,
            json: true,
            uri: `http://localhost:3000/vendas/${id}`,
        };
        try {
            const response = yield request(options);
            return Promise.resolve(response.id.toString() == id.toString()
                ? expect(response.product.toString()).to.equal(product)
                : expect(false).to.equal(true));
        }
        catch (error) {
            Promise.reject(error);
            expect(false).to.equal(true);
        }
    });
}
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de "([^\"]*)"$/, (pagename) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.element(protractor_1.by.css("#pagename")).getText()).to.eventually.equal(pagename.toString());
    }));
    Given(/^a venda cadastrada no sistema do produto "([^\"]*)" que tem id "([^\"]*)"$/, (product, id) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield checkProd(id.toString(), product.toString());
    }));
    When(/^eu clico em "([^\"]*)"$/, (button) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText(button)).click();
    }));
    When(/^eu pergunto ao sistema sobre o total ganho na venda de id "(\d*)"$/, (id) => __awaiter(this, void 0, void 0, function* () {
        let sale = yield getSaleID(id.toString());
        total_value = (yield getTotal(sale)).toString();
    }));
    Then(/^o sistema baixa o arquivo "([^\"]*)"$/, (file_name) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.wait(function () {
            return __awaiter(this, void 0, void 0, function* () {
                return yield fs.existsSync(homedir + '/Downloads/' + file_name);
            });
        }, 30 * 1000, "Arquivo não foi baixado em 30 segundos");
    }));
    Then(/^o sistema retorna o total de "([^\"]*)"$/, (value) => __awaiter(this, void 0, void 0, function* () {
        yield expect(total_value).to.equal(value);
    }));
});
