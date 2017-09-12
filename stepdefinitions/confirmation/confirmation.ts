import { ConfirmationPageObject } from '../../pages/confirmationPage';
import { defineSupportCode } from 'cucumber';
import { $ } from 'protractor';

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let confirmation: ConfirmationPageObject = new ConfirmationPageObject();
    When(/^I check to agree the Terms of Use$/, async () => {
        await confirmation.optCheckBox.click();
    });

    When(/^I click on agree button$/, async () => {
        await confirmation.agreeButton.click();
    });

    Then(/^I should get to Dashboard page$/, async () => {
        await await expect($("body[id='cloudbreak-ui']")).to.be.displayed;
    });
});