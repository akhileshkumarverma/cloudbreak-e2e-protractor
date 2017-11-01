import { ClustersPageObject } from '../../pages/clustersPage'
import { defineSupportCode } from 'cucumber'
import { browser } from "protractor";

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ Given }) {
    let clusters: ClustersPageObject = new ClustersPageObject();

    const clusterName = process.env.CLUSTER_NAME + browser.params.nameTag;

    Given(/^I am on the Cloudbreak Clusters page$/, async () => {
        await expect(clusters.cloudbreakBody).to.be.displayed;
    });

    Given(/^I am opened the Cloudbreak Clusters page$/, async () => {
        await clusters.openPage('Clusters');
    });

    Given(/^I see my previously created "([^"]*)" cluster on the Clusters page$/, async (provider) => {
        switch (provider) {
            case "OpenStack":
                await clusters.getClusterWidget(clusterName + 'os');
                break;
            case "AWS":
                await clusters.getClusterWidget(clusterName + 'aws');
                break;
            case "Azure":
                await clusters.getClusterWidget(clusterName + 'azure');
                break;
            case "GCP":
                await clusters.getClusterWidget(clusterName + 'gcp');
                break;
            default:
                console.log('No such provider!');
        }
    });
});