import { browser, $, by, element } from 'protractor';

export class BasePageObject {
    public notificationsToggle: any;
    public logoutToggle: any;

    constructor() {
        this.notificationsToggle = $("div[class='notification-toggle'] i");
        this.logoutToggle = $("i[id='logoutBtn']");
    }

    openCredentials() {
        return element(by.cssContainingText('a span', 'Credentials')).click();
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
}