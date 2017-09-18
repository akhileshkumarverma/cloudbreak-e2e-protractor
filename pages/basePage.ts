import { $, by, element } from 'protractor';

export class BasePageObject {
    public notificationsToggle: any;
    public logoutToggle: any;

    constructor() {
        this.notificationsToggle = $("div[class='notification-toggle'] i");
        this.logoutToggle = $("div i[class='fa fa-sign-out']");
    }

    openCredentials() {
        return element(by.cssContainingText('a span', 'Credentials')).click();
    }

    async logOut() {
        await this.logoutToggle.click();
        await element(by.cssContainingText('button.btn.btn-primary.pull-right.text-uppercase', 'Yes')).click();
    }
}