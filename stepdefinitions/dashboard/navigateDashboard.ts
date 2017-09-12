import { DashboardPageObject } from '../../pages/dashboardPage';
import { LoginPageObject } from '../../pages/loginPage';
import { defineSupportCode } from 'cucumber';

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let dashboard: DashboardPageObject = new DashboardPageObject();

    When(/^I click on the Credentials menu item$/, async () => {
        await dashboard.openCredentials();
    });

    When(/^I click on the Logout icon$/, async () => {
        await dashboard.logOut();
    });

    Then(/^I should be logged out$/, async () => {
        let login: LoginPageObject = new LoginPageObject();

        await expect(login.loginButton).to.be.displayed;
    });

});