import { CredentialSetupWizardPageObject } from "../../modules/credentialsSetupWizard"
import { defineSupportCode } from 'cucumber'

defineSupportCode(function ({ Given }) {
    let credentialSetupWizard: CredentialSetupWizardPageObject = new CredentialSetupWizardPageObject();

    Given(/^I am on the Cloudbreak Credential Setup Wizard$/, async () => {
        await credentialSetupWizard.amIOnTheCreateCredentialWizard();
    });
});