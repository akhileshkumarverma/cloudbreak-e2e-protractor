import { BasePageObject } from "../../pages/basePage";
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let base: BasePageObject = new BasePageObject();

    When(/^I click on the Logout icon$/, async () => {
        await base.logOut();
    });

    Then(/^I should be logged out$/, async () => {
        await base.isLoggedOut();
    });
});