import { CredentialsPageObject } from "../../pages/credentialsPage"
import { defineSupportCode } from 'cucumber'

let expect = require('chai').expect;

defineSupportCode(function ({ When, Then }) {
    let credentials: CredentialsPageObject = new CredentialsPageObject();

    When(/^I delete my previously created OpenStack credential$/, async () => {
        await credentials.deleteCredential('openstack-autotesting');
    });

    Then(/^I should NOT see my previously created credential on the page$/, async () => {
       await credentials.isCredentialDeleted('openstack-autotesting').then((result) => {
           return expect(result).to.equal(false);
       });
    });
});