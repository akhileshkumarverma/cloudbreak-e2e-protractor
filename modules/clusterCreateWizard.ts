import { $, by, element } from 'protractor'
import { BasePageObject } from "../pages/basePage";

export class ClusterCreateWizardPageObject extends BasePageObject {
    public clusterSetupBar: any = $("div[class='setup-wizard-container']");

}