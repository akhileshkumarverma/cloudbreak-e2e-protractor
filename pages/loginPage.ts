import { browser, $, by, element, protractor } from 'protractor'
import { BasePageObject } from "./basePage";

export class LoginPageObject extends BasePageObject {
    public usernameBox: any = $("input[id='username']");
    public passwordBox: any = $("input[id='password']");
    public loginButton: any = element(by.cssContainingText('.btn.btn-primary','Login'));

    async login() {
        let dashboardURL;
        const EC = browser.ExpectedConditions;

        await this.usernameBox.sendKeys(process.env.USERNAME);
        await this.passwordBox.sendKeys(process.env.PASSWORD);

        await this.loginButton.click().then(() => {
            $("input[id='settingsOpted']").click().then(() => {
                browser.waitForAngular();
                let yesButton = $("form[id='confirm-yes'] a");

                return browser.wait(EC.visibilityOf(yesButton), 20000, 'I Agree button is NOT visible').then(() => {
                    return yesButton.click().then(() => {
                        return browser.getCurrentUrl().then((url) => {
                            return dashboardURL == url;
                        });
                    });
                });
            }, error => {
                return browser.getCurrentUrl().then((url) => {
                    //console.log(url);
                    return dashboardURL == url;
                });
            })
        });
    }
}
