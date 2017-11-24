import { browser, $, by, element } from 'protractor'
import { ClustersPageObject } from "../clustersPage";

export class ClusterDetailsPageObject extends ClustersPageObject {
    public terminateButton: any = element(by.cssContainingText('app-cluster-details button', 'TERMINATE'));

    terminateCluster() {
        const EC = browser.ExpectedConditions;
        const terminate = this.terminateButton;

        return terminate.click().then(() => {
            const confirmationYesButton = element(by.cssContainingText('app-confirmation-dialog button', 'Yes'));
            const forceTermination = $("app-confirmation-dialog md-checkbox");
            const forceTerminationLabel = forceTermination.$("label");

            return browser.wait(EC.elementToBeClickable(confirmationYesButton), 5000, 'Confirmation dialog is NOT visible').then(() => {
                return forceTerminationLabel.click().then(() => {
                    return forceTermination.getAttribute('class').then((classAttribute) => {
                        if (classAttribute.includes('mat-checkbox-checked')) {
                            console.log('Force terminating the cluster');
                            return confirmationYesButton.click();
                        } else {
                            console.log('Terminating the cluster');
                            return confirmationYesButton.click();
                        }
                    })
                });
            });
        });
    }
}