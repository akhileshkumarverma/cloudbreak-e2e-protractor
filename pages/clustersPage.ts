import { $, by, element, browser, ElementFinder } from 'protractor'
import { BasePageObject } from "./basePage";

export class ClustersPageObject extends BasePageObject {
    public clusterCreateButton: any = $("button[id='btnCreateCluster']");

    getClusterWidget(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");

        this.openPage('Clusters').then(() => {
            return browser.wait(EC.elementToBeClickable(widgetLink), 30 * 1000, 'Cluster widget is NOT visible').then(() => {
                return widgetLink.isPresent().then((presented) => {
                    //console.log('IsPresent passed');
                    return presented;
                }, error => {
                    console.log('IsPresent failed for: ' + name);
                    return false;
                });
            }, error => {
                console.log(name + ' cluster has NOT been created!');
                return false;
            });
        });

        return widgetLink.isPresent().then((presented) => {
            //console.log('IsPresent passed');
            return presented;
        }, error => {
            console.log('Widget link is NOT present for: ' + name);
            return false;
        });
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

    waitForElementToDisappear(webElement: ElementFinder) {
        const EC = browser.ExpectedConditions;

        browser.waitForAngular();
        return browser.wait(EC.invisibilityOf(webElement), 60 * 20000, 'The cluster has NOT been terminated!').then(() => {
            browser.waitForAngular();
            return webElement.isDisplayed().then((isDisplayed) => {
                return !isDisplayed;
            }, err => {
                return true;
            });
        }, err => {
            return false;
        });
    }

    waitForClusterTermination(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("app-cluster-item-card a[data-stack-name=\'" + name + "\']");
        const widgetStatus = widgetLink.element(by.cssContainingText("span[class='status-text pull-right']", 'Terminating'));

        let widgetIsPresent = widgetLink.isPresent().then((presented) => {
            return presented;
        }, error => {
            return false;
        });

        if (widgetIsPresent) {
            return browser.wait(EC.visibilityOf(widgetStatus), 20000, 'The cluster is NOT terminating!').then(() => {
                return widgetStatus.isDisplayed().then(() => {
                    console.log('Terminating the cluster and its infrastructure...');

                    if (this.waitForElementToDisappear(widgetStatus)) {
                        return widgetStatus.isDisplayed().then((isDisplayed) => {
                            return !isDisplayed;
                        }, err => {
                            return true;
                        });
                    } else {
                        console.log(name + ' cluster has NOT been terminated during the first 20 minutes wait!');
                        return this.waitForElementToDisappear(widgetLink);
                    }

                }, err => {
                    console.log('Termination has NOT started!');
                    return err;
                });
            });
        } else {
            console.log(name + ' widget is NOT present!');
            return true;
        }
    }
}