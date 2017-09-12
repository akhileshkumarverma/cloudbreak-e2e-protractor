import { browser } from 'protractor';
import { ConfirmationPageObject } from '../pages/confirmationPage';
import { defineSupportCode } from 'cucumber';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ Given }) {
    let confirmation: ConfirmationPageObject = new ConfirmationPageObject();

    Given(/^I am on Confirmation page$/, async () => {
        await expect(browser.getTitle()).to.eventually.equal('Hortonworks Data Cloud');
    });
});