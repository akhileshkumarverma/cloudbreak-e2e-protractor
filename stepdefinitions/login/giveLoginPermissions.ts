import { LoginPageObject } from '../../pages/loginPage';
import { DashboardPageObject } from '../../pages/dashboardPage';
import { defineSupportCode } from 'cucumber';

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let login: LoginPageObject = new LoginPageObject();
    const username = process.env.USERNAME;
    const password = process.env.PASSWORD;

    When(/^I give my username$/, async () => {
        await login.usernameBox.sendKeys(username);
    });

    When(/^I give my password$/, async () => {
        await login.passwordBox.sendKeys(password);
    });

    When(/^I click on Login button$/, async () => {
        await login.loginButton.click();
    });

    Then(/^I should be logged in$/, async () => {
        let dashboard: DashboardPageObject = new DashboardPageObject();

        await expect(dashboard.cloudbreakBody).to.be.displayed;
    });
});