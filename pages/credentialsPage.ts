import {$, $$, browser, by, element, protractor} from 'protractor'
import { BasePageObject } from "./basePage";

export class CredentialsPageObject extends BasePageObject {
    public credentialCreateButton: any = $("button[id='btnCreateCredential']");

    amIOnTheCredentialsPage() {
        browser.getCurrentUrl().then((url) => {
            return url.includes('/credentials');
        }, error => {
            return false;
        }).then((result) => {
            if (!result) {
                this.openPage('Credentials').then(() => {
                    return this.credentialCreateButton.click().then(() => {
                        return browser.wait(() => {
                            return browser.getCurrentUrl().then((url) => {
                                return url.includes('/credentials');
                            });
                        }, 5000, 'Cannot open Credentials');
                    });
                });
            }
        });

        return browser.getCurrentUrl().then((url) => {
            //console.log('Actual URL: ' + url);
            return url.includes('/credentials');
        }, error => {
            console.log('Error get current URL');
            return false;
        });
    }

    openCredentialSetupWizard() {
        const EC = protractor.ExpectedConditions;

        this.closeConfirmationDialog();

        return this.credentialCreateButton.click().then(() => {
            return browser.wait(EC.urlContains('/getstarted'), 5000, 'Credential Setup Wizard has NOT been opened!').then(() => {
                return browser.getCurrentUrl().then((url) => {
                    //console.log('Actual URL: ' + url);
                    return url.includes('/getstarted');
                }, error => {
                    console.log('Error get current URL');
                    return false;
                });
            });
        });
    }

    deleteAllCredentials() {
        const EC = protractor.ExpectedConditions;

        const noCredentialInformation = element(by.cssContainingText('app-credential-list div', 'There are no credentials to display.'));
        const checkboxes = $$("app-credential-list mat-checkbox");
        const deleteButton = element(by.cssContainingText('app-credential-list button', 'Delete'));

        noCredentialInformation.isDisplayed().then((displayed) => {
           return displayed;
        }, error => {
           return false;
        }).then((result) => {
            if (!result) {
                checkboxes.map((checkbox, index) => {
                    return checkbox.click().then(() => {
                        console.log(index + ' credential is selected to delete!');
                        return true;
                    });
                });

                return deleteButton.click().then(() => {
                    const confirmationYes = element(by.cssContainingText('app-delete-credentials-dialog button', 'Yes'));

                    return browser.wait(EC.visibilityOf(confirmationYes), 5000, 'Delete Confirmation is NOT visible').then(() => {
                        return confirmationYes.click();
                    }, error => {
                        return error;
                    });
                }).then(() => {
                    return this.closeConfirmationDialog();
                });
            }
        });

        return browser.wait(() => {
            return noCredentialInformation.isDisplayed().then((displayed) => {
                return displayed;
            }, error => {
                return false;
            });
        }, 5000, 'Previously saved credentials has NOT been deleted!');
    }

    deleteCredential(name: string) {
        const EC = protractor.ExpectedConditions;

        const checkbox = $("div[data-credential-name=\'" + name + "\'] mat-checkbox");
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
        const EC = protractor.ExpectedConditions;
        const credential = $("div[data-credential-name=\'" + name + "\']");

        return browser.wait(EC.invisibilityOf(credential), 5000, 'Deleted credential is STILL visible').then(() => {
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