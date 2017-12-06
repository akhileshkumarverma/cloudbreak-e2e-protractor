import {browser, $, by, element, protractor} from 'protractor'
import { ClustersPageObject } from "../clustersPage";

export class ClusterDetailsPageObject extends ClustersPageObject {

    terminateCluster() {
        const EC = protractor.ExpectedConditions;
        const terminateButton = $("app-cluster-details button[class*='btn-terminate']");

        return browser.wait(EC.elementToBeClickable(terminateButton), 5000, 'Terminate button is NOT clickable').then(() => {
            return terminateButton.click().then(() => {
                const confirmationYesButton = element(by.cssContainingText('app-confirmation-dialog button', 'Yes'));
                const forceTermination = $("app-confirmation-dialog mat-checkbox");
                const forceTerminationLabel = forceTermination.$("label");

                console.log('Terminate button has clicked');

                return browser.wait(EC.elementToBeClickable(confirmationYesButton), 5000, 'Confirmation dialog is NOT visible').then(() => {
                    return forceTerminationLabel.click().then(() => {
                        console.log('Force terminate has selected');
                        return forceTermination.getAttribute('class').then((classAttribute) => {
                            if (classAttribute.includes('mat-checkbox-checked')) {
                                console.log('Force terminating the cluster');
                                return confirmationYesButton.click().then(() => {
                                    return true;
                                });
                            } else {
                                console.log('Terminating the cluster');
                                return confirmationYesButton.click().then(() => {
                                    return false;
                                });
                            }
                        })
                    });
                });
            });
        });
    }
}