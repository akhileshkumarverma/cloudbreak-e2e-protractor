import { browser, $, $$, by, element } from 'protractor'
import { ClustersPageObject } from "../pages/clustersPage";

export class ClusterCreateWizardPageObject extends ClustersPageObject {
    public generalConfiguarationSideItem: any = $("div[ng-reflect-router-link='/clusters/create']");
    public templateSwitch: any = $("div[class='setup-wizard-title-bar'] i");

    amIOnTheCreateClusterWizard() {
        browser.getCurrentUrl().then((url) => {
            return url.includes('/clusters/create');
        }, error => {
            return false;
        }).then((result) => {
            if (!result) {
                this.openPage('Clusters');

                this.clusterCreateButton.click().then(() => {
                    return browser.wait(() => {
                        return browser.getCurrentUrl().then((url) => {
                            return url.includes('/clusters/create');
                        });
                    }, 5000, 'Cannot open Create Cluster Wizard');
                });
            }
        });

        return browser.getCurrentUrl().then((url) => {
            //console.log('Actual URL: ' + url);
            return url.includes('/clusters/create');
        }, error => {
            console.log('Error get current URL');
            return false;
        });
    }

    isCreateClusterWizardOpened() {
        const EC = browser.ExpectedConditions;
        const generalConfigurations = this.generalConfiguarationSideItem;

        return browser.wait(EC.visibilityOf(generalConfigurations), 5000, 'General Configurations is NOT visible').then(() => {
            return generalConfigurations.isDisplayed().then((displayed) => {
                return displayed;
            }, error => {
                return false;
            });
        }, error => {
            return false;
        });
    }

    setAdvancedTemplate() {
        const EC = browser.ExpectedConditions;
        const templateSelector = this.templateSwitch;
        const credentialSelector = $("md-select[placeholder='Please select credential']");

        browser.wait(EC.elementToBeClickable(templateSelector), 5000, 'Template switch is NOT clickable').then(() => {
            return templateSelector.isEnabled().then((enabled) => {
                return enabled;
            }, error => {
                console.log('Template switch is not clickable!');
                return false;
            })
        }).then((result) => {
            if (result) {
                templateSelector.click().then(() => {
                    return browser.wait(EC.elementToBeClickable(credentialSelector), 5000, 'Credential select is NOT clickable').then(() => {
                        return credentialSelector.isDisplayed().then((displayed) => {
                            return displayed;
                        });
                    }, error => {
                        return false;
                    });
                });
            }
        });
    }

    selectCredential(name: string) {
        const EC = browser.ExpectedConditions;
        const credentialSelector = $("md-select[placeholder='Please select credential']");
        const selectedCredential = element(by.cssContainingText('span.mat-select-value-text span', name));

        browser.wait(EC.elementToBeClickable(credentialSelector), 5000, 'Credential select is NOT clickable').then(() => {
            return credentialSelector.click().then(() => {
                const credentialToSelect = element(by.cssContainingText('md-option', name));

                return browser.wait(EC.elementToBeClickable(credentialToSelect), 5000, name + ' credential is NOT clickable').then(() => {
                    return credentialToSelect.click();
                }, error => {
                    console.log(name + ' credential is NOT present!');
                    $$("md-option").first().click();
                    return false;
                });
            });
        });

        return browser.wait(EC.visibilityOf(selectedCredential), 5000, name + ' is NOT the selected credential').then(() => {
            return selectedCredential.isDisplayed().then((displayed) => {
                return displayed;
            }, error => {
                console.log(name + ' credential is NOT selected!');
                return false;
            });
        }, error => {
            //console.log(name + ' credential is NOT present!');
            return false;
        });
    }

