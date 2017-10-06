import { ClusterCreateWizardPageObject } from "../../modules/clusterCreateWizard";
import { defineSupportCode } from 'cucumber'
import { browser } from "protractor";

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let clusterCreateSetupWizard: ClusterCreateWizardPageObject = new ClusterCreateWizardPageObject();
    let provider = process.env.PROVIDER;

    const clusterName = process.env.CLUSTER_NAME + browser.params.nameTag;

    When(/^I submit my provider related configurations$/, async () => {
        if(provider.toLocaleLowerCase() == 'openstack') {
            const credentialName = process.env.CREDENTIAL_NAME + browser.params.nameTag;
            const instanceType = process.env.INSTANCE_TYPE;
            const network = process.env.OS_NETWORK;
            const subnet = process.env.OS_SUBNET;
            const user = process.env.AMBARI_USER;
            const password = process.env.AMBARI_PASSWORD;
            const sshKey = process.env.SSH_KEY;
            const securityGroup = process.env.OS_SECURITYGROUP;

            await clusterCreateSetupWizard.createOpenStackCluster(credentialName, clusterName, instanceType, network, subnet, user, password, sshKey, securityGroup);
        } else {
            const credentialName = process.env.CREDENTIAL_NAME + browser.params.nameTag;
            const instanceType = 'm4.large';
            const user = process.env.AMBARI_USER;
            const password = process.env.AMBARI_PASSWORD;
            const sshKey = process.env.SSH_KEY;

            await clusterCreateSetupWizard.createAWSCluster(credentialName, clusterName, instanceType, user, password, sshKey);
        }
    });

    Then(/^I should see my new cluster's widget$/, async () => {
       await expect(clusterCreateSetupWizard.getClusterWidget(clusterName)).to.eventually.be.true;
    })

});