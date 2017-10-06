import {$, browser, by, element, protractor} from 'protractor'
import { BasePageObject } from "./basePage";

export class CredentialsPageObject extends BasePageObject {
    public credentialCreateButton: any = $("button[id='btnCreateCredential']");

    deleteCredential(name: string) {
        const EC = browser.ExpectedConditions;

        const checkbox = $("div[data-credential-name=\'" + name + "\'] md-checkbox");
        const deleteButton = element(by.cssContainingText('button', 'Delete'));

        return checkbox.click().then(() => {
            return deleteButton.click().then( () => {
                const confirmationYes = element(by.cssContainingText('app-confirmation-dialog button[ng-reflect-dialog-result="yes"]', 'Yes'));

                return browser.wait(EC.visibilityOf(confirmationYes), 5000, 'Delete Confirmation is NOT visible').then(() => {
                    return confirmationYes.click();
                });
            });
        });
    }

    isCredentialDeleted(name: string) {
        const EC = browser.ExpectedConditions;
        const credential = $("div[data-credential-name=\'" + name + "\']");

        return browser.wait(EC.stalenessOf(credential), 10000, 'Deleted credential is STILL visible').then(() => {
            //console.log('Credential has been deleted');
            return true;
        }, error => {
            //console.log('Credential has NOT been deleted');
            return false;
        });
    }
}