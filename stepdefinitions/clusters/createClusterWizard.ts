import { defineSupportCode } from 'cucumber'
import {ClusterCreateWizardPageObject} from "../../modules/clusterCreateWizard";

defineSupportCode(function ({ Given }) {
    let clusterCreateWizard: ClusterCreateWizardPageObject = new ClusterCreateWizardPageObject();

    Given(/^I am on the Create Cluster Wizard$/, async () => {
        await clusterCreateWizard.onTheCreateClusterWizard();
    });
});