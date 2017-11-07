import { browser, $, by, element } from 'protractor';

export class BasePageObject {
    public cloudbreakBody: any;
    public cloudbreakMenu: any;
    public notificationsToggle: any;
    public logoutToggle: any;

    constructor() {
        this.cloudbreakBody = $("body[id='cloudbreak-ui']");
        this.cloudbreakMenu = $("app-menu[ng-reflect-menu-status='open']");
        this.notificationsToggle = $("div[class='notification-toggle'] i");
        this.logoutToggle = $("i[id='logoutBtn']");
    }

    amIOnTheClustersPage() {
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
        const EC = browser.ExpectedConditions;
        const confirmationOk = element(by.cssContainingText('button[aria-label="Close dialog"]', 'ok'));

        return browser.get(process.env.BASE_URL + '/' + name.toLowerCase()).then( () => {
            return browser.wait(EC.visibilityOf(confirmationOk), 5000, 'Default Credential Confirmation is NOT visible').then(() => {
                return confirmationOk.click();
            }, error => {
                console.log('No confirmation dialog is present!');
                return error;
            });
        });
        //$("a[href=\'/" + name.toLocaleLowerCase() + "\']").click();
    }

    closeDefaultCredentialWarning() {
        const EC = browser.ExpectedConditions;
        const confirmationOk = element(by.cssContainingText('button[aria-label="Close dialog"]', 'ok'));

        return browser.wait(EC.visibilityOf(confirmationOk), 5000, 'Default Credential Confirmation is NOT visible').then(() => {
            return confirmationOk.click();
        }, error => {
            return false;
        });
    }

    logOut() {
        const EC = browser.ExpectedConditions;

        return this.logoutToggle.click().then(() => {
            const confirmationYes = element(by.cssContainingText('app-confirmation-dialog', 'Yes'));

            return browser.wait(EC.visibilityOf(confirmationYes), 5000, 'Logout Confirmation is NOT visible').then(() => {
                return confirmationYes.click();
            });
        });
    }

    isLoggedOut() {
        return browser.getCurrentUrl().then((url) => {
            return url.includes('logout=true');
        });
    }
}