import { $, by, element, browser } from 'protractor'
import { BasePageObject } from "./basePage";
import {async} from "q";

export class ClustersPageObject extends BasePageObject {
    public clusterCreateButton: any = $("button[id='btnCreateCluster']");

    getClusterWidget(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");

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
    }

    openClusterDetails(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");
        const terminateButton = element(by.cssContainingText('app-cluster-details button', 'TERMINATE'));

        browser.wait(EC.elementToBeClickable(widgetLink), 10000, 'Cluster widget is NOT clickable').then(() => {
            return widgetLink.isDisplayed().then((displayed) => {
                //console.log('IsDisplayed passed');
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

    waitForClusterTermination(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");
        const widgetStatus = widgetLink.element(by.cssContainingText("span[class='status-text pull-right']", 'Terminating'));

        let widgetIsPresent = widgetLink.isPresent().then((presented) => {
           return presented;
        }, error => {
            return false;
        });

        if (widgetIsPresent) {
            return browser.wait(EC.visibilityOf(widgetStatus), 60 * 20000, 'Cluster is NOT terminating').then(() => {
                return widgetStatus.isPresent().then(() => {
                    console.log('Terminating the cluster and its infrastructure...');
                    return browser.wait(EC.invisibilityOf(widgetLink), 60 * 20000, 'Cluster has not been terminated!').then(() => {
                        return widgetLink.isPresent().then((presented) => {
                            console.log('Is present has been checked with: ' + presented);
                            return !presented;
                        }, err => {
                            return true;
                        });
                    }, err => {
                        console.log('Wait for cluster termination has failed!');
                        return false;
                    });
                });
            }, err => {
                console.log(name + ' widget status is NOT visible!');
                return true;
            });
        } else {
            console.log(name + ' widget status is NOT present!');
            return true;
        }
    }
}