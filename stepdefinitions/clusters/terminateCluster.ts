import { defineSupportCode } from 'cucumber'
import { browser } from "protractor";
import { ClusterDetailsPageObject } from "../../modules/clusterDetails";

let chai = require('chai').use(require('chai-as-promised'));
let expect = chai.expect;

const originalAllScriptsTimeout = browser.allScriptsTimeout;

defineSupportCode(function ({ setDefaultTimeout, After, Before, When, Then }) {
    let clusterDetails: ClusterDetailsPageObject = new ClusterDetailsPageObject();

    const clusterName = process.env.CLUSTER_NAME + browser.params.nameTag;

    Before(() => {
        browser.allScriptsTimeout = 60 * 60000;
        setDefaultTimeout(60 * 60000);
    });

    After(() => {
        browser.allScriptsTimeout = originalAllScriptsTimeout;
        setDefaultTimeout(60 * 1000);
    });

    When(/^I terminate my Cluster on "([^"]*)"$/, {timeout: 60 * 60000}, async (provider) => {
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
            case "GCP":
                await clusterDetails.terminateCluster();
                break;
            default:
                await console.log('No such provider!');
        }
    });

    Then(/^I should NOT see my "([^"]*)" cluster on the Cloudbreak Dashboard$/, {timeout: 60 * 60000}, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await expect(clusterDetails.waitForClusterTermination(clusterName + 'os')).to.eventually.equal(true);
                break;
            case "AWS":
                await expect(clusterDetails.waitForClusterTermination(clusterName + 'aws')).to.eventually.equal(true);
                break;
            case "Azure":
                await expect(clusterDetails.waitForClusterTermination(clusterName + 'azure')).to.eventually.equal(true);
                break;
            case "GCP":
                await expect(clusterDetails.waitForClusterTermination(clusterName + 'gcp')).to.eventually.equal(true);
                break;
            default:
                await console.log('No such provider!');
        }
    });
});