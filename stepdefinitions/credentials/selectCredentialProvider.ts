import { CredentialSetupWizardPageObject } from "../../modules/credentialsSetupWizard"
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let credentialSetupWizard: CredentialSetupWizardPageObject = new CredentialSetupWizardPageObject();

    When(/^I click on the Cloud provider$/, async () => {
        await credentialSetupWizard.providerSelector.click();
        await credentialSetupWizard.selectOpenstack();
    });

    Then(/^I should see OpenStack as selected provider$/, async () => {
        await expect(credentialSetupWizard.getSelectedProvider('openstack').isDisplayed()).to.eventually.be.true;
    })

});