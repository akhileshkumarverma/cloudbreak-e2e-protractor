import { $ } from 'protractor';

export class LoginPageObject {
    public usernameBox: any;
    public passwordBox: any;
    public loginButton: any;

    constructor() {
        this.usernameBox = $("input[id='username']");
        this.passwordBox = $("input[id='password']");
        this.loginButton = $("button[class='btn btn-primary']");
    }
}