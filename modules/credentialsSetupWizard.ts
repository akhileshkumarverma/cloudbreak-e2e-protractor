import { browser, $, by, element, protractor } from 'protractor'
import { CredentialsPageObject } from "../pages/credentialsPage";
import {async} from "q";

export class CredentialSetupWizardPageObject extends CredentialsPageObject {
    public providerSelector: any = element(by.cssContainingText('span', 'Please select your cloud provider'));

    async selectOpenstack() {
        const EC = browser.ExpectedConditions;

        await this.providerSelector.click().then(() => {
            const openstackButton = $("div[class='option'] img[src*='openstack.png']");

            browser.wait(EC.visibilityOf(openstackButton), 5000, 'OpenStack option is NOT visible').then(() => {
                return openstackButton.click();
            });

        });
    }

    getSelectedProvider(provider: string) {
        return $("div[ng-reflect-ng-switch=\'" + provider + "\']");
    }

    createOpenStackCredential(keystoneVersion: string, name: string, description: string, user: string, password: string, tenantName: string, endpoint: string, apiFacing: string) {
        const EC = browser.ExpectedConditions;

        const keystoneSelector = $("md-select[placeholder='Please choose a type']");
        const nameField = $("input[id='name']");
        const descriptionField = $("input[id='description']");
        const userField = $("input[id='user']");
        const passwordField = $("input[id='password']");
        const tenantField = $("input[id='tenantName']");
        const endpointField = $("input[id='endpoint']");
        const apiSelector = $("md-select[formcontrolname='apiFacing']");
        const createButton = element(by.cssContainingText('button', ' Create'));

        return this.providerSelector.click().then(() => {
            const openstackButton = $("div[class='option'] img[src*='openstack.png']");

            browser.wait(EC.visibilityOf(openstackButton), 5000, 'OpenStack option is NOT visible').then(() => {
                return openstackButton.click();
            });

            keystoneSelector.click().then(() => {
                return $("md-option[value=\'" + keystoneVersion + "\']").click();
            });

            nameField.sendKeys(name);
            descriptionField.sendKeys(description);
            userField.sendKeys(user);
            passwordField.sendKeys(password);
            tenantField.sendKeys(tenantName);
            endpointField.sendKeys(endpoint);
            apiSelector.click().then( () => {
                return $("md-option[ng-reflect-value=\'" + apiFacing + "\']").click();
            });

            return createButton.click().then(() => {
                return $("div[ng-reflect-router-link='/clusters/create']").isPresent().then((present) => {
                    return present;
                }, error => {
                    return false;
                });
            });
        });
    }
}