import {browser} from "protractor";
import {ClustersPageObject} from "../../pages/clustersPage";
import {ClusterCreateWizardPageObject} from "../../pages/modules/clusterCreateWizard";
import {ClusterDetailsPageObject} from "../../pages/modules/clusterDetails";

/**
 * https://www.npmjs.com/package/jasmine-co
 * spec/helpers/jasmine-co.helper.js
 */
require('jasmine-co').install();

describe('Testing Cloudbreak cluster creation', () => {
    let clusters: ClustersPageObject = new ClustersPageObject();

    const clusterName = process.env.CLUSTER_NAME + browser.params.nameTag;
    const originalJasmineTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;

    beforeAll(() => {
        clusters.openPage('Clusters');
    });

    describe('where the Clusters page', () => {

        it('should be opened from base page',() => {
            expect(clusters.amIOnTheClustersPage()).toBeTruthy();
        });
    });

    describe('where the Create Cluster', () => {

        it('should open Cluster Create Wizard',() => {
            expect(clusters.openClusterCreateWizard()).toBeTruthy();
        });
    });

    describe('where the Cluster Create Wizard', () => {
        let clusterCreateWizard: ClusterCreateWizardPageObject = new ClusterCreateWizardPageObject();

        it('should be opened',() => {
            expect(clusterCreateWizard.amIOnTheCreateClusterWizard()).toBeTruthy();
        });

        it('should show General Configuration panel by default',() => {
            expect(clusterCreateWizard.generalConfiguarationSideItem.isDisplayed()).toBeTruthy();
        });

    });

    describe('where user is able to create new clusters', () => {
        let clusterCreateWizard: ClusterCreateWizardPageObject = new ClusterCreateWizardPageObject();

        const credentialName = process.env.CREDENTIAL_NAME + browser.params.nameTag;
        const clusterName = process.env.CLUSTER_NAME + browser.params.nameTag;
        const user = process.env.AMBARI_USER;
        const password = process.env.AMBARI_PASSWORD;
        const sshKey = process.env.SSH_KEY;
        const sshKeyName = process.env.SSH_KEY_NAME;
        const network = process.env.OS_NETWORK;
        const subnet = process.env.OS_SUBNET;
        const securityGroupMaster = process.env.OS_MASTER_SECURITY_GROUP;
        const securityGroupWorker = process.env.OS_WORKER_SECURITY_GROUP;
        const securityGroupCompute = process.env.OS_COMPUTE_SECURITY_GROUP;

        beforeEach(async () => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
            await clusters.openPage('clusters/create');
        });

        afterAll(() => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout;
        });

        it('new OpenStack cluster should be created', async () => {
            expect(await clusterCreateWizard.createOpenStackCluster(credentialName + 'os', clusterName + 'os', network, subnet, securityGroupMaster, securityGroupWorker, securityGroupCompute, user, password, sshKeyName)).toBeTruthy();
        },600000);

        it('new AWS cluster should be created',async () => {
            expect(await clusterCreateWizard.createAWSCluster(credentialName + 'aws', clusterName + 'aws', user, password, sshKeyName)).toBeTruthy();
        },600000);

        it('new Azure cluster should be created',async () => {
            expect(await clusterCreateWizard.createAzureCluster(credentialName + 'azure', clusterName + 'azure', user, password, sshKey)).toBeTruthy();
        },600000);

        it('new GCP cluster should be created',async () => {
            expect(await clusterCreateWizard.createGCPCluster(credentialName + 'gcp', clusterName + 'gcp', user, password, sshKey)).toBeTruthy();
        },600000);
    });

    describe('where the Clusters page shows the newly created clusters', () => {

        beforeAll(() => {
            clusters.openPage('Clusters');
        });

        it('OpenStack widget should be available', () => {
            expect(clusters.getClusterWidget(clusterName + 'os')).toBeTruthy();
        });

        it('AWS widget should be available',() => {
            expect(clusters.getClusterWidget(clusterName + 'aws')).toBeTruthy();
        });

        it('Azure widget should be available',() => {
            expect(clusters.getClusterWidget(clusterName + 'azure')).toBeTruthy();
        });

        it('GCP widget should be available',() => {
            expect(clusters.getClusterWidget(clusterName + 'gcp')).toBeTruthy();
        });
    });

    describe('where user is able to delete clusters', () => {
        let clusterDetails: ClusterDetailsPageObject = new ClusterDetailsPageObject();

        beforeEach(async () => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 600000;
            await clusters.openPage('Clusters');
        });

        afterAll(() => {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = originalJasmineTimeout;
        });

        it('previously created OpenStack cluster should terminate', () => {
            clusterDetails.openClusterDetails(clusterName + 'os');
            expect(clusterDetails.terminateCluster()).toBeTruthy();
        });
        it('previously created OpenStack cluster should be terminating', () => {
            expect(clusterDetails.isClusterTerminating(clusterName + 'os')).toBeTruthy();
        });
        it('previously created OpenStack cluster should be removed',async () => {
            expect(await clusterDetails.waitForClusterWidgetTermination(clusterName + 'os')).toBeTruthy();
        }, 600000);

        it('previously created AWS cluster should terminate', () => {
            clusterDetails.openClusterDetails(clusterName + 'aws');
            expect(clusterDetails.terminateCluster()).toBeTruthy();
        });
        it('previously created AWS cluster should be terminating', () => {
            expect(clusterDetails.isClusterTerminating(clusterName + 'aws')).toBeTruthy();
        });
        it('previously created AWS cluster should be removed',async () => {
            expect(await clusterDetails.waitForClusterWidgetTermination(clusterName + 'aws')).toBeTruthy();
        }, 600000);

        it('previously created Azure cluster should terminate', () => {
            clusterDetails.openClusterDetails(clusterName + 'azure');
            expect(clusterDetails.terminateCluster()).toBeTruthy();
        });
        it('previously created Azure cluster should be terminating', () => {
            expect(clusterDetails.isClusterTerminating(clusterName + 'azure')).toBeTruthy();
        });
        it('previously created Azure cluster should be removed',async () => {
            expect(await clusterDetails.waitForClusterWidgetTermination(clusterName + 'azure')).toBeTruthy();
        }, 600000);

        it('previously created GCP cluster should terminate', () => {
            clusterDetails.openClusterDetails(clusterName + 'gcp');
            expect(clusterDetails.terminateCluster()).toBeTruthy();
        });
        it('previously created GCP cluster should be terminating', () => {
            expect(clusterDetails.isClusterTerminating(clusterName + 'gcp')).toBeTruthy();
        });
        it('previously created GCP cluster should be removed',async () => {
            expect(await clusterDetails.waitForClusterWidgetTermination(clusterName + 'gcp')).toBeTruthy();
        }, 600000);
    });
});