import {CredentialsPageObject} from "../../pages/credentialsPage";
import {CredentialSetupWizardPageObject} from "../../pages/modules/credentialsSetupWizard";
import {browser} from "protractor";

describe('Testing Cloudbreak credential creation', () => {
    let credentials: CredentialsPageObject = new CredentialsPageObject();

    const name = process.env.CREDENTIAL_NAME + browser.params.nameTag;

    beforeAll(() => {
        credentials.openPage('Credentials');
    });

    describe('where the Credentials page', () => {

        it('should be opened from base page',() => {
            expect(credentials.amIOnTheCredentialsPage()).toBeTruthy();
        });
    });

    describe('where user is able to delete old credentials', () => {

        beforeEach(async () => {
            await credentials.openPage('Credentials');
        });

        afterAll(async () => {
            await credentials.deleteAllCredentials();
        });

        it('previously created OpenStack credential should delete',() => {
            expect(credentials.deleteCredential(name + 'os')).toBeTruthy();
        });
        it('previously created OpenStack credential should be deleted',() => {
            expect(credentials.isCredentialDeleted(name + 'os')).toBeTruthy();
        });

        it('previously created AWS credential should delete',() => {
            expect(credentials.deleteCredential(name + 'aws')).toBeTruthy();
        });
        it('previously created AWS credential should be deleted',() => {
            expect(credentials.isCredentialDeleted(name + 'aws')).toBeTruthy();
        });

        it('previously created Azure credential should delete',() => {
            expect(credentials.deleteCredential(name + 'azure')).toBeTruthy();
        });
        it('previously created Azure credential should be deleted',() => {
            expect(credentials.isCredentialDeleted(name + 'azure')).toBeTruthy();
        });

        it('previously created GCP credential should delete',() => {
            expect(credentials.deleteCredential(name + 'gcp')).toBeTruthy();
        });
        it('previously created GCP credential should be deleted',() => {
            expect(credentials.isCredentialDeleted(name + 'gcp')).toBeTruthy();
        });
    });

    describe('where the Create Credential', () => {

        it('should open Credential Setup Wizard',() => {
            expect(credentials.openCredentialSetupWizard()).toBeTruthy();
        });
    });

    describe('where the Credential Setup Wizard', () => {
        let credentialSetupWizard: CredentialSetupWizardPageObject = new CredentialSetupWizardPageObject();

        it('should be opened',() => {
            expect(credentialSetupWizard.amIOnTheCreateCredentialWizard()).toBeTruthy();
        });

        it('should show Provider Selector by default',() => {
            expect(credentialSetupWizard.providerSelector.isDisplayed()).toBeTruthy();
        });

    });

    describe('where user is able to create credentials', () => {
        let credentialSetupWizard: CredentialSetupWizardPageObject = new CredentialSetupWizardPageObject();

        beforeEach((done) => {
            credentialSetupWizard.amIOnTheCreateCredentialWizard();
            done();
        });

        it('new OpenStack credential should be created',() => {
            const keystoneVersion = 'v2';
            const user = process.env.OS_USERNAME;
            const password = process.env.OS_PASSWORD;
            const tenantName = process.env.OS_TENANT_NAME;
            const endpoint = process.env.OS_ENDPOINT;
            const apiFacing = process.env.OS_APIFACING;

            expect(credentialSetupWizard.createOpenStackCredential(keystoneVersion, name + 'os', user, password, tenantName, endpoint, apiFacing)).toBeTruthy();
        });

        it('new AWS credential should be created',() => {
            const awsType = 'role-based';
            const role = process.env.AWS_ROLE_ARN;

            expect(credentialSetupWizard.createAWSCredential(awsType, name + 'aws', role)).toBeTruthy();
        });

        it('new Azure credential should be created',() => {
            const azureType = 'app-based';
            const subscriptionId = process.env.AZURE_SUBSCRIPTION_ID;
            const tenantId = process.env.AZURE_TENANT_ID;
            const appId = process.env.AZURE_APP_ID;
            const appPassword = process.env.AZURE_PASSWORD;

            expect(credentialSetupWizard.createAzureCredential(azureType, name + 'azure', subscriptionId, tenantId, appId, appPassword)).toBeTruthy();
        });

        it('new GCP credential should be created',() => {
            const projectId = process.env.GCP_PROJECT_ID;
            const serviceAccountEmail = process.env.GCP_ACCOUNT_EMAIL;
            const p12Path = process.env.P12_PATH;

            expect(credentialSetupWizard.createGCPCredential(name + 'gcp', projectId, serviceAccountEmail, p12Path)).toBeTruthy();
        });

    });
});