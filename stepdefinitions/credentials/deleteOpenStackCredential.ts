import { CredentialsPageObject } from "../../pages/credentialsPage";
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let credentials: CredentialsPageObject = new CredentialsPageObject();

    When(/^I delete my previously created OpenStack credential$/, async () => {
        await credentials.deleteCredential('openstack-autotesting');
    });

    Then(/^I should NOT see my previously created credential on the page$/, async () => {
       await expect(credentials.isCredentialExist('openstack-autotesting')).fail();
    });


});