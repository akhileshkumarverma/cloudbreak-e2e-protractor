import { $, by, element } from 'protractor'
import { BasePageObject } from "./basePage";

export class ClustersPageObject extends BasePageObject {
    public clusterCreateButton: any = $("button[id='btnCreateCluster']");

    getClusterWidget(name: string) {
        return element(by.cssContainingText('app-cluster-item-card div', name));
    }

}