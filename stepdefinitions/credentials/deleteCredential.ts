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
                await expect(credentials.deleteCredential(name + 'os')).to.eventually.be.true;
                break;
            case "AWS":
                await expect(credentials.deleteCredential(name + 'aws')).to.eventually.be.true;
                break;
            case "Azure":
                await expect(credentials.deleteCredential(name + 'azure')).to.eventually.be.true;
                break;
            case "GCP":
                await expect(credentials.deleteCredential(name + 'gcp')).to.eventually.be.true;
                break;
            default:
                console.log('No such provider!');
        }
    });

    Then(/^I should NOT see my previously created credential on the page$/, async () => {
       await expect(credentials.isCredentialDeleted(name)).to.eventually.be.true;
    });
});