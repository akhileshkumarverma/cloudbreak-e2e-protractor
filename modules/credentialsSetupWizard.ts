import { $, by, element } from 'protractor';

export class CredentialSetupWizardPageObject {
    public credentialCreateButton: any;

    constructor() {
        this.credentialCreateButton = $("button[id='btnCreateCredential']");
    }
}