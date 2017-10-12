import { defineSupportCode } from 'cucumber'
import { browser } from "protractor";
import { ClusterDetailsPageObject } from "../../modules/clusterDetails";

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let clusterDetails: ClusterDetailsPageObject = new ClusterDetailsPageObject();

    const clusterName = process.env.CLUSTER_NAME + browser.params.nameTag;

    When(/^I terminate my Cluster on "([^"]*)"$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await clusterDetails.terminateCluster();
                break;
            case "AWS":
                await clusterDetails.terminateCluster();
                break;
            case "Azure":
                await clusterDetails.terminateCluster();
                break;
            default:
                console.log('No such provider!');
        }
    });

    Then(/^I should NOT see my "([^"]*)" cluster on the Cloudbreak Dashboard$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await expect(clusterDetails.waitForClusterTermination(clusterName + 'os')).to.eventually.be.true;
                break;
            case "AWS":
                await expect(clusterDetails.waitForClusterTermination(clusterName + 'aws')).to.eventually.be.true;
                break;
            case "Azure":
                await expect(clusterDetails.waitForClusterTermination(clusterName + 'azure')).to.eventually.be.true;
                break;
            default:
                console.log('No such provider!');
        }
    })
});