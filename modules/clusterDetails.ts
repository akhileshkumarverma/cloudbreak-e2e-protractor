import { browser, $, by, element, protractor } from 'protractor'
import { ClustersPageObject } from "../pages/clustersPage";

export class ClusterDetailsPageObject extends ClustersPageObject {
    public terminateButton: any = element(by.cssContainingText('app-cluster-details button', 'TERMINATE'));

    async terminateCluster() {
        const EC = browser.ExpectedConditions;

        await this.terminateButton.click().then(() => {
            const confirmationYesButton = $("app-confirmation-dialog button[ng-reflect-dialog-result='yes']");

            browser.wait(EC.elementToBeClickable(confirmationYesButton), 5000, 'Confirmation dialog is NOT visible').then(() => {
                return confirmationYesButton.click();
            });
        });
    }
}