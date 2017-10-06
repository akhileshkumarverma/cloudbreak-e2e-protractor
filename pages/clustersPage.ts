import { $, by, element, browser } from 'protractor'
import { BasePageObject } from "./basePage";

export class ClustersPageObject extends BasePageObject {
    public clusterCreateButton: any = $("button[id='btnCreateCluster']");

    getClusterWidget(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");

        return browser.wait(EC.elementToBeClickable(widgetLink), 5000, 'Cluster widget is NOT visible').then(() => {
            return widgetLink.isDisplayed().then((displayed) => {
                return displayed;
            }, error => {
                return false;
            });
        }, error => {
          return false;
        });
    }

    openClusterDetails(name: string) {
        return $("a[data-stack-name=\'" + name + "\']").click();
    }

    waitForClusterTermination(name: string) {
        const EC = browser.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");

        return browser.wait(EC.stalenessOf(widgetLink), 10000, 'Cluster has NOT been terminated').then(() => {
            return true;
        }, error => {
            return false;
        });
    }
}