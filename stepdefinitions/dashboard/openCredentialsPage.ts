import { CredentialsPageObject } from "../../pages/credentialsPage"
import { DashboardPageObject } from "../../pages/dashboardPage";
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let dashboard: DashboardPageObject = new DashboardPageObject();

    When(/^I click on the Credentials menu item$/, async () => {
        await dashboard.openCredentials();
    });

    Then(/^I should see Credentials page$/, async () => {
        let credentials: CredentialsPageObject = new CredentialsPageObject();

        await expect(credentials.credentialCreateButton).to.be.displayed;
    });

});