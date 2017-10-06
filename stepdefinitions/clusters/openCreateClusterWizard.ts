import { ClustersPageObject } from "../../pages/clustersPage";
import { ClusterCreateWizardPageObject } from "../../modules/clusterCreateWizard";
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let clusters: ClustersPageObject = new ClustersPageObject();

    When(/^I click on the Create Cluster button$/, async () => {
        await clusters.clusterCreateButton.click();
    });

    Then(/^I should see Create Cluster Wizard$/, async () => {
        let clusterCreateWizard: ClusterCreateWizardPageObject = new ClusterCreateWizardPageObject();

        await expect(clusterCreateWizard.generalConfiguarationSideItem).to.be.displayed;
    });

});