import { defineSupportCode } from 'cucumber'
import {ClusterCreateWizardPageObject} from "../../modules/clusterCreateWizard";

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ Given }) {
    let clusterCreateWizard: ClusterCreateWizardPageObject = new ClusterCreateWizardPageObject();

    Given(/^I am on the Create Cluster Wizard$/, async () => {
        await expect(clusterCreateWizard.generalConfiguarationSideItem).to.be.displayed;
    });
});