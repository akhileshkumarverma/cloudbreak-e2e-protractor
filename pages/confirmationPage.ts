import { $ } from 'protractor'

export class ConfirmationPageObject {
    public optCheckBox: any;
    public agreeButton: any;

    constructor() {
        this.optCheckBox = $("input[id='settingsOpted']");
        this.agreeButton = $("form[id='confirm-yes'] a");
    }
}