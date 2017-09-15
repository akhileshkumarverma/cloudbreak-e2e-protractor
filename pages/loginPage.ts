import { $, by, element, protractor } from 'protractor'

export class LoginPageObject {
    public usernameBox: any;
    public passwordBox: any;
    public loginButton: any;

    constructor() {
        this.usernameBox = $("input[id='username']");
        this.passwordBox = $("input[id='password']");
        this.loginButton = element(by.cssContainingText('.btn.btn-primary','Login'));
    }

    async login() {
        let dashboardURL;
        const EC = protractor.ExpectedConditions;

        await this.usernameBox.sendKeys(process.env.USERNAME);
        await this.passwordBox.sendKeys(process.env.PASSWORD);

        await this.loginButton.click().then(() => {
            $("input[id='settingsOpted']").click().then(() => {
                protractor.browser.waitForAngular();
                let yesButton = $("form[id='confirm-yes'] a");

                return protractor.browser.wait(EC.visibilityOf(yesButton), 20000, 'I Agree button is NOT visible').then(() => {
                    return yesButton.click().then(() => {
                        return protractor.browser.getCurrentUrl().then((url) => {
                            console.log(url);
                            return dashboardURL == url;
                        });
                    });
                });
            }, error => {
                return protractor.browser.getCurrentUrl().then((url) => {
                    console.log(url);
                    return dashboardURL == url;
                });
            })
        });
    }
}
