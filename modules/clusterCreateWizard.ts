import { browser, $, $$, by, element, protractor } from 'protractor'
import {ClustersPageObject} from "../pages/clustersPage";

export class ClusterCreateWizardPageObject extends ClustersPageObject {
    public generalConfiguarationSideItem: any = $("div[ng-reflect-router-link='/clusters/create']");
    public templateSwitch: any = $("div[class='setup-wizard-title-bar'] i[class='fa fa-toggle-off']");

    // Basic Template
    createOpenStackCluster(clusterName: string, instanceType: string, network: string, subnet: string, user: string, password: string, sshKey: string, securityGroup: string) {
        const EC = browser.ExpectedConditions;

        const clusterNameField = $("input[id='clusterName']");
        const instanceTypeFields = $$("input[placeholder='Please select instance type']");
        const ambariMasterCheckbox = $("md-checkbox[ng-reflect-name='master_ambariServer']");
        const networkSelector = $("md-select[placeholder='Please select a network']");
        const subnetSelector = $("md-select[placeholder='Please select a subnet']");
        const userField = $("input[formcontrolname='username']");
        const passwordField = $("input[formcontrolname='password']");
        const confirmPasswordField = $("input[formcontrolname='passwordConfirmation']");
        const sshTextarea = $("textarea[formcontrolname='publicKey']");

        clusterNameField.sendKeys(clusterName).then(() => {
            const nextButton = element(by.cssContainingText('button', 'Next'));

            return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                return nextButton.click().then(() => {
                    return browser.wait(EC.elementToBeClickable(ambariMasterCheckbox), 5000, 'Ambari checkbox is NOT clickable').then(() => {
                        return true;
                    });
                });
            });
        });

        instanceTypeFields.map((instanceTypeField) => {
            return instanceTypeField.sendKeys(instanceType);
        });

        ambariMasterCheckbox.getAttribute('class').then((elementClass) => {
            //console.log(elementClass);
            if (!elementClass.includes('mat-checkbox-checked')) {
                return ambariMasterCheckbox.click().then(() => {
                    const nextButton = element(by.cssContainingText('button', 'Next'));

                    return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                        return nextButton.click().then(() => {
                            return browser.wait(EC.visibilityOf(networkSelector), 5000, 'Network dropdown is NOT visible').then(() => {
                                return true;
                            });
                        });
                    });
                });
            } else {
                const nextButton = element(by.cssContainingText('button', 'Next'));

                return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                    return nextButton.click().then(() => {
                        return browser.wait(EC.visibilityOf(networkSelector), 5000, 'Network dropdown is NOT visible').then(() => {
                            return true;
                        });
                    });
                });
            }
        });
        
        networkSelector.click().then(() => {
            return $("md-option[ng-reflect-value=\'" + network + "\']").click();
        });

        subnetSelector.click().then(() => {
            return $("md-option[ng-reflect-value=\'" + subnet + "\']").click().then(() => {
                const nextButton = element(by.cssContainingText('button', 'Next'));

                return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                    return nextButton.click().then(() => {
                        return browser.wait(EC.visibilityOf(userField), 5000, 'User field is NOT visible').then(() => {
                            return true;
                        });
                    });
                });
            });
        });

        userField.clear().then(() => {
            userField.sendKeys(user);
        });

        passwordField.clear().then(() => {
            passwordField.sendKeys(password);
        });
        confirmPasswordField.clear().then(() => {
            confirmPasswordField.sendKeys(password);
        });

        return sshTextarea.sendKeys(sshKey).then(() => {
            const createButton = element(by.cssContainingText('button', 'Create cluster'));

            return browser.wait(EC.elementToBeClickable(createButton), 5000, 'Create Cluster button is NOT clickable').then(() => {
                return createButton.click().then(() => {
                    const widget = $("a[data-stack-name=\'" + clusterName + "\']");

                    return browser.wait(EC.visibilityOf(widget), 5000, 'User field is NOT visible').then(() => {
                        return true;
                    });
                });
            });
        });

    }

    // Advanced Template
    createAWSCluster(credentialName: string, clusterName: string, user: string, password: string, sshKey: string) {
        const EC = browser.ExpectedConditions;

        const credentialSelector = $("md-select[placeholder='Please select credential']");
        const clusterNameField = $("input[id='clusterName']");
        const ambariMasterCheckbox = $("md-checkbox[ng-reflect-name='master_ambariServer']");
        const fileSystemSelector = $("md-select[placeholder='Please choose a file system']");
        const networkSelector = $("md-select[placeholder='Please select a network']");
        const userField = $("input[formcontrolname='username']");
        const passwordField = $("input[formcontrolname='password']");
        const confirmPasswordField = $("input[formcontrolname='passwordConfirmation']");
        const sshTextarea = $("textarea[formcontrolname='publicKey']");

        this.templateSwitch.click().then(() => {
            return browser.wait(EC.elementToBeClickable(credentialSelector), 5000, 'Credential select is NOT clickable').then(() => {
                return credentialSelector.click().then(() => {
                    return element(by.cssContainingText('md-option', credentialName)).click();
                });
            });
        });

        clusterNameField.sendKeys(clusterName).then(() => {
            const nextButton = element(by.cssContainingText('button', 'Next'));

            return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                return nextButton.click().then(() => {
                    return browser.wait(EC.visibilityOf(ambariMasterCheckbox), 5000, 'Ambari checkbox is NOT clickable').then(() => {
                        return true;
                    });
                });
            });
        });

        ambariMasterCheckbox.getAttribute('class').then((elementClass) => {
            //console.log(elementClass);
            if (!elementClass.includes('mat-checkbox-checked')) {
                return ambariMasterCheckbox.click().then(() => {
                    const nextButton = element(by.cssContainingText('button', 'Next'));

                    return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                        return nextButton.click().then(() => {
                            return browser.wait(EC.visibilityOf(fileSystemSelector), 5000, 'File System dropdown is NOT visible').then(() => {
                                return true;
                            });
                        });
                    });
                });
            } else {
                const nextButton = element(by.cssContainingText('button', 'Next'));

                return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                    return nextButton.click().then(() => {
                        return browser.wait(EC.visibilityOf(fileSystemSelector), 5000, 'File System dropdown is NOT visible').then(() => {
                            return true;
                        });
                    });
                });
            }
        });

        fileSystemSelector.isDisplayed().then(() => {
            const nextButton = element(by.cssContainingText('button', 'Next'));

            return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                return nextButton.click().then(() => {
                    return browser.wait(EC.visibilityOf(networkSelector), 5000, 'Network dropdown is NOT visible').then(() => {
                        return true;
                    });
                });
            });
        });

        element(by.cssContainingText('button', 'Next')).click().then(() => {
            return browser.wait(EC.visibilityOf(userField), 5000, 'Ambari User is NOT visible').then(() => {
                return true;
            });
        });

        userField.clear().then(() => {
            userField.sendKeys(user);
        });

        passwordField.clear().then(() => {
            passwordField.sendKeys(password);
        });
        confirmPasswordField.clear().then(() => {
            confirmPasswordField.sendKeys(password);
        });

        return sshTextarea.sendKeys(sshKey).then(() => {
            const createButton = element(by.cssContainingText('button', 'Create cluster'));

            return browser.wait(EC.elementToBeClickable(createButton), 5000, 'Create Cluster button is NOT clickable').then(() => {
                return createButton.click().then(() => {
                    const widget = $("a[data-stack-name=\'" + clusterName + "\']");

                    return browser.wait(EC.visibilityOf(widget), 5000, 'Cluster widget is NOT visible').then(() => {
                        return true;
                    });
                });
            });
        });

    }
}