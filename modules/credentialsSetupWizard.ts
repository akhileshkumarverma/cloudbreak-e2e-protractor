import { $, by, element } from 'protractor'

export class CredentialSetupWizardPageObject {
    public providerSelector: any;

    constructor() {
        this.providerSelector = $("div[class='selected-option']");
    }

    async selectOpenstack() {
        await $("div[class='other-options'] img[src*='openstack.png']").click();
    }

    getSelectedProvider(provider: string) {
        return $("div[ng-reflect-ng-switch=\'" + provider + "\']");
    }
}