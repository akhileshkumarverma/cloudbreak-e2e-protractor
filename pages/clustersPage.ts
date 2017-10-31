import { $, by, element, browser } from 'protractor'
import { BasePageObject } from "./basePage";
import {async} from "q";

export class ClustersPageObject extends BasePageObject {
    public clusterCreateButton: any = $("button[id='btnCreateCluster']");

    getClusterWidget(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");

        return browser.wait(EC.elementToBeClickable(widgetLink), 20000, 'Cluster widget is NOT visible').then(() => {
            return widgetLink.isDisplayed().then((displayed) => {
                console.log('IsDisplayed passed');
                return displayed;
            }, error => {
                console.log('IsDisplayed failed for: ' + name);
                return false;
            });
        }, error => {
            console.log('WidgetWait failed for: ' + name);
            return false;
        });
    }

    openClusterDetails(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");

        return browser.wait(EC.elementToBeClickable(widgetLink), 10000, 'Cluster widget is NOT clickable').then(() => {
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
    }

    waitForClusterTermination(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");
        const widgetStatus = widgetLink.element(by.cssContainingText("span[class='status-text pull-right']", 'Terminating'));

        return browser.wait(EC.visibilityOf(widgetStatus), 60 * 20000, 'Cluster is NOT terminating').then(() => {
            return widgetStatus.isDisplayed().then(() => {
                console.log('Terminating the cluster and its infrastructure...');
                return browser.wait(EC.invisibilityOf(widgetLink), 60 * 20000, 'Cluster has not been terminated in 1200000 ms!').then(() => {
                    return widgetLink.isDisplayed().then((displayed) => {
                        return !displayed;
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
    }
}