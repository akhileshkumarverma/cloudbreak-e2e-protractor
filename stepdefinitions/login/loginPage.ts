import { browser } from 'protractor';
import { LoginPageObject } from '../../pages/loginPage';
import { defineSupportCode } from 'cucumber';

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given }) {
    let login: LoginPageObject = new LoginPageObject();

    Given(/^I am on the Cloudbreak Login page$/, async () => {
        await expect(browser.getTitle()).to.eventually.equal('Hortonworks Cloudbreak');
    });
});