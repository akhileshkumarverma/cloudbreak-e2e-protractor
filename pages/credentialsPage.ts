import {$, by, element, protractor} from 'protractor'
import { BasePageObject } from "./basePage";

export class CredentialsPageObject extends BasePageObject {
    public credentialCreateButton: any = $("button[id='btnCreateCredential']");

    deleteCredential(name: string) {
        const EC = protractor.ExpectedConditions;

        const checkbox = $("div[name=\'" + name + "\'] md-checkbox");
        const deleteButton = element(by.cssContainingText('button', 'Delete'));

        return checkbox.click().then(() => {
            const confirmationYes = element(by.cssContainingText('button', 'Yes'));

            return deleteButton.click().then( () => {
                return protractor.browser.wait(EC.visibilityOf(confirmationYes), 5000, 'Delete Confirmation is NOT visible').then(() => {
                    return confirmationYes.click();
                });
            });
        });
    }

    isCredentialExist(name: string) {
        return element(by.cssContainingText('div.list-item div', name));
    }
}