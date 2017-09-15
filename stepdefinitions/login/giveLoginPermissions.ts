import { LoginPageObject } from '../../pages/loginPage'
import { DashboardPageObject } from '../../pages/dashboardPage'
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let login: LoginPageObject = new LoginPageObject();

    When(/^I submit my user credentials$/, async () => {
        await login.login();
    });

    Then(/^I should be logged in$/, async () => {
        let dashboard: DashboardPageObject = new DashboardPageObject();

        await expect(dashboard.cloudbreakBody).to.be.displayed;
    });
});