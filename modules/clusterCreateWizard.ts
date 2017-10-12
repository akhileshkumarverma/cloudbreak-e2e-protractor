import { browser, $, $$, by, element } from 'protractor'
import { ClustersPageObject } from "../pages/clustersPage";

export class ClusterCreateWizardPageObject extends ClustersPageObject {
    public generalConfiguarationSideItem: any = $("div[ng-reflect-router-link='/clusters/create']");
    public templateSwitch: any = $("div[class='setup-wizard-title-bar'] i[class='fa fa-toggle-off']");

    onTheCreateClusterWizard() {
        return browser.getCurrentUrl().then((url) => {
            //console.log('Actual URL: ' + url);
            //console.log(url.includes('/getstarted'));
            return url.includes('/clusters/create');
        }, error => {
            console.log('Error get current URL');
            return false;
        }).then((result) => {
            if (!result) {
                browser.get(browser.baseUrl + '/clusters/create').then(() => {
                    return browser.wait(() => {
                        return browser.getCurrentUrl().then((url) => {
                            return /create/.test(url);
                        });
                    }, 5000, 'Cannot open Create Cluster Wizard');
                })
            } else {
                return result;
            }
        });
    }

    createOpenStackCluster(credentialName: string, clusterName: string, instanceType: string, network: string, subnet: string, user: string, password: string, sshKey: string, securityGroup: string) {
        const EC = browser.ExpectedConditions;

        const credentialSelector = $("md-select[placeholder='Please select credential']");
        const clusterNameField = $("input[id='clusterName']");
        const instanceTypeFields = $$("input[placeholder='Please select instance type']");
        const ambariMasterCheckbox = $("md-checkbox[ng-reflect-name='master_ambariServer']");
        const networkSelector = $("md-select[placeholder='Please select a network']");
        const subnetSelector = $("md-select[placeholder='Please select a subnet']");
        const userField = $("input[formcontrolname='username']");
        const passwordField = $("input[formcontrolname='password']");
        const confirmPasswordField = $("input[formcontrolname='passwordConfirmation']");
        //const sshTextarea = $("textarea[formcontrolname='publicKey']");
        const sshSelector = $("md-select[placeholder='Please select ssh key']");

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

        return browser.wait(EC.elementToBeClickable(sshSelector), 5000, 'SSH Key select is NOT clickable').then(() => {
            return sshSelector.click().then(() => {
                return element.all(by.cssContainingText('md-option', 'seq-master')).first().click().then(() => {
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
            });
        });

    }

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
        //const sshTextarea = $("textarea[formcontrolname='publicKey']");
        const sshSelector = $("md-select[placeholder='Please select ssh key']");

        this.templateSwitch.click().then(() => {
            return browser.wait(EC.elementToBeClickable(credentialSelector), 5000, 'Credential select is NOT clickable').then(() => {
                return credentialSelector.click().then(() => {
                    return element(by.cssContainingText('md-option', credentialName)).click();
                });
            });
        });

        clusterNameField.sendKeys(clusterName).then(() => {
            const nextButton = element(by.cssContainingText('button', 'Next'));

            return browser.wait(EC.elementToBeClickable(nextButton), 20000, 'Next button is NOT clickable').then(() => {
                return nextButton.click().then(() => {
                    return browser.wait(EC.visibilityOf(ambariMasterCheckbox), 20000, 'Ambari checkbox is NOT clickable').then(() => {
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

        return browser.wait(EC.elementToBeClickable(sshSelector), 5000, 'SSH Key select is NOT clickable').then(() => {
            return sshSelector.click().then(() => {
                return element.all(by.cssContainingText('md-option', 'seq-master')).first().click().then(() => {
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
            });
        });
    }

    createAzureCluster(credentialName: string, clusterName: string, instanceType: string, user: string, password: string, sshKey: string) {
        const EC = browser.ExpectedConditions;

        const credentialSelector = $("md-select[placeholder='Please select credential']");
        const clusterNameField = $("input[id='clusterName']");
        const instanceTypeFields = $$("input[placeholder='Please select instance type']");
        const ambariMasterCheckbox = $("md-checkbox[ng-reflect-name='master_ambariServer']");
        const fileSystemSelector = $("md-select[placeholder='Please choose a file system']");
        const networkSelector = $("md-select[placeholder='Please select a network']");
        const userField = $("input[formcontrolname='username']");
        const passwordField = $("input[formcontrolname='password']");
        const confirmPasswordField = $("input[formcontrolname='passwordConfirmation']");
        //const sshTextarea = $("textarea[formcontrolname='publicKey']");
        const sshSelector = $("md-select[placeholder='Please select ssh key']");

        this.templateSwitch.click().then(() => {
            return browser.wait(EC.elementToBeClickable(credentialSelector), 5000, 'Credential select is NOT clickable').then(() => {
                return credentialSelector.click().then(() => {
                    return element(by.cssContainingText('md-option', credentialName)).click();
                });
            });
        });

        clusterNameField.sendKeys(clusterName).then(() => {
            const nextButton = element(by.cssContainingText('button', 'Next'));

            return browser.wait(EC.elementToBeClickable(nextButton), 20000, 'Next button is NOT clickable').then(() => {
                return nextButton.click().then(() => {
                    return browser.wait(EC.visibilityOf(ambariMasterCheckbox), 20000, 'Ambari checkbox is NOT clickable').then(() => {
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

        return browser.wait(EC.elementToBeClickable(sshSelector), 5000, 'SSH Key select is NOT clickable').then(() => {
            return sshSelector.click().then(() => {
                return element.all(by.cssContainingText('md-option', 'seq-master')).first().click().then(() => {
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
            });
        });
    }
}