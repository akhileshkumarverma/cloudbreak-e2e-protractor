import { $, by, element } from 'protractor';

export class DashboardPageObject {
    public cloudbreakBody: any;
    public cloudbreakMenu: any;
    public notificationsToggle: any;
    public logoutToggle: any;

    constructor() {
        this.cloudbreakBody = $("body[id='cloudbreak-ui']");
        this.cloudbreakMenu = $("app-menu[ng-reflect-menu-status='open']");
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