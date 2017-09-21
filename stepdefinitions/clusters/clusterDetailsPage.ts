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

    Given(/^I am opened Cluster Details/, async () => {
        await clusterDetails.openClusterDetails(clusterName);
    });
});