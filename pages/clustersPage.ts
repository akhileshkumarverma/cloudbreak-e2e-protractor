import { $, by, element, browser } from 'protractor'
import { BasePageObject } from "./basePage";

export class ClustersPageObject extends BasePageObject {
    public clusterCreateButton: any = $("button[id='btnCreateCluster']");

    getClusterWidget(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");

        return browser.wait(EC.elementToBeClickable(widgetLink), 10000, 'Cluster widget is NOT visible').then(() => {
            return widgetLink.isDisplayed().then((displayed) => {
                //console.log('IsDisplayed passed');
                return displayed;
            }, error => {
                //console.log('IsDisplayed failed');
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

        return browser.wait(EC.invisibilityOf(widgetLink), 60 * 60000, 'Cluster has NOT been terminated').then(() => {
            return widgetLink.isDisplayed().then((displayed) => {
                //console.log('IsDisplayed passed');
                return !displayed;
            }, error => {
                //console.log('IsDisplayed failed');
                return true;
            });
        }, error => {
            return false;
        });
    }
}