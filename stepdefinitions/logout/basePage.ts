import { BasePageObject } from "../../pages/basePage";
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ Given }) {
    let basepage: BasePageObject = new BasePageObject();

    Given(/^I am on the Cloudbreak base page$/, async () => {
        await expect(basepage.logoutToggle).to.be.displayed;
    });
});