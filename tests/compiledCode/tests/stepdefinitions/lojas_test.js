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
function getStoreById(id) {
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
function checkStore(id, name, store_profit) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: `GET`,
            json: true,
            uri: `http://localhost:3000/lojas/${id}`,
        };
        try {
            const response = yield request(options);
            return Promise.resolve(response.id.toString() == id.toString() &&
                response.store_profit.toString() ==
                    store_profit.toString()
                ? expect(response.name.toString()).to.equal(name)
                : expect(false).to.equal(true));
        }
        catch (error) {
            Promise.reject(error);
            expect(false).to.equal(true);
        }
    });
}
function compareStore(id, name, store_profit, loja) {
    return __awaiter(this, void 0, void 0, function* () {
        return Promise.resolve(loja.id.toString() == id.toString() &&
            loja.store_profit.toString() == store_profit.toString()
            ? expect(loja.name.toString()).to.equal(name)
            : expect(false).to.equal(true));
    });
}
var loja;
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página "([^\"]*)"$/, (pagename) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/" + pagename.toString().toLowerCase());
        yield expect(protractor_1.element(protractor_1.by.css("#pagename")).getText()).to.eventually.equal(pagename.toString());
    }));
    ;
    Given(/^a loja está registrada com o id "([^\"]*)", nome "([^\"]*)" e Lucro "(\d*)"$/, (id, name, store_profit) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield checkStore(id.toString(), name.toString(), store_profit.toString());
    }));
    When(/^eu seleciono "([^\"]*)"$/, (buttonProfit) => __awaiter(this, void 0, void 0, function* () {
        protractor_1.browser.sleep(2000);
        yield expect(protractor_1.element(protractor_1.by.buttonText(buttonProfit.toString())));
    }));
    Then(/^o sistema lista as lojas com nome "([^\"]*)", "([^\"]*)", "([^\"]*)" e "([^\"]*)", nesta ordem$/, (loja1, loja2, loja3, loja4) => __awaiter(this, void 0, void 0, function* () {
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
    When(/^eu pergunto ao sistema pela loja com id "(\d*)"$/, (id) => __awaiter(this, void 0, void 0, function* () {
        loja = yield getStoreById(id.toString());
    }));
    Then(/^o sistema retorna a loja que está registrada com o id "(\d*)", nome "([^\"]*)" e Lucro "([^\"]*)"$/, (id, name, store_profit) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield compareStore(id.toString(), name.toString(), store_profit.toString(), loja);
    }));
});
