import {$, browser, by, element, protractor} from "protractor";

export class LoginPageObject {
    public usernameBox: any = $('#username');
    public passwordBox: any = $('#password');
    public loginButton: any = element(by.cssContainingText('.btn.btn-primary','Login'));

    login(username: string, password: string) {
        const EC = protractor.ExpectedConditions;

        this.usernameBox.sendKeys(username);
        this.passwordBox.sendKeys(password);

        this.loginButton.click().then(() => {
            $('#settingsOpted').click().then(() => {
                browser.waitForAngular();
                let yesButton = $('#confirm-yes a');

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
