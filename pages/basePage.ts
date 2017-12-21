import {browser, $, by, element, protractor} from "protractor";

export class BasePageObject {

    amIOnTheClustersPage() {
        this.closeConfirmationDialog();

        browser.getCurrentUrl().then((url) => {
            return url.includes('/clusters');
        }, error => {
            return false;
        }).then((result) => {
            if (!result) {
                this.openPage('Clusters').then(() => {
                    return browser.wait(() => {
                        return browser.getCurrentUrl().then((url) => {
                            return url.includes('/clusters');
                        });
                    }, 5000, 'Cannot open Create Cluster Wizard');
                });
            }
        });

        return browser.getCurrentUrl().then((url) => {
            //console.log('Actual URL: ' + url);
            return url.includes('/clusters');
        }, error => {
            console.log('Error get current URL');
            return false;
        });
    }

    openPage(name: string) {
        const EC = protractor.ExpectedConditions;
        const confirmationOk = element(by.cssContainingText('button[aria-label="Close dialog"]', 'ok'));

        browser.get(process.env.BASE_URL + '/' + name.toLowerCase()).then( () => {
            return browser.wait(EC.visibilityOf(confirmationOk), 5000, 'Default Credential Confirmation is NOT visible').then(() => {
                return confirmationOk.click();
            }, error => {
                //console.log('No confirmation dialog is present!');
                return error;
            });
        });

        this.closeConfirmationDialog();

        return browser.getCurrentUrl().then((url) => {
            return url.includes(name.toLowerCase());
        }, error => {
            console.log('Error get current URL');
            return false;
        });
    }

    isConfirmationDialogVisible() {
        const EC = protractor.ExpectedConditions;
        const confirmationDialog = $("app-confirmation-dialog");

        return browser.wait(EC.visibilityOf(confirmationDialog), 5000, 'Confirmation dialog is NOT visible').then(() => {
            return confirmationDialog.isDisplayed().then((displayed) => {
               return displayed;
            });
        }, error => {
            return false;
        });
    }

    closeConfirmationDialog() {
        const EC = protractor.ExpectedConditions;
        const confirmationOk = element(by.cssContainingText('button[aria-label="Close dialog"]', 'ok'));

        browser.wait(EC.elementToBeClickable(confirmationOk), 10000, 'Confirmation dialog is NOT visible').then(() => {
            return confirmationOk.click();
        }, error => {
            return error;
        }).then(() => {
            return browser.wait(EC.invisibilityOf(confirmationOk), 5000, 'Confirmation dialog is NOT visible').then(() => {
                return confirmationOk.isDisplayed().then((displayed) => {
                    return !displayed;
                }, error => {
                    return true;
                });
            }, error => {
                return false;
            });
        });

        return confirmationOk.isDisplayed().then((displayed) => {
            return !displayed;
        }, error => {
            return true;
        });
    }

    logOut() {
        const EC = protractor.ExpectedConditions;
        const logoutToggle = $('#logoutBtn');

        logoutToggle.click().then(() => {
            const confirmationYes = element(by.cssContainingText('app-confirmation-dialog button', 'Yes'));

            return browser.wait(EC.elementToBeClickable(confirmationYes), 5000, 'Logout Confirmation is NOT visible').then(() => {
                return confirmationYes.click();
            });
        });

        return browser.wait(EC.invisibilityOf(logoutToggle), 5000, 'Logout Confirmation is visible').then(() => {
            return logoutToggle.isDisplayed().then((displayed) => {
                return !displayed;
            }, error => {
                return true;
            });
        });

    }

    isLoggedOut() {
        return browser.wait(() => {
            return browser.getCurrentUrl().then((url) => {
                return url.includes('logout=true');
            });
        }, 5000, 'User has NOT been logged out!');
    }
}