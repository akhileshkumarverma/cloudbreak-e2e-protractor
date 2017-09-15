import { $, by, element } from 'protractor'

export class DashboardPageObject {
    public cloudbreakBody: any;
    public cloudbreakMenu: any;

    constructor() {
        this.cloudbreakBody = $("body[id='cloudbreak-ui']");
        this.cloudbreakMenu = $("app-menu[ng-reflect-menu-status='open']");
    }

    openCredentials() {
        return element(by.cssContainingText('a span', 'Credentials')).click();
    }
}