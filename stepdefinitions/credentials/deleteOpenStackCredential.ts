import { CredentialsPageObject } from "../../pages/credentialsPage"
import { defineSupportCode } from 'cucumber'
import { browser } from "protractor";

let expect = require('chai').expect;

defineSupportCode(function ({ When, Then }) {
    let credentials: CredentialsPageObject = new CredentialsPageObject();

    const name = process.env.CREDENTIAL_NAME + browser.params.nameTag;

    When(/^I delete my previously created OpenStack credential$/, async () => {
        await credentials.deleteCredential(name);
    });

    Then(/^I should NOT see my previously created credential on the page$/, async () => {
       await credentials.isCredentialDeleted(name).then((result) => {
           return expect(result).to.equal(false);
       });
    });
});