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
function getStoresById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: `GET`,
            json: true,
            uri: `http://localhost:3000/lojas/${id}`,
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
function checkLoja(name, image, store_localization_url, id, monthly_sells, monthly_expense_cost, store_profit) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: `GET`,
            json: true,
            uri: `http://localhost:3000/lojas/${id}`,
        };
        try {
            const response = yield request(options);
            return Promise.resolve(response.monthly_sells.toString() == monthly_sells.toString() &&
                response.store_profit.toString() == store_profit.toString() &&
                response.monthly_expense_cost.toString() == monthly_expense_cost.toString() &&
                response.image.toString() == image.toString() &&
                response.store_localization_url.toString() == store_localization_url.toString()
                ? expect(response.name.toString()).to.equal(name)
                : expect(false).to.equal(true));
        }
        catch (error) {
            Promise.reject(error);
            expect(false).to.equal(true);
        }
    });
}
var loja;
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    // Given a loja está registrada com o id "1", nome "Lojão", Valor de vendas "400.00", Despesas "300.00", Lucro "100.00", 
    // Logo "varejao.png" e localização "https://www.google.com.br/maps/place/Varej%C3%A3o+do+Povo/@-8.0862002,-34.9304656,13z/data=!4m9!1m2!2m1!1svarejao!3m5!1s0x7ab192bda710d69:0x3a46c0c062ec7c72!8m2!3d-8.0683125!4d-34.9099961!15sCgd2YXJlamFvWhIKB3ZhcmVqYW8iB3ZhcmVqYW-SAQ1ncm9jZXJ5X3N0b3Jl"
    Given(/^a loja está registrada com o id "(\d*)", nome "([^\"]*)", Valor de vendas "([^\"]*)",  Despesas "([^\"]*)", Lucro "([^\"]*)", Logo "([^\"]*)" e Localização "([^\"]*)" e  $/, (name, image, store_localization_url, id, monthly_sells, monthly_expense_cost, store_profit) => __awaiter(this, void 0, void 0, function* () {
        yield checkLoja(name.toString(), image.toString(), store_localization_url.toString(), parseInt(id.toString()), parseInt(monthly_sells.toString()), parseInt(monthly_expense_cost.toString()), parseInt(store_profit.toString()));
    }));
    // When eu pergunto ao sistema pela loja com id "1"
    When(/^eu pergunto ao sistema pela loja com id "(\d*)"$/, (id) => __awaiter(this, void 0, void 0, function* () {
        loja = yield getStoresById(id.toString());
    }));
    // Then o sistema retorna a loja que está registrada com o id "1", nome "Lojão", Valor de vendas "400.00", Despesas "300.00", Lucro "100.00", 
    // Logo "varejao.png" e Localização "https://www.google.com.br/maps/place/Varej%C3%A3o+do+Povo/@-8.0862002,-34.9304656,13z/data=!4m9!1m2!2m1!1svarejao!3m5!1s0x7ab192bda710d69:0x3a46c0c062ec7c72!8m2!3d-8.0683125!4d-34.9099961!15sCgd2YXJlamFvWhIKB3ZhcmVqYW8iB3ZhcmVqYW-SAQ1ncm9jZXJ5X3N0b3Jl"
    Then(/^ao sistema retorna a loja que está registrada com o id "(\d*)", nome "([^\"]*)", Valor de vendas "([^\"]*)",  Despesas "([^\"]*)", Lucro "([^\"]*)", Logo "([^\"]*)" e Localização "([^\"]*)" e  $/, (name, image, store_localization_url, id, monthly_sells, monthly_expense_cost, store_profit) => __awaiter(this, void 0, void 0, function* () {
        const options = { method: `GET`, json: true, uri: `http://localhost:3000/lojas/${id}` };
        const loja = yield request(options);
        Promise.resolve(loja.monthly_sells.toString() == monthly_sells.toString() &&
            loja.store_profit.toString() == store_profit.toString() &&
            loja.monthly_expense_cost.toString() == monthly_expense_cost.toString() &&
            loja.image.toString() == image.toString() &&
            loja.store_localization_url.toString() == store_localization_url.toString()
            ? expect(loja.name.toString()).to.equal(name)
            : expect(false).to.equal(true));
    }));
    // Given eu estou na página "Lojas"
    Given(/^eu estou na página "([^\"]*)"$/, (pagename) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/" + pagename.toString().toLowerCase());
        yield expect(protractor_1.element(protractor_1.by.css("#pagename")).getText()).to.eventually.equal(pagename.toString());
    }));
    When(/^eu seleciono "([^\"]*)"$/, (buttonProfit) => __awaiter(this, void 0, void 0, function* () {
        protractor_1.browser.sleep(2000);
        yield expect(protractor_1.element(protractor_1.by.buttonText(buttonProfit.toString())));
    }));
    // Then o sistema lista as lojas com nome "Descontão", "Atacadão", "Varejão" e "Lojão", nesta ordem
    Then(/^o sistema lista as lojas com nome "([^\"]*)", a loja com nome "([^\"]*)", a loja com nome "([^\"]*)" e a loja com nome "([^\"]*)", nesta ordem$/, (loja1, loja2, loja3, loja4) => __awaiter(this, void 0, void 0, function* () {
        let tmp_list = [loja1, loja2, loja3, loja4];
        yield protractor_1.element
            .all(protractor_1.by.css("#lojaname"))
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
    // When eu seleciono novamente "Lucro"
    When(/^eu seleciono novamente "([^\"]*)"$/, (buttonProfit) => __awaiter(this, void 0, void 0, function* () {
        protractor_1.browser.sleep(2000);
        yield expect(protractor_1.element(protractor_1.by.buttonText(buttonProfit.toString())));
    }));
    // Then o sistema lista as lojas com nome "Lojão", "Varejão", "Atacadão" e "Descontão", nesta ordem
    Then(/^o sistema lista as lojas com nome "([^\"]*)", a loja com nome "([^\"]*)", a loja com nome "([^\"]*)" e a loja com nome "([^\"]*)", nesta ordem$/, (loja1, loja2, loja3, loja4) => __awaiter(this, void 0, void 0, function* () {
        let tmp_list = [loja1, loja2, loja3, loja4];
        yield protractor_1.element
            .all(protractor_1.by.css("#lojaname"))
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
