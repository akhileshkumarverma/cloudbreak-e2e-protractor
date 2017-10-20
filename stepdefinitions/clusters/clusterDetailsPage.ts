import { defineSupportCode } from 'cucumber'
import { ClusterDetailsPageObject } from "../../modules/clusterDetails";
import { browser } from "protractor";

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ Given }) {
    let clusterDetails: ClusterDetailsPageObject = new ClusterDetailsPageObject();

    const clusterName = process.env.CLUSTER_NAME + browser.params.nameTag;

    Given(/^I am on the Cluster Details/, async () => {
        await expect(clusterDetails.terminateButton).to.be.displayed;
    });

    Given(/^I am opened "([^"]*)" Cluster Details/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await clusterDetails.openClusterDetails(clusterName + 'os');
                break;
            case "AWS":
                await clusterDetails.openClusterDetails(clusterName + 'aws');
                break;
            case "Azure":
                await clusterDetails.openClusterDetails(clusterName + 'azure');
                break;
            case "GCP":
                await clusterDetails.openClusterDetails(clusterName + 'gcp');
                break;
            default:
                console.log('No such provider!');
        }
    });
});