import {browser, $, $$, by, element, protractor} from 'protractor'
import { ClustersPageObject } from "../clustersPage";

export class ClusterCreateWizardPageObject extends ClustersPageObject {
    public generalConfiguarationApp: any = $("app-general-configuration");
    public templateSwitch: any = $("div[class='setup-wizard-title-bar'] i");

    amIOnTheCreateClusterWizard() {
        browser.getCurrentUrl().then((url) => {
            return url.includes('/clusters/create');
        }, error => {
            return false;
        }).then((result) => {
            if (!result) {
                this.openPage('Clusters').then(() => {
                    return this.clusterCreateButton.click().then(() => {
                        return browser.wait(() => {
                            return browser.getCurrentUrl().then((url) => {
                                return url.includes('/clusters/create');
                            });
                        }, 5000, 'Cannot open Create Cluster Wizard');
                    });
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
        const EC = protractor.ExpectedConditions;
        const generalConfigurations = this.generalConfiguarationApp;

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
        const EC = protractor.ExpectedConditions;
        const templateSelector = this.templateSwitch;
        const credentialSelector = $("mat-select[placeholder='Please select credential']");

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
        const EC = protractor.ExpectedConditions;
        const credentialSelector = $("app-general-configuration mat-select[placeholder='Please select credential']");
        const selectedCredential = element(by.cssContainingText('span.mat-select-value-text span', name));

        browser.wait(EC.elementToBeClickable(credentialSelector), 5000, 'Credential select is NOT clickable').then(() => {
            return credentialSelector.click().then(() => {
                const credentialToSelect = element(by.cssContainingText('mat-option', name));

                return browser.wait(EC.elementToBeClickable(credentialToSelect), 5000, name + ' credential is NOT clickable').then(() => {
                    return credentialToSelect.click();
                }, error => {
                    console.log(name + ' credential is NOT present!');
                    $$("mat-option").first().click();
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
        const EC = protractor.ExpectedConditions;
        const clusterNameField = $('#clusterName');
        const regionSelector = $("mat-select[ng-reflect-name='region']");

        browser.wait(EC.elementToBeClickable(regionSelector), 20000, 'Region select is NOT clickable').then(() => {
            return regionSelector.isEnabled().then((enabled) => {
                return enabled;
            }, error => {
                console.log('Region select is not clickable!');
                return false;
            })
        }, error => {
            return false;
        }).then(() => {
            clusterNameField.clear().then(() => {
                return clusterNameField.sendKeys(name).then(() => {
                    const nextButton = element(by.cssContainingText('button', 'Next'));

                    return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
                        return nextButton.click().then(() => {
                            return browser.wait(EC.urlContains('/clusters/create/hardware-and-storage'), 5000, 'Hardware and Storage page is NOT opened').then(() => {
                                return true;
                            });
                        });
                    });
                });
            });
        });
    }

    setAttachedVolume(count: number) {
        const masterVolumeField = $("input[class*='cb-cluster-create-hwstorage-master-volume-count-input']");
        const workerVolumeField = $("input[class*='cb-cluster-create-hwstorage-worker-volume-count-input']");
        const computeVolumeField = $("input[class*='cb-cluster-create-hwstorage-compute-volume-count-input']");

        let volumeFields = [masterVolumeField, workerVolumeField, computeVolumeField];

        volumeFields.forEach((field, index) => {
            field.clear().then(() => {
                console.log(index + ' Attached Volumes Per Instance has been set to: ' + count);
                return field.sendKeys(count);
            });
        });
    }

    setMasterAsAmbariServer() {
        const EC = protractor.ExpectedConditions;
        const ambariMasterCheckbox = $('#cb-cluster-create-hwstorage-master-ambari-server-checkbox');

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
        const EC = protractor.ExpectedConditions;
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

    selectNetworkSubnet(network: string, subnet: string) {
        const EC = protractor.ExpectedConditions;
        const networkSelector = $('#cb-cluster-create-network-select');
        const subnetSelector = $('#cb-cluster-create-subnet-select');

        browser.wait(EC.elementToBeClickable(networkSelector), 5000, 'Network dropdown is NOT visible').then(() => {
            return networkSelector.click().then(() => {
                const selectedNetwork = element(by.cssContainingText('mat-option', network));

                return browser.wait(EC.elementToBeClickable(selectedNetwork), 5000, 'Network value is NOT clickable').then(() => {
                    console.log('Cluster\'s network has been set to: ' + network);
                    return selectedNetwork.click();
                });
            }).then(() => {
                return subnetSelector.click().then(() => {
                    const selectedSubnet = element(by.cssContainingText('mat-option', subnet));

                    return browser.wait(EC.elementToBeClickable(selectedSubnet), 5000, 'Subnet value is NOT clickable').then(() => {
                        console.log('[' + network + ']\'s subnet has been set to: ' + subnet);
                        return selectedSubnet.click();
                    });
                });
            });
        });
    }

    clickOnNext() {
        const EC = protractor.ExpectedConditions;
        const nextButton = element(by.cssContainingText('button', 'Next'));
        const currentURL = browser.getCurrentUrl();

        return browser.wait(EC.elementToBeClickable(nextButton), 5000, 'Next button is NOT clickable').then(() => {
            return nextButton.click().then(() => {
                return browser.getCurrentUrl().then((url) => {
                    console.log(url);
                    return true;
                });
            });
        });
    }

    openExistingSecurityGroupTab(hostGroup: string) {
        const EC = protractor.ExpectedConditions;
        const networkApp = $("app-network");
        const sourceRadioGroup = networkApp.$('#cb-cluster-create-network-' + hostGroup + '-security-group-type-radio-group');
        const selectedTabTitle = sourceRadioGroup.$("mat-radio-button[value='provider-sg']");

        return browser.wait(EC.elementToBeClickable(selectedTabTitle), 10000, hostGroup + ' Existing Security Group tab is NOT clickable').then(() => {
            return selectedTabTitle.click().then(() => {
                return browser.wait(EC.elementToBeSelected(selectedTabTitle), 10000, hostGroup + ' Existing Security Group tab is NOT selected').then(() => {
                    return selectedTabTitle.isDisplayed().then((displayed) => {
                        return displayed;
                    });
                }, error => {
                    return false;
                });
            });
        }, error => {
            return false;
        });
    }

    setSecurityGroup(hostGroup: string, securityGroup: string) {
        const EC = protractor.ExpectedConditions;
        const securityGroupSelector = $('#cb-cluster-create-network-' + hostGroup + '-security-group-select');

        this.openExistingSecurityGroupTab(hostGroup);

        browser.wait(EC.visibilityOf(securityGroupSelector), 10000, hostGroup + ' security group dropdown is NOT visible').then(() => {
            return securityGroupSelector.click().then(() => {
                const selectedSecurityGroup = element(by.cssContainingText('mat-option', securityGroup));

                return browser.wait(EC.elementToBeClickable(selectedSecurityGroup), 10000, securityGroup + ' security group value is NOT clickable').then(() => {
                    return selectedSecurityGroup.click().then(() => {
                        console.log('[' + hostGroup + '] security group has been set to: ' + securityGroup);
                        return true;
                    }, error => {
                        return false;
                    });
                }, error => {
                    return false;
                });
            });
        });
    }

    navigateFromNetwork() {
        const EC = protractor.ExpectedConditions;
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
        const EC = protractor.ExpectedConditions;

        const userField = $("input[formcontrolname='username']");
        const passwordField = $("input[formcontrolname='password']");
        const confirmPasswordField = $("input[formcontrolname='passwordConfirmation']");

        browser.wait(EC.visibilityOf(userField), 5000, 'Ambari user field is NOT visible').then(() => {
            userField.clear().then(() => {
                return userField.sendKeys(user);
            });
            passwordField.clear().then(() => {
                return passwordField.sendKeys(password);
            });
            return confirmPasswordField.clear().then(() => {
                return confirmPasswordField.sendKeys(password);
            });
        });
    }

    selectSSHKey(sshKey: string) {
        const EC = protractor.ExpectedConditions;
        const sshSelector = $('#cb-cluster-create-security-ssh-key-name-select');

        browser.wait(EC.elementToBeClickable(sshSelector), 5000, 'SSH Key select is NOT clickable').then(() => {
            return sshSelector.click().then(() => {
                return element(by.cssContainingText('mat-option', sshKey)).click().then(() => {
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
        const EC = protractor.ExpectedConditions;
        const sshTextarea = $("textarea[formcontrolname='publicKey']");

        sshTextarea.clear().then(() => {
            sshTextarea.sendKeys(sshKey);
        });
    }

    submitClusterCreate(clusterName: string) {
        const EC = protractor.ExpectedConditions;
        const createButton = element(by.cssContainingText('button', 'Create cluster'));

        return browser.wait(EC.elementToBeClickable(createButton), 30 * 1000, 'Create Cluster button is NOT clickable').then(() => {
            return createButton.click().then(() => {
                const widget = $("a[data-stack-name=\'" + clusterName + "\']");

                return browser.wait(EC.presenceOf(widget), 30 * 1000, clusterName + ' cluster widget is NOT present').then(() => {
                    //console.log('Cluster widget is available');
                    return true;
                }, error => {
                    console.log(clusterName + ' cluster widget is NOT present!');
                    return false;
                });
            });
        }, error => {
            console.log(clusterName + ' cluster Create button is NOT available!');
            return false;
        });
    }

    createOpenStackCluster(credentialName: string, clusterName: string, network: string, subnet: string, securityGroupMaster: string, securityGroupWorker: string, securityGroupCompute: string, user: string, password: string, sshKey: string) {
        this.selectCredential(credentialName);

        this.setAdvancedTemplate();

        this.setClusterName(clusterName);
        this.setAttachedVolume(0);
        this.setMasterAsAmbariServer();

        this.navigateFromRecipes();

        this.selectNetworkSubnet(network, subnet);
        this.setSecurityGroup('master', securityGroupMaster);
        this.setSecurityGroup('worker', securityGroupWorker);
        this.setSecurityGroup('compute', securityGroupCompute);
        this.clickOnNext();

        this.setAmbariCredentials(user, password);
        this.selectSSHKey(sshKey);

        return this.submitClusterCreate(clusterName);
    }

    createAWSCluster(credentialName: string, clusterName: string, user: string, password: string, sshKey: string) {
        this.selectCredential(credentialName);

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
        this.selectCredential(credentialName);

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
        this.selectCredential(credentialName);

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