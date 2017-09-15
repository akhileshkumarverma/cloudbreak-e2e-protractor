import { CredentialsPageObject } from "../../pages/credentialsPage"
import { CredentialSetupWizardPageObject } from "../../modules/credentialsSetupWizard"
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let credentials: CredentialsPageObject = new CredentialsPageObject();

    When(/^I click on the Create Credential button$/, async () => {
        await credentials.credentialCreateButton.click();
    });

    Then(/^I should see Credential Setup Wizard$/, async () => {
        let credentialSetupWizard: CredentialSetupWizardPageObject = new CredentialSetupWizardPageObject();

        await expect(credentialSetupWizard.providerSelector).to.be.displayed;
    });

});