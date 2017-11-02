import {$, browser, by, element, protractor} from 'protractor'
import { BasePageObject } from "./basePage";

export class CredentialsPageObject extends BasePageObject {
    public credentialCreateButton: any = $("button[id='btnCreateCredential']");

    deleteCredential(name: string) {
        const EC = browser.ExpectedConditions;

        const checkbox = $("div[data-credential-name=\'" + name + "\'] md-checkbox");
        const deleteButton = element(by.cssContainingText('app-credential-list button', 'Delete'));

        return checkbox.click().then(() => {
            deleteButton.click().then( () => {
                const confirmationYes = element(by.cssContainingText('app-delete-credentials-dialog button', 'Yes'));

                return browser.wait(EC.visibilityOf(confirmationYes), 5000, 'Delete Confirmation is NOT visible').then(() => {
                    return confirmationYes.click();
                });
            });

            return browser.wait(EC.invisibilityOf(checkbox), 10000, name + ' credential has NOT been deleted!').then(() => {
                return checkbox.isDisplayed().then((displayed) => {
                   return !displayed;
                }, error => {
                    return true;
                });
            });
        }, error => {
            console.log(name + ' credential is not present!');
            return true;
        });
    }

    isCredentialDeleted(name: string) {
        const EC = browser.ExpectedConditions;
        const credential = $("div[data-credential-name=\'" + name + "\']");

        return browser.wait(EC.invisibilityOf(credential), 20000, 'Deleted credential is STILL visible').then(() => {
            //console.log('Credential has been deleted');
            return credential.isDisplayed().then((displayed) => {
                return !displayed;
            }, err => {
                return true;
            });
        }, error => {
            //console.log('Credential has NOT been deleted');
            return false;
        });
    }
}