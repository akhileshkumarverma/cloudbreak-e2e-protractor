import {browser} from "protractor";
import {ClustersPageObject} from "../../pages/clustersPage";
import {ClusterCreateWizardPageObject} from "../../pages/modules/clusterCreateWizard";
import {ClusterDetailsPageObject} from "../../pages/modules/clusterDetails";

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

        beforeEach(() => {
            clusterCreateWizard.amIOnTheCreateClusterWizard();
        });

        it('new OpenStack cluster should be created', () => {
            expect(clusterCreateWizard.createOpenStackCluster(credentialName + 'os', clusterName + 'os', network, subnet, user, password, sshKeyName)).toBeTruthy();
        });

        it('new AWS cluster should be created',() => {
            expect(clusterCreateWizard.createAWSCluster(credentialName + 'aws', clusterName + 'aws', user, password, sshKeyName)).toBeTruthy();
        });

        it('new Azure cluster should be created',() => {
            expect(clusterCreateWizard.createAzureCluster(credentialName + 'azure', clusterName + 'azure', user, password, sshKey)).toBeTruthy();
        });

        it('new GCP cluster should be created',() => {
            expect(clusterCreateWizard.createGCPCluster(credentialName + 'gcp', clusterName + 'gcp', user, password, sshKey)).toBeTruthy();
        });
    });

    describe('where the Clusters page shows the newly created clusters', () => {

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

        beforeEach(() => {
            clusters.openPage('Clusters');
        });

        it('previously created OpenStack cluster should be deleted',function(done) {
            clusterDetails.openClusterDetails(clusterName + 'os');
            clusterDetails.terminateCluster();

            jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
            clusterDetails.isClusterTerminating(clusterName + 'os');
            expect(clusterDetails.waitForClusterTermination(clusterName + 'os')).toBeTruthy();
            done();
        }, 40 * 60000);

        it('AWS cluster should be deleted',function(done) {
            clusterDetails.openClusterDetails(clusterName + 'aws');
            clusterDetails.terminateCluster();

            jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
            clusterDetails.isClusterTerminating(clusterName + 'aws');
            expect(clusterDetails.waitForClusterTermination(clusterName + 'aws')).toBeTruthy();
            done();
        }, 40 * 60000);

        it('Azure cluster should be deleted',function(done) {
            clusterDetails.openClusterDetails(clusterName + 'azure');
            clusterDetails.terminateCluster();

            jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
            clusterDetails.isClusterTerminating(clusterName + 'azure');
            expect(clusterDetails.waitForClusterTermination(clusterName + 'azure')).toBeTruthy();
            done();
        }, 40 * 60000);

        it('GCP cluster should be deleted',function(done) {
            clusterDetails.openClusterDetails(clusterName + 'gcp');
            clusterDetails.terminateCluster();

            jasmine.DEFAULT_TIMEOUT_INTERVAL = 60 * 60000;
            clusterDetails.isClusterTerminating(clusterName + 'gcp');
            expect(clusterDetails.waitForClusterTermination(clusterName + 'gcp')).toBeTruthy();
            done();
        }, 40 * 60000);
    });
});