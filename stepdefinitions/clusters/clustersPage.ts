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
                await expect(clusters.getClusterWidget(clusterName + 'os')).to.eventually.be.true;
                break;
            case "AWS":
                await expect(clusters.getClusterWidget(clusterName + 'aws')).to.eventually.be.true;
                break;
            case "Azure":
                await expect(clusters.getClusterWidget(clusterName + 'azure')).to.eventually.be.true;
                break;
            case "GCP":
                await expect(clusters.getClusterWidget(clusterName + 'gcp')).to.eventually.be.true;
                break;
            default:
                console.log('No such provider!');
        }
    });
});