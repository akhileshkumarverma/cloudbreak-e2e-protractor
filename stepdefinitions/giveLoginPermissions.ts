import { LoginPageObject } from '../pages/loginPage';
import { defineSupportCode } from 'cucumber';
let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let login: LoginPageObject = new LoginPageObject();

    When(/^I give my username "(.*?)"$/, async (text) => {
        await login.usernameBox.sendKeys(text);
    });

    Then(/^I give my password "(.*?)"$/, async (text) => {
        await login.passwordBox.sendKeys(text);
    });

    Then(/^I click on Login button$/, async () => {
        await login.loginButton.click();
    });

})