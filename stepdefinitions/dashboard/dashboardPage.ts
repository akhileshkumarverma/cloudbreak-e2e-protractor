import { DashboardPageObject } from '../../pages/dashboardPage';
import { defineSupportCode } from 'cucumber';

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ Given }) {
    let dashboard: DashboardPageObject = new DashboardPageObject();

    Given(/^I am on the Cloudbreak Dashboard page$/, async () => {
        await expect(dashboard.cloudbreakBody).to.be.displayed;
    });
});