import {$, by, element, browser, protractor, $$} from "protractor";
import { BasePageObject } from "./basePage";

export class ClustersPageObject extends BasePageObject {
    public clusterCreateButton: any = $("button[id='btnCreateCluster']");

    openClusterCreateWizard() {
        const EC = protractor.ExpectedConditions;

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
        const EC = protractor.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");
        const terminateButton = element(by.cssContainingText('app-cluster-details button', 'TERMINATE'));

        browser.wait(EC.visibilityOf(widgetLink), 10000, 'Cluster widget is NOT visible').then(() => {
            return browser.wait(EC.elementToBeClickable(widgetLink), 5000, 'Cluster widget is NOT clickable').then(() => {
                return widgetLink.isDisplayed().then(() => {
                    return widgetLink.click();
                }, error => {
                    console.log(name + ' widget link is not available!');
                    return false;
                });
            });
        }, error => {
            console.log(name + ' widget link is not visible!');
            return false;
        });

        return browser.wait(EC.visibilityOf(terminateButton), 10000, 'Cluster Details has NOT been opened').then(() => {
            return browser.wait(EC.elementToBeClickable(terminateButton), 5000, 'Cluster Terminate is NOT clickable').then(() => {
                return terminateButton.isDisplayed().then((displayed) => {
                    return displayed;
                }, error => {
                    console.log(name + ' terminate button is not available!');
                    return false;
                });
            });
        }, error => {
            console.log(name + ' terminate button is not visible!');
            return false;
        });
    }

    isClusterTerminating(name: string) {
        const EC = protractor.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");
        const widgetStatus = widgetLink.element(by.cssContainingText("span[class='status-text pull-right']", 'Terminating'));

        browser.wait(EC.visibilityOf(widgetLink), 5000, name + ' widget is NOT visible!').then(() => {
            widgetLink.isPresent().then((presented) => {
                return presented;
            }, error => {
                return false;
            }).then((result) => {
                if (result) {
                    return browser.wait(EC.visibilityOf(widgetStatus), 10000, 'The cluster is NOT terminating!').then(() => {
                        return widgetStatus.isDisplayed().then(() => {
                            //console.log('Terminating the cluster and its infrastructure...');
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
        });
    }

    waitForClusterWidgetTermination(name: string) {
        const EC = protractor.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");

        return browser.wait(EC.stalenessOf(widgetLink), 10 * 60000, 'The cluster has NOT been terminated!').then(() => {
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

    waitForClusterDetailsTermination(name: string) {
        const EC = protractor.ExpectedConditions;
        const clusterDetailsModule = $("app-cluster-details");

        this.openClusterDetails(name).then(() => {
            return browser.wait(EC.visibilityOf(clusterDetailsModule), 5000, 'Cluster details has NOT been opened').then(() => {
                const latestClusterHistory = clusterDetailsModule.$$("event-history ul>li").first();
                const latestMessage = latestClusterHistory.$$("div").first();
                const latestTimeStamp = latestClusterHistory.$$("div").last();

                latestMessage.getText().then(function (message) {
                    return console.log(message);
                });
                latestTimeStamp.getText().then(function (time) {
                    return console.log(time);
                });
            }, error => {
                return console.log('Cluster has already been terminated');
            });
        });

        return browser.wait(EC.stalenessOf(clusterDetailsModule), 10 * 60000, 'The cluster has NOT been terminated!').then(() => {
            return clusterDetailsModule.isPresent().then((presented) => {
                return !presented;
            }, error => {
                console.log('Cluster has been terminated');
                return true;
            });
        }, error => {
            return false;
        });
    }
}