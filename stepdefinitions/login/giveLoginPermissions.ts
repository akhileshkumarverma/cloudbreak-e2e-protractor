import { LoginPageObject } from '../../pages/loginPage'
import { BasePageObject } from "../../pages/basePage";
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let login: LoginPageObject = new LoginPageObject();

    When(/^I submit my user credentials$/, async () => {
        await expect(login.login()).to.eventually.be.true;
    });

    When(/^Close Credential warning dialog if it is present$/, async () => {
        await login.closeDefaultCredentialWarning();
    });

    Then(/^I should be logged in$/, async () => {
        let base: BasePageObject = new BasePageObject();

        await expect(base.amIOnTheClustersPage()).to.eventually.be.true;
    });
});