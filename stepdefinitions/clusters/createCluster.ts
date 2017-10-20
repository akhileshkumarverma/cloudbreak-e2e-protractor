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

    When(/^I create my new Cluster for the following "([^"]*)"$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                const instanceTypeOS = process.env.OS_INSTANCE_TYPE;
                const network = process.env.OS_NETWORK;
                const subnet = process.env.OS_SUBNET;
                const securityGroup = process.env.OS_SECURITYGROUP;

                await clusterCreateSetupWizard.createOpenStackCluster(credentialName + 'os',clusterName + 'os', instanceTypeOS, network, subnet, user, password, sshKeyName, securityGroup);
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
        let clusterCreateWizard: ClusterCreateWizardPageObject = new ClusterCreateWizardPageObject();

        await expect(clusterCreateWizard.generalConfiguarationSideItem).to.be.displayed;
    });
});