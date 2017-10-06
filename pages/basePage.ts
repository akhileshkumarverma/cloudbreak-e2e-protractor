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

    openPage(name: string) {
        return $("a[href=\'/" + name.toLocaleLowerCase() + "\']").click();
    }

    closeDefaultCredentialWarning() {
        const EC = browser.ExpectedConditions;
        const confirmationOk = element(by.cssContainingText('button[aria-label="Close dialog"]', 'Ok'));

        return browser.wait(EC.visibilityOf(confirmationOk), 5000, 'Default Credential Confirmation is NOT visible').then(() => {
            return confirmationOk.click();
        }, error => {
            return false;
        });
    }

    logOut() {
        const EC = browser.ExpectedConditions;

        return this.logoutToggle.click().then(() => {
            const confirmationYes = element(by.cssContainingText('button.btn.btn-primary.pull-right.text-uppercase', 'Yes'));

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