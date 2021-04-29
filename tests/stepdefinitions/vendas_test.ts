import { defineSupportCode } from 'cucumber';
import { browser, $, element, ElementArrayFinder, by } from 'protractor';
import * as fs from 'fs';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;


let pAND = ((p,q) => p.then(a => q.then(b => a && b)))

defineSupportCode(function ({ Given, When, Then }) {
    Given(/^eu estou na página de "([^\"]*)"$/, async (pagename)=> {
        await browser.get("http://localhost:4200/");
        await expect(element(by.css("#pagename")).getText()).to.eventually.equal(
        pagename.toString()
        );
    })

    Given(/^eu clico em "([^\"]*)"$/, async (button) => {
        await element(by.buttonText(<string> button)).click();
    });


    Then(/^o sistema baixa o arquivo "([^\"]*)"$/, async (file_name) => {
        
        await fs.existsSync(<string>file_name);
    });

})