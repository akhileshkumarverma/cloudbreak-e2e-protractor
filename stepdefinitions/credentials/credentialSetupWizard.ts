import { CredentialSetupWizardPageObject } from "../../modules/credentialsSetupWizard"
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ Given }) {
    let credentialSetupWizard: CredentialSetupWizardPageObject = new CredentialSetupWizardPageObject();

    Given(/^I am on the Cloudbreak Credential Setup Wizard$/, async () => {
        await expect(credentialSetupWizard.amIOnTheCreateCredentialWizard()).to.eventually.be.true;
    });
});