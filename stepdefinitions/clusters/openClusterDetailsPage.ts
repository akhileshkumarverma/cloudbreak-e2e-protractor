import { defineSupportCode } from 'cucumber'
import { ClusterDetailsPageObject } from "../../modules/clusterDetails";
import { browser } from "protractor";

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When }) {
    let clusterDetails: ClusterDetailsPageObject = new ClusterDetailsPageObject();

    const clusterName = process.env.CLUSTER_NAME + browser.params.nameTag;

    When(/^I open "([^"]*)" Cluster Details$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await expect(clusterDetails.openClusterDetails(clusterName + 'os')).to.eventually.be.true;
                break;
            case "AWS":
                await expect(clusterDetails.openClusterDetails(clusterName + 'aws')).to.eventually.be.true;
                break;
            case "Azure":
                await expect(clusterDetails.openClusterDetails(clusterName + 'azure')).to.eventually.be.true;
                break;
            case "GCP":
                await expect(clusterDetails.openClusterDetails(clusterName + 'gcp')).to.eventually.be.true;
                break;
            default:
                console.log('No such provider!');
        }
    });
});