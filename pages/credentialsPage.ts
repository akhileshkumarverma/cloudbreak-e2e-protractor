import { $, by, element } from 'protractor';

export class CredentialsPageObject {
    public credentialCreateButton: any;

    constructor() {
        this.credentialCreateButton = $("button[id='btnCreateCredential']");
    }
}