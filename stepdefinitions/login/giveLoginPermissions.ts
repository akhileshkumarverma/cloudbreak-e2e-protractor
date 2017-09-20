import { LoginPageObject } from '../../pages/loginPage'
import { ClustersPageObject } from '../../pages/clustersPage'
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let login: LoginPageObject = new LoginPageObject();

    When(/^I submit my user credentials$/, async () => {
        await login.login();
    });

    Then(/^I should be logged in$/, async () => {
        let dashboard: ClustersPageObject = new ClustersPageObject();

        await expect(dashboard.cloudbreakBody).to.be.displayed;
    });
});