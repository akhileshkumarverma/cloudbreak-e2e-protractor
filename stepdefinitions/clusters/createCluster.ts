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
    const network = process.env.OS_NETWORK;
    const subnet = process.env.OS_SUBNET;

    When(/^I select my previously created "([^"]*)" credential$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await expect(clusterCreateSetupWizard.selectCredential(credentialName + 'os')).to.eventually.be.true;
                break;
            case "AWS":
                await expect(clusterCreateSetupWizard.selectCredential(credentialName + 'aws')).to.eventually.be.true;
                break;
            case "Azure":
                await expect(clusterCreateSetupWizard.selectCredential(credentialName + 'azure')).to.eventually.be.true;
                break;
            case "GCP":
                await expect(clusterCreateSetupWizard.selectCredential(credentialName + 'gcp')).to.eventually.be.true;
                break;
            default:
                console.log('No such provider!');
        }
    });

    When(/^I create my new Cluster for "([^"]*)"$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await expect(clusterCreateSetupWizard.createOpenStackCluster(credentialName + 'os',clusterName + 'os', network, subnet, user, password, sshKeyName)).to.eventually.be.true;
                break;
            case "AWS":
                await expect(clusterCreateSetupWizard.createAWSCluster(credentialName + 'aws', clusterName + 'aws', user, password, sshKeyName)).to.eventually.be.true;
                break;
            case "Azure":
                await expect(clusterCreateSetupWizard.createAzureCluster(credentialName + 'azure', clusterName + 'azure', user, password, sshKey)).to.eventually.be.true;
                break;
            case "GCP":
                await expect(clusterCreateSetupWizard.createGCPCluster(credentialName + 'gcp', clusterName + 'gcp', user, password, sshKey)).to.eventually.be.true;
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