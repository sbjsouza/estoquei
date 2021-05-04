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
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;
const request = require("request-promise");
let dashboardData = {};
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
function checkProd(id, product, price, sales) {
    return __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: `GET`,
            json: true,
            uri: `http://localhost:3000/vendas/${id}`,
        };
        try {
            const response = yield request(options);
            expect(response.id.toString()).to.equal(id);
            expect(response.product.toString()).to.equal(product);
            expect(parseFloat(response.value.toString())).to.equal(parseFloat(price.toString()));
            expect(response.quantity.toString()).to.equal(sales);
            return Promise.resolve(true);
        }
        catch (error) {
            Promise.reject(error);
            expect(false).to.equal(true);
        }
    });
}
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^existe o produto "([^\"]*)" cadastrado com id "(\d*)" no valor de "(\d*)" reais com "(\d*)" vendas$/, (product, id, price, sales) => __awaiter(this, void 0, void 0, function* () {
        yield checkProd(id.toString(), product.toString(), price.toString(), sales.toString());
    }));
    When(/^eu vou para página "([^\"]*)" com o título "([^\"]*)"$/, (pagename, title) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get(`http://localhost:4200/${pagename.toString().toLowerCase()}/`);
        yield expect(protractor_1.element(protractor_1.by.css("#pagename")).getText()).to.eventually.equal(title.toString());
    }));
    Then(/^a tabela "([^\"]*)" contem respectivamente: "([^\"]*)", "([^\"]*)", "([^\"]*)"$/, (table_id, product_1, product_2, product_3) => __awaiter(this, void 0, void 0, function* () {
        const products = [product_1, product_2, product_3];
        yield protractor_1.element
            .all(protractor_1.by.css(`#${table_id}-product`))
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
    }));
    When(/^eu solicito ao servidor o "([^\"]*)"$/, (endpoint) => __awaiter(this, void 0, void 0, function* () {
        const options = {
            method: `GET`,
            json: true,
            uri: `http://localhost:3000/${endpoint}`,
        };
        const response = yield request(options);
        dashboardData = response;
    }));
    Then(/^o sistema retorna o dashboard contendo três itens na lista de "([^\"]*)" e três itens na lista de "([^\"]*)"$/, (key_1, key_2) => __awaiter(this, void 0, void 0, function* () {
        expect(dashboardData[key_1.toString()].length).to.equal(3);
        expect(dashboardData[key_2.toString()].length).to.equal(3);
    }));
    Then(/^a lista de "([^\"]*)" contem respectivamente: "([^\"]*)" de id "([^\"]*)" com "([^\"]*)" "([^\"]*)", "([^\"]*)" de id "([^\"]*)" com "([^\"]*)" "([^\"]*)", "([^\"]*)" de id "([^\"]*)" com "([^\"]*)" "([^\"]*)"$/, (key, product_1, id_1, test_value_1, test_case_1, product_2, id_2, test_value_2, test_case_2, product_3, id_3, test_value_3, test_case_3) => __awaiter(this, void 0, void 0, function* () {
        const list = dashboardData[key.toString()];
        const expectedList = [
            {
                product: product_1,
                id: id_1,
                test_case: test_case_1,
                key: test_value_1,
            },
            {
                product: product_2,
                id: id_2,
                test_case: test_case_2,
                key: test_value_2,
            },
            {
                product: product_3,
                id: id_3,
                test_case: test_case_3,
                key: test_value_3,
            },
        ];
        for (let i = 0; i < 3; i++) {
            const expected = expectedList[i];
            const expectedTestValue = expected["key"];
            const current = list[i];
            const testCase = current["test_case"];
            if (testCase == "vendas") {
                expect(current['id'].toString()).to.equal(expected['id'].toString());
                expect(current['product'].toString()).to.equal(expected['product'].toString());
                expect(parseFloat(current['quantity'].toString())).to.equal(parseFloat(expectedTestValue.toString()));
            }
            else if (testCase == "reais de faturamento") {
                expect(current['id'].toString()).to.equal(expected['id'].toString());
                expect(current['product'].toString()).to.equal(expected['product'].toString());
                const revenue = current['quantity'] * parseFloat(current['value'].toString());
                expect(revenue).to.equal(parseFloat(expectedTestValue.toString()));
            }
        }
    }));
    Then(/^a lista de "([^\"]*)" contem respectivamente: "([^\"]*)" de id "([^\"]*)" faturando "([^\"]*)" reais, "([^\"]*)" de id "([^\"]*)" faturando "([^\"]*)" reais, "([^\"]*)" de id "([^\"]*)" faturando "([^\"]*)" reais$/, (key, product_1, id_1, revenue_1, product_2, id_2, revenue_2, product_3, id_3, revenue_3) => __awaiter(this, void 0, void 0, function* () {
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
    }));
});
