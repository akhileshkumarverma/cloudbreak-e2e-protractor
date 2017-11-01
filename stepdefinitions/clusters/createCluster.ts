import { ClusterCreateWizardPageObject } from "../../modules/clusterCreateWizard";
import { defineSupportCode } from 'cucumber'
import { browser } from "protractor";

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let clusterCreateSetupWizard: ClusterCreateWizardPageObject = new ClusterCreateWizardPageObject();

    const credentialName = process.env.CREDENTIAL_NAME + browser.params.nameTag;
    const clusterName = process.env.CLUSTER_NAME + browser.params.nameTag;
    const user = process.env.AMBARI_USER;
    const password = process.env.AMBARI_PASSWORD;
    const sshKey = process.env.SSH_KEY;
    const sshKeyName = process.env.SSH_KEY_NAME;

    When(/^I select my previously created "([^"]*)" credential$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await clusterCreateSetupWizard.selectCredential(credentialName + 'os');
                break;
            case "AWS":
                await clusterCreateSetupWizard.selectCredential(credentialName + 'aws');
                break;
            case "Azure":
                await clusterCreateSetupWizard.selectCredential(credentialName + 'azure');
                break;
            case "GCP":
                await clusterCreateSetupWizard.selectCredential(credentialName + 'gcp');
                break;
            default:
                console.log('No such provider!');
        }
    });

    When(/^I create my new Cluster for "([^"]*)"$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await clusterCreateSetupWizard.createOpenStackCluster(credentialName + 'os',clusterName + 'os', user, password, sshKeyName);
                break;
            case "AWS":
                await clusterCreateSetupWizard.createAWSCluster(credentialName + 'aws', clusterName + 'aws', user, password, sshKeyName);
                break;
            case "Azure":
                await clusterCreateSetupWizard.createAzureCluster(credentialName + 'azure', clusterName + 'azure', user, password, sshKey);
                break;
            case "GCP":
                await clusterCreateSetupWizard.createGCPCluster(credentialName + 'gcp', clusterName + 'gcp', user, password, sshKey);
                break;
            default:
                console.log('No such provider!');
        }
    });

    Then(/^I should see my "([^"]*)" cluster's widget$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await expect(clusterCreateSetupWizard.getClusterWidget(clusterName + 'os')).to.eventually.be.true;
                break;
            case "AWS":
                await expect(clusterCreateSetupWizard.getClusterWidget(clusterName + 'aws')).to.eventually.be.true;
                break;
            case "Azure":
                await expect(clusterCreateSetupWizard.getClusterWidget(clusterName + 'azure')).to.eventually.be.true;
                break;
            case "GCP":
                await expect(clusterCreateSetupWizard.getClusterWidget(clusterName + 'gcp')).to.eventually.be.true;
                break;
            default:
                console.log('No such provider!');
        }
    });

    Then(/^I should see Create Cluster Wizard$/, async () => {
        await expect(clusterCreateSetupWizard.isCreateClusterWizardOpened()).to.eventually.be.true;
    });
});