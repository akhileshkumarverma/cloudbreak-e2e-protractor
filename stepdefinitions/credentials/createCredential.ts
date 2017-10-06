import { CredentialSetupWizardPageObject } from "../../modules/credentialsSetupWizard"
import { defineSupportCode } from 'cucumber'
import { browser } from 'protractor'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let credentialSetupWizard: CredentialSetupWizardPageObject = new CredentialSetupWizardPageObject();
    let provider = process.env.PROVIDER;

    const name = process.env.CREDENTIAL_NAME + browser.params.nameTag;

    When(/^I submit my provider related credentials$/, async () => {
        if(provider.toLocaleLowerCase() == 'openstack') {
            const keystoneVersion = 'v2';
            const description = 'autotesting';
            const user = process.env.OS_USERNAME;
            const password = process.env.OS_PASSWORD;
            const tenantName = process.env.OS_TENANT_NAME;
            const endpoint = process.env.OS_ENDPOINT;
            const apiFacing = process.env.OS_APIFACING;

            await credentialSetupWizard.createOpenStackCredential(keystoneVersion, name, description, user, password, tenantName, endpoint, apiFacing);
        } else {
            const type = 'role-based';
            const description = 'autotesting';
            const role = process.env.AWS_ROLE_ARN;

            await credentialSetupWizard.createAWSCredential(type, name, description, role);
        }
    });
});