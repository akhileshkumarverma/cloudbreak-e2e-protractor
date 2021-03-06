import {$, by, element, browser, protractor, $$} from "protractor";
import { BasePageObject } from "./basePage";

export class ClustersPageObject extends BasePageObject {
    public clusterCreateButton: any = $('#btnCreateCluster');

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

        browser.wait(EC.visibilityOf(widgetLink), 20000, 'Cluster widget is NOT visible').then(() => {
            return browser.wait(EC.elementToBeClickable(widgetLink), 10000, 'Cluster widget is NOT clickable').then(() => {
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

        return browser.wait(EC.visibilityOf(widgetLink), 5000, name + ' widget is NOT visible!').then(() => {
            return widgetLink.isPresent().then((presented) => {
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
        }, error => {
            console.log(name + ' widget has already been removed!');
            return true;
        });
    }

    refreshClustersPage() {
        const EC = protractor.ExpectedConditions;
        const refreshIcon = $("app-cluster-list i[class='fa fa-refresh fa-fw']");
        const spinIcon = $("app-cluster-list i[class='fa fa-refresh fa-spin fa-fw']");

        return browser.wait(EC.elementToBeClickable(refreshIcon), 5000, 'The refresh Clusters page is NOT clickable!').then(() => {
            return refreshIcon.click().then(() => {
                return browser.wait(EC.stalenessOf(spinIcon), 5000, 'The Clusters page is STILL refreshing!').then(() => {
                    return spinIcon.isPresent().then((presented) => {
                        return !presented;
                    }, error => {
                        return true;
                    });
                }, error => {
                    return false;
                });
            }, error => {
                return false;
            });
        }, error => {
            return false;
        });
    }

    waitForClusterWidgetTermination(name: string) {
        const EC = protractor.ExpectedConditions;
        const widgetLink = $("a[data-stack-name=\'" + name + "\']");
        //console.log('Custom timeouts: ' + jasmine.DEFAULT_TIMEOUT_INTERVAL + '[JASMINE] and ' + browser.allScriptsTimeout + '[PROTRACTOR]');

        return browser.wait(EC.invisibilityOf(widgetLink), 480000, 'The cluster has NOT been terminated!').then(() => {
            console.log(name + ' cluster has been removed!');
            return browser.wait(EC.stalenessOf(widgetLink), 480000, 'The cluster widget has NOT been removed!').then(() => {
                console.log(name + ' widget has been removed!');
                return widgetLink.isPresent().then((presented) => {
                    return !presented;
                }, error => {
                    console.log(name + ' cluster has been terminated');
                    return true;
                });
            }, error => {
                this.refreshClustersPage();
                console.log(name + ' widget has NOT been removed in 480 seconds!');

                return widgetLink.isPresent().then((presented) => {
                    return !presented;
                }, error => {
                    console.log(name + ' cluster has been terminated');
                    return true;
                });
            });
        }, error => {
            this.refreshClustersPage();
            console.log(name + ' cluster has NOT been removed in 480 seconds!');

            return widgetLink.isPresent().then((presented) => {
                return !presented;
            }, error => {
                console.log(name + ' cluster has been terminated');
                return true;
            });
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

        return browser.wait(EC.stalenessOf(clusterDetailsModule), 8 * 60000, 'The cluster has NOT been terminated!').then(() => {
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