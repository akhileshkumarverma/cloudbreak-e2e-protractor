import { ClusterCreateWizardPageObject } from "../../modules/clusterCreateWizard";
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ When, Then }) {
    let clusterCreateSetupWizard: ClusterCreateWizardPageObject = new ClusterCreateWizardPageObject();

    When(/^I submit my OpenStack configurations$/, async () => {
        await clusterCreateSetupWizard.createOpenStackCluster('openstack-autotesting', 'aszegedi-testing5', 'm1.large', 'a5ad7a1d-d3a6-4180-8d61-07a23f', '0404bf21-db5f-4987-8576-e65a4a', 'admin', 'admin', 'ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQC0Rfl2G2vDs6yc19RxCqReunFgpYj+ucyLobpTCBtfDwzIbJot2Fmife6M42mBtiTmAK6x8kcUEeab6CB4MUzsqF7vGTFUjwWirG/XU5pYXFUBhi8xzey+KS9KVrQ+UuKJh/AN9iSQeMV+rgT1yF5+etVH+bK1/37QCKp3+mCqjFzPyQOrvkGZv4sYyRwX7BKBLleQmIVWpofpjT7BfcCxH877RzC5YMIi65aBc82Dl6tH6OEiP7mzByU52yvH6JFuwZ/9fWj1vXCWJzxx2w0F1OU8Zwg8gNNzL+SVb9+xfBE7xBHMpYFg72hBWPh862Ce36F4NZd3MpWMSjMmpDPh', '9b97d5c3-b891-498c-9013-11f9e4');
    });

    Then(/^I should see my new cluster's widget$/, async () => {
       await expect(clusterCreateSetupWizard.getClusterWidget('aszegedi-testing5')).to.be.displayed;
    })

});