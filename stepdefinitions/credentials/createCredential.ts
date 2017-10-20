import { CredentialSetupWizardPageObject } from "../../modules/credentialsSetupWizard"
import { defineSupportCode } from 'cucumber'
import { browser } from 'protractor'
import {async} from "q";

defineSupportCode(function ({ When, Then }) {
    let credentialSetupWizard: CredentialSetupWizardPageObject = new CredentialSetupWizardPageObject();

    const name = process.env.CREDENTIAL_NAME + browser.params.nameTag;

    When(/^I create my new Credential for the following "([^"]*)"$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                const keystoneVersion = 'v2';
                const user = process.env.OS_USERNAME;
                const password = process.env.OS_PASSWORD;
                const tenantName = process.env.OS_TENANT_NAME;
                const endpoint = process.env.OS_ENDPOINT;
                const apiFacing = process.env.OS_APIFACING;

                await credentialSetupWizard.createOpenStackCredential(keystoneVersion, name + 'os', user, password, tenantName, endpoint, apiFacing);
                break;
            case "AWS":
                const awsType = 'role-based';
                const role = process.env.AWS_ROLE_ARN;

                await credentialSetupWizard.createAWSCredential(awsType, name + 'aws', role);
                break;
            case "Azure":
                const azureType = 'app-based';
                const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
                const tenantId = process.env.AZURE_TENANT_ID;
                const appId = process.env.AZURE_APP_ID;
                const appPassword = process.env.AZURE_PASSWORD;

                await credentialSetupWizard.createAzureCredential(azureType, name + 'azure', subscriptionId, tenantId, appId, appPassword);
                break;
            case "GCP":
                const projectId = process.env.GCP_PROJECT_ID;
                const serviceAccountEmail = process.env.GCP_ACCOUNT_EMAIL;
                const p12Path = process.env.P12_PATH;

                await credentialSetupWizard.createGCPCredential(name + 'gcp', projectId, serviceAccountEmail, p12Path);
                break;
            default:
                console.log('No such provider!');
        }
    });
});