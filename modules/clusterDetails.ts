import { browser, $, by, element, protractor } from 'protractor'
import { ClustersPageObject } from "../pages/clustersPage";

export class ClusterDetailsPageObject extends ClustersPageObject {
    public terminateButton: any = element(by.cssContainingText('app-cluster-details button', 'TERMINATE'));

    terminateCluster() {
        const EC = browser.ExpectedConditions;
        const terminate = this.terminateButton;

        return terminate.click().then(() => {
            const confirmationYesButton = $("app-confirmation-dialog button[ng-reflect-dialog-result='yes']");

            return browser.wait(EC.elementToBeClickable(confirmationYesButton), 5000, 'Confirmation dialog is NOT visible').then(() => {
                return confirmationYesButton.click().then(() => {
                    return browser.wait(EC.stalenessOf(terminate), 10000, 'Deleted cluster is STILL visible').then(() => {
                        //console.log('Cluster has been deleted');
                        return false;
                    }, error => {
                        //console.log('Cluster has NOT been deleted');
                        return true;
                    });
                });
            });
        });
    }
}