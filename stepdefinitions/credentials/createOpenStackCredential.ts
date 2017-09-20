import { CredentialSetupWizardPageObject } from "../../modules/credentialsSetupWizard"
import { defineSupportCode } from 'cucumber'
import { $ } from 'protractor'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let credentialSetupWizard: CredentialSetupWizardPageObject = new CredentialSetupWizardPageObject();
    const keystoneVersion = 'v2';
    const name = 'openstack-autotesting';
    const description = 'autotesting';
    const user = process.env.OS_USERNAME;
    const password = process.env.OS_PASSWORD;
    const tenantName = process.env.OS_TENANT_NAME;
    const endpoint = process.env.OS_ENDPOINT;
    const apiFacing = 'internal';

    When(/^I submit my OpenStack credentials$/, async () => {
        await credentialSetupWizard.createOpenStackCredential(keystoneVersion, name, description, user, password, tenantName, endpoint, apiFacing);
    });
});