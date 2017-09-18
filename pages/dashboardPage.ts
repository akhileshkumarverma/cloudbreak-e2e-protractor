import { $, by, element } from 'protractor'
import { BasePageObject } from "./basePage";

export class DashboardPageObject extends BasePageObject{
    public cloudbreakBody: any = $("body[id='cloudbreak-ui']");
    public cloudbreakMenu: any = $("app-menu[ng-reflect-menu-status='open']");
}