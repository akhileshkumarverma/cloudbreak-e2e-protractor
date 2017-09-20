import { ClustersPageObject } from '../../pages/clustersPage'
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ Given }) {
    let clusters: ClustersPageObject = new ClustersPageObject();

    Given(/^I am on the Cloudbreak Clusters page$/, async () => {
        await expect(clusters.cloudbreakBody).to.be.displayed;
    });

    Given(/^I am opened the Cloudbreak Clusters page$/, async () => {
        await clusters.openPage('Clusters');
    });
});