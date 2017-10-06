import { ClusterCreateWizardPageObject } from "../../modules/clusterCreateWizard";
import { defineSupportCode } from 'cucumber'
import { browser } from "protractor";

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let clusterCreateSetupWizard: ClusterCreateWizardPageObject = new ClusterCreateWizardPageObject();

    const credentialName = process.env.CREDENTIAL_NAME + browser.params.nameTag;
    const clusterName = process.env.CLUSTER_NAME + browser.params.nameTag;
    const instanceType = process.env.INSTANCE_TYPE;
    const network = process.env.OS_NETWORK;
    const subnet = process.env.OS_SUBNET;
    const user = process.env.AMBARI_USER;
    const password = process.env.AMBARI_PASSWORD;
    const sshKey = process.env.SSH_KEY;
    const securityGroup = process.env.OS_SECURITYGROUP;

    When(/^I submit my OpenStack configurations$/, async () => {
        await clusterCreateSetupWizard.createOpenStackCluster(credentialName, clusterName, instanceType, network, subnet, user, password, sshKey, securityGroup);
    });

    Then(/^I should see my new cluster's widget$/, async () => {
       await expect(clusterCreateSetupWizard.getClusterWidget(clusterName)).to.eventually.be.true;
    })

});