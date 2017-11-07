import { browser, $, by, element, protractor } from 'protractor'
import { BasePageObject } from "./basePage";

export class LoginPageObject extends BasePageObject {
    public usernameBox: any = $("input[id='username']");
    public passwordBox: any = $("input[id='password']");
    public loginButton: any = element(by.cssContainingText('.btn.btn-primary','Login'));

    login() {
        const EC = browser.ExpectedConditions;

        this.usernameBox.sendKeys(process.env.USERNAME);
        this.passwordBox.sendKeys(process.env.PASSWORD);

        this.loginButton.click().then(() => {
            $("input[id='settingsOpted']").click().then(() => {
                browser.waitForAngular();
                let yesButton = $("form[id='confirm-yes'] a");

                return browser.wait(EC.visibilityOf(yesButton), 20000, 'I Agree button is NOT visible').then(() => {
                    return yesButton.click().then(() => {
                        return browser.getCurrentUrl().then((url) => {
                            return url.includes('/clusters');
                        });
                    });
                });
            }, error => {
                return browser.getCurrentUrl().then((url) => {
                    //console.log(url);
                    return url.includes('/clusters');
                });
            })
        });

        return browser.getCurrentUrl().then((url) => {
            //console.log('Actual URL: ' + url);
            return url.includes('/clusters');
        }, error => {
            //console.log('Error get current URL');
            return false;
        });
    }
}
