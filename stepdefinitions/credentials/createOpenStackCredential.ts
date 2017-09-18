import { CredentialSetupWizardPageObject } from "../../modules/credentialsSetupWizard"
import { ClusterCreateWizardPageObject } from "../../modules/clusterCreateWizard";
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let credentialSetupWizard: CredentialSetupWizardPageObject = new CredentialSetupWizardPageObject();

    When(/^I submit my OpenStack credentials$/, async () => {
        await credentialSetupWizard.createOpenStackCredential('v2', 'openstack-autotesting', 'autotesting', 'cloudbreak', 'cloudbreak', 'cloudbreak', 'http://openstack.eng.hortonworks.com:5000/v2.0', 'internal');
    });

    Then(/^I should see Cluster Create Wizard$/, async () => {
       let clusterCreateSetupWizard: ClusterCreateWizardPageObject = new ClusterCreateWizardPageObject();

       await expect(clusterCreateSetupWizard.clusterSetupBar).to.be.displayed;
    })

});