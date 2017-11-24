import { $, by, element, browser } from "protractor";
import { BasePageObject } from "./basePage";

export class ClustersPageObject extends BasePageObject {
    public clusterCreateButton: any = $("button[id='btnCreateCluster']");

    openClusterCreateWizard() {
        const EC = browser.ExpectedConditions;

        return this.clusterCreateButton.click().then(() => {
            return browser.wait(EC.urlContains('/create'), 5000, 'Cluster Create Wizard has NOT been opened!').then(() => {
                return browser.getCurrentUrl().then((url) => {
                    //console.log('Actual URL: ' + url);
                    return url.includes('/create');
                }, error => {
                    console.log('Error get current URL');
                    return false;
                });
            });
        });
    }

    getClusterWidget(name: string) {
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");

        return browser.wait(() => {
            return widgetLink.isPresent().then((presented) => {
                //console.log('IsPresent passed');
                return presented;
            }, error => {
                console.log('Widget link is NOT present for: ' + name);
                return false;
            });
        }, 10000, name + ' cluster has NOT been created!');
    }

    openClusterDetails(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");
        const terminateButton = element(by.cssContainingText('app-cluster-details button', 'TERMINATE'));

        browser.wait(EC.elementToBeClickable(widgetLink), 10000, 'Cluster widget is NOT clickable').then(() => {
            return widgetLink.isDisplayed().then((displayed) => {
                //console.log('IsDisplayed passed');
                browser.waitForAngular();
                return widgetLink.click();
            }, error => {
                //console.log('IsDisplayed failed');
                return false;
            });
        }, error => {
            return false;
        });

        return browser.wait(EC.elementToBeClickable(terminateButton), 10000, 'Cluster Details has NOT opened').then(() => {
            return terminateButton.isDisplayed().then((displayed) => {
                //console.log('IsDisplayed passed');
                return displayed;
            }, error => {
                //console.log('IsDisplayed failed');
                return false;
            });
        }, error => {
            return false;
        });
    }

    isClusterTerminating(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("app-cluster-item-card a[data-stack-name=\'" + name + "\']");
        const widgetStatus = widgetLink.element(by.cssContainingText("span[class='status-text pull-right']", 'Terminating'));

        widgetLink.isPresent().then((presented) => {
            return presented;
        }, error => {
            return false;
        }).then((result) => {
            if (result) {
                return browser.wait(EC.visibilityOf(widgetStatus), 10000, 'The cluster is NOT terminating!').then(() => {
                    return widgetStatus.isDisplayed().then(() => {
                        console.log('Terminating the cluster and its infrastructure...');
                        return true;
                    }, err => {
                        console.log('Termination has NOT started!');
                        return err;
                    });
                });
            } else {
                console.log(name + ' widget is NOT present!');
                return true;
            }
        });
    }

    waitForClusterTermination(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("app-cluster-item-card a[data-stack-name=\'" + name + "\']");

        return browser.wait(EC.invisibilityOf(widgetLink), 60 * 20000, 'The cluster has NOT been terminated!').then(() => {
            return widgetLink.isDisplayed().then((displayed) => {
                return !displayed;
            }, error => {
                console.log('Cluster has been terminated');
                return true;
            });
        }, error => {
            return false;
        });
    }
}