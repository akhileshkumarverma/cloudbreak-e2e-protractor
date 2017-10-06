import { defineSupportCode } from 'cucumber'
import { browser } from "protractor";
import { ClusterDetailsPageObject } from "../../modules/clusterDetails";

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let clusterDetails: ClusterDetailsPageObject = new ClusterDetailsPageObject();

    const clusterName = process.env.CLUSTER_NAME + browser.params.nameTag;

    When(/^I terminate my previously created provider related cluster$/, async () => {
        await clusterDetails.terminateCluster();
    });

    Then(/^I should NOT see my previously created cluster on the Cloudbreak Dashboard$/, async () => {
        await expect(clusterDetails.waitForClusterTermination(clusterName)).to.eventually.be.true;
    })

});