    setClusterName(name: string) {
        const EC = browser.ExpectedConditions;
        const clusterNameField = $("input[id='clusterName']");

        clusterNameField.sendKeys(name).then(() => {
            const nextButton = element(by.cssContainingText('button', 'Next'));

            return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                return nextButton.click().then(() => {
                    return browser.wait(EC.urlContains('/clusters/create/hardware-and-storage'), 5000, 'Hardware and Storage page is NOT opened').then(() => {
                        return true;
                    });
                });
            });
        });
    }

    setMasterAsAmbariServer() {
        const EC = browser.ExpectedConditions;
        const ambariMasterCheckbox = $("md-checkbox[ng-reflect-name='master_ambariServer']");

        ambariMasterCheckbox.getAttribute('class').then((elementClass) => {
            //console.log(elementClass);
            if (!elementClass.includes('mat-checkbox-checked')) {
                return ambariMasterCheckbox.click().then(() => {
                    const nextButton = element(by.cssContainingText('button', 'Next'));

                    return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                        return nextButton.click().then(() => {
                            return browser.wait(EC.urlContains('/clusters/create/recipes'), 5000, 'Recipes page is NOT visible').then(() => {
                                return true;
                            });
                        });
                    });
                });
            } else {
                const nextButton = element(by.cssContainingText('button', 'Next'));

                return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                    return nextButton.click().then(() => {
                        return browser.wait(EC.urlContains('/clusters/create/recipes'), 5000, 'Recipes page is NOT visible').then(() => {
                            return true;
                        });
                    });
                });
            }
        });
    }

    navigateFromRecipes() {
        const EC = browser.ExpectedConditions;
        const recipeActionContainer = $("app-config-recipes div[class='action-container']");

        recipeActionContainer.isDisplayed().then(() => {
            const nextButton = recipeActionContainer.element(by.cssContainingText('button', 'Next'));

            return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                return nextButton.click().then(() => {
                    return browser.wait(EC.urlContains('/clusters/create/network'), 5000, 'Network page is NOT visible').then(() => {
                        return true;
                    });
                });
            });
        });
    }

    navigateFromNetwork() {
        const EC = browser.ExpectedConditions;
        const networkActionContainer = $("app-network form div[class='action-container']");

        networkActionContainer.isDisplayed().then(() => {
            const nextButton = networkActionContainer.element(by.cssContainingText('button', 'Next'));

            return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                return nextButton.click().then(() => {
                    return browser.wait(EC.urlContains('/clusters/create/security'), 5000, 'Security page is NOT visible').then(() => {
                        return true;
                    });
                });
            });
        });
    }

    setAmbariCredentials(user: string, password: string) {
        const userField = $("input[formcontrolname='username']");
        const passwordField = $("input[formcontrolname='password']");
        const confirmPasswordField = $("input[formcontrolname='passwordConfirmation']");

        userField.clear().then(() => {
            userField.sendKeys(user);
        });
        passwordField.clear().then(() => {
            passwordField.sendKeys(password);
        });
        confirmPasswordField.clear().then(() => {
            confirmPasswordField.sendKeys(password);
        });
    }

    selectSSHKey(sshKey: string) {
        const EC = browser.ExpectedConditions;
        const sshSelector = $("md-select[placeholder='Please select ssh key']");

        browser.wait(EC.elementToBeClickable(sshSelector), 5000, 'SSH Key select is NOT clickable').then(() => {
            return sshSelector.click().then(() => {
                return $("md-option[ng-reflect-value=\'" + sshKey + "\']").click().then(() => {
                    const createButton = element(by.cssContainingText('button', 'Create cluster'));

                    return browser.wait(EC.elementToBeClickable(createButton), 5000, 'Create Cluster button is NOT clickable').then(() => {
                        return createButton.isEnabled().then((enabled) => {
                           return enabled;
                        });
                    });
                });
            });
        });
    }

    setSSHKey(sshKey: string) {
        const EC = browser.ExpectedConditions;
        const sshTextarea = $("textarea[formcontrolname='publicKey']");

        sshTextarea.clear().then(() => {
            sshTextarea.sendKeys(sshKey);
        });
    }

    submitClusterCreate(clusterName: string) {
        const EC = browser.ExpectedConditions;
        const createButton = element(by.cssContainingText('button', 'Create cluster'));

        return browser.wait(EC.elementToBeClickable(createButton), 5000, 'Create Cluster button is NOT clickable').then(() => {
            return createButton.click().then(() => {
                const widget = $("a[data-stack-name=\'" + clusterName + "\']");

                return browser.wait(EC.visibilityOf(widget), 10000, 'Cluster widget is NOT visible').then(() => {
                    //console.log('Cluster widget is available');
                    return true;
                });
            });
        });
    }

    createOpenStackCluster(credentialName: string, clusterName: string, user: string, password: string, sshKey: string) {
        this.setAdvancedTemplate();

        this.setClusterName(clusterName);
        this.setMasterAsAmbariServer();

        this.navigateFromRecipes();
        this.navigateFromNetwork();

        this.setAmbariCredentials(user, password);
        this.selectSSHKey(sshKey);

        return this.submitClusterCreate(clusterName);
    }

    createAWSCluster(credentialName: string, clusterName: string, user: string, password: string, sshKey: string) {
        this.setAdvancedTemplate();

        this.setClusterName(clusterName);
        this.setMasterAsAmbariServer();

        this.navigateFromRecipes();
        this.navigateFromNetwork();

        this.setAmbariCredentials(user, password);
        this.selectSSHKey(sshKey);

        return this.submitClusterCreate(clusterName);
    }

    createAzureCluster(credentialName: string, clusterName: string, user: string, password: string, sshKey: string) {
        this.setAdvancedTemplate();

        this.setClusterName(clusterName);
        this.setMasterAsAmbariServer();

        this.navigateFromRecipes();
        this.navigateFromNetwork();

        this.setAmbariCredentials(user, password);
        this.setSSHKey(sshKey);

        return this.submitClusterCreate(clusterName);
    }

    createGCPCluster(credentialName: string, clusterName: string, user: string, password: string, sshKey: string) {
        this.setAdvancedTemplate();

        this.setClusterName(clusterName);
        this.setMasterAsAmbariServer();

        this.navigateFromRecipes();
        this.navigateFromNetwork();

        this.setAmbariCredentials(user, password);
        this.setSSHKey(sshKey);

        return this.submitClusterCreate(clusterName);
    }
}