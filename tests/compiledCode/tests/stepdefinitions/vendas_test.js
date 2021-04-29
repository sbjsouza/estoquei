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
let pAND = ((p, q) => p.then(a => q.then(b => a && b)));
cucumber_1.defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de "([^\"]*)"$/, (pagename) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.browser.get("http://localhost:4200/");
        yield expect(protractor_1.element(protractor_1.by.css("#pagename")).getText()).to.eventually.equal(pagename.toString());
    }));
    Given(/^eu clico em "([^\"]*)"$/, (button) => __awaiter(this, void 0, void 0, function* () {
        yield protractor_1.element(protractor_1.by.buttonText(button)).click();
    }));
    Then(/^o sistema baixa o arquivo "([^\"]*)"$/, (file_name) => __awaiter(this, void 0, void 0, function* () {
        yield fs.existsSync(file_name);
    }));
});
