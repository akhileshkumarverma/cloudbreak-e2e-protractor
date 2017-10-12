import { CredentialsPageObject } from "../../pages/credentialsPage"
import { defineSupportCode } from 'cucumber'
import { browser } from "protractor";

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let credentials: CredentialsPageObject = new CredentialsPageObject();

    const name = process.env.CREDENTIAL_NAME + browser.params.nameTag;

    When(/^I delete my Credential for "([^"]*)"$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await credentials.deleteCredential(name + 'os');
                break;
            case "AWS":
                await credentials.deleteCredential(name + 'aws');
                break;
            case "Azure":
                await credentials.deleteCredential(name + 'azure');
                break;
            default:
                console.log('No such provider!');
        }
    });

    Then(/^I should NOT see my previously created credential on the page$/, async () => {
       await expect(credentials.isCredentialDeleted(name)).to.eventually.be.true;
    });
});