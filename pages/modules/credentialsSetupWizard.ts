import {browser, $, by, element, protractor} from 'protractor'
import { CredentialsPageObject } from "../credentialsPage";

const path = require('path');
const fs = require('fs');

export class CredentialSetupWizardPageObject extends CredentialsPageObject {
    public providerSelector: any = $("form div[class='provider-block'] div[class='selected-option']");

    amIOnTheCreateCredentialWizard() {
        browser.getCurrentUrl().then((url) => {
            return url.includes('/getstarted');
        }, error => {
            return false;
        }).then((result) => {
            if (!result) {
                this.openPage('Credentials').then(() => {
                    return this.credentialCreateButton.click().then(() => {
                        return browser.wait(() => {
                            return browser.getCurrentUrl().then((url) => {
                                return url.includes('/getstarted');
                            });
                        }, 5000, 'Cannot open Create Credential Wizard');
                    });
                });
            }
        });

        return browser.getCurrentUrl().then((url) => {
            //console.log('Actual URL: ' + url);
            return url.includes('/getstarted');
        }, error => {
            console.log('Error get current URL');
            return false;
        });
    }

    getSelectedProvider(provider: string) {
        return $("div[ng-reflect-ng-switch=\'" + provider + "\']");
    }

    closeDocumentationSlide() {
        const EC = protractor.ExpectedConditions;
        const closeIcon = $("i[class='fa fa-remove pull-right']");

        return browser.wait(EC.elementToBeClickable(closeIcon), 5000, 'Close icon is NOT clickable').then(() => {
            return closeIcon.click();
        }, error => {
            return console.log('User has already created credential. So Documentation slide is not visible.');
        });
    }

    createOpenStackCredential(keystoneVersion: string, name: string, user: string, password: string, tenantName: string, endpoint: string, apiFacing: string) {
        const providerSelect = this.providerSelector;
        const EC = protractor.ExpectedConditions;

        const keystoneSelector = $("md-select[placeholder='Please choose a type']");
        const nameField = $("input[id='name']");
        const userField = $("input[id='user']");
        const passwordField = $("input[id='password']");
        const tenantField = $("input[id='tenantName']");
        const endpointField = $("input[id='endpoint']");
        const apiSelector = $("md-select[formcontrolname='apiFacing']");
        const createButton = element(by.cssContainingText('button', ' Create'));

        return browser.wait(EC.visibilityOf(providerSelect), 5000, 'Provider select is NOT visible').then(() => {
            return providerSelect.click().then(() => {
                const openstackButton = $("div[class='option'] img[src*='openstack.png']");

                browser.wait(EC.elementToBeClickable(openstackButton), 5000, 'OpenStack option is NOT visible').then(() => {
                    return openstackButton.click();
                });

                this.closeDocumentationSlide();

                browser.wait(EC.elementToBeClickable(keystoneSelector), 5000, 'Keystone option is NOT visible').then(() => {
                    return keystoneSelector.click().then(() => {
                        return $("md-option[value=\'" + keystoneVersion + "\']").click();
                    });
                });

                nameField.sendKeys(name);
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
        }, error => {
            return console.log('Create Credential page has not opened!');
        });
    }

    createAWSCredential(credentialType: string, name: string, iamRoleARN: string) {
        const providerSelect = this.providerSelector;
        const EC = protractor.ExpectedConditions;

        const typeSelector = $("app-create-amazon-credential md-select");
        const nameField = $("input[id='name']");
        const roleField = $("input[id='roleArn']");
        const createButton = element(by.cssContainingText('button', ' Create'));

        return browser.wait(EC.visibilityOf(providerSelect), 5000, 'Provider select is NOT visible').then(() => {
            return providerSelect.click().then(() => {
                const awsButton = $("div[class='option'] img[src*='aws.png']");

                browser.wait(EC.visibilityOf(awsButton), 5000, 'AWS Credential Type option is NOT visible').then(() => {
                    return awsButton.click();
                });

                this.closeDocumentationSlide();

                browser.wait(EC.elementToBeClickable(typeSelector), 5000, 'Type option is NOT visible').then(() => {
                    return typeSelector.click().then(() => {
                        return $("md-option[ng-reflect-value=\'" + credentialType + "\']").click();
                    });
                });

                nameField.sendKeys(name);
                roleField.sendKeys(iamRoleARN);

                return createButton.click().then(() => {
                    return $("div[ng-reflect-router-link='/clusters/create']").isPresent().then((present) => {
                        return present;
                    }, error => {
                        return false;
                    });
                });
            });
        }, error => {
            return console.log('Create Credential page has not opened!');
        });
    }

    createAzureCredential(credentialType: string, name: string, subscription: string, tenant: string, app: string, password: string) {
        const providerSelect = this.providerSelector;
        const EC = protractor.ExpectedConditions;

        const typeSelector = $("md-select[name='type']");
        const nameField = $("input[id='name']");
        const subscriptionField = $("input[id='subscriptionId']");
        const tenantField = $("input[id='tenantId']");
        const appField = $("input[id='appId']");
        const appPasswordField = $("input[id='password']");
        const createButton = element(by.cssContainingText('button', ' Create'));

        return browser.wait(EC.visibilityOf(providerSelect), 5000, 'Provider select is NOT visible').then(() => {
            return providerSelect.click().then(() => {
                const azureButton = $("div[class='option'] img[src*='msa.png']");

                browser.wait(EC.visibilityOf(azureButton), 5000, 'Azure Credential Type option is NOT visible').then(() => {
                    return azureButton.click();
                });

                this.closeDocumentationSlide();

                browser.wait(EC.elementToBeClickable(typeSelector), 5000, 'Type option is NOT visible').then(() => {
                    return typeSelector.click().then(() => {
                        return $("md-option[ng-reflect-value=\'" + credentialType + "\']").click();
                    });
                });

                this.closeDocumentationSlide();

                nameField.sendKeys(name);
                subscriptionField.sendKeys(subscription);
                tenantField.sendKeys(tenant);
                appField.sendKeys(app);
                appPasswordField.sendKeys(password);

                return createButton.click().then(() => {
                    return $("div[ng-reflect-router-link='/clusters/create']").isPresent().then((present) => {
                        return present;
                    }, error => {
                        return false;
                    });
                });
            });
        }, error => {
            return console.log('Create Credential page has not opened!');
        });
    }

    createGCPCredential(name: string, project: string, email: string, p12Path: string) {
        const providerSelect = this.providerSelector;
        const EC = protractor.ExpectedConditions;

        const nameField = $("input[id='name']");
        const projectIDField = $("input[id='projectId']");
        const serviceAccountEmail = $("input[id='serviceAccountEmail']");
        const uploadButton = element(by.cssContainingText('button', 'Upload file'));
        const createButton = element(by.cssContainingText('button', ' Create'));

        return browser.wait(EC.visibilityOf(providerSelect), 5000, 'Provider select is NOT visible').then(() => {
            return providerSelect.click().then(() => {
                const gcpButton = $("div[class='option'] img[src*='gcp.png']");

                browser.wait(EC.visibilityOf(gcpButton), 5000, 'GCP Credential Type option is NOT visible').then(() => {
                    return gcpButton.click();
                });

                this.closeDocumentationSlide();

                browser.wait(EC.visibilityOf(nameField), 5000, 'Name field is NOT visible').then(() => {
                    return nameField.sendKeys(name);
                });
                projectIDField.sendKeys(project);
                serviceAccountEmail.sendKeys(email);

                browser.executeScript('document.querySelector("input[type=\'file\']").style.display = "inline";').then(async () => {
                    const fileInput = $("input[type='file']");

                    await browser.wait(EC.visibilityOf(fileInput), 5000, 'GCP P12 input is NOT visible').then(async () => {
                        const filePath = path.resolve(__dirname, p12Path);

                        if (fs.existsSync(filePath)) {
                            console.log(filePath);
                            await fileInput.sendKeys(filePath);
                        } else {
                            await console.log(filePath + ' file is not present on this path!');
                        }
                    });
                });

                return browser.wait(EC.elementToBeClickable(createButton), 5000, 'GCP credential Create button is NOT clickable').then(() => {
                    return createButton.click().then(() => {
                        return $("div[ng-reflect-router-link='/clusters/create']").isPresent().then((present) => {
                            return present;
                        }, error => {
                            return false;
                        });
                    });
                });
            });
        }, error => {
            return console.log('Create Credential page has not opened!');
        });
    }
}