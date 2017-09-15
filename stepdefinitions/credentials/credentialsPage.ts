import {CredentialsPageObject} from "../../pages/credentialsPage"
import { defineSupportCode } from 'cucumber'

let chai = require('chai').use(require('chai-smoothie'));
let expect = chai.expect;

defineSupportCode(function ({ Given }) {
    let credentials: CredentialsPageObject = new CredentialsPageObject();

    Given(/^I am on the Cloudbreak Credentials page$/, async () => {
        await expect(credentials.credentialCreateButton).to.be.displayed;
    });
});