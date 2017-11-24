'use strict';

import {LoginPageObject} from "../../pages/loginPage";
import {BasePageObject} from "../../pages/basePage";

describe('Testing Cloudbreak is up and running', () => {
    const userName = process.env.USERNAME;
    const passWord = process.env.PASSWORD;

    describe('where the ' + userName + ' user', () => {
        let loginPage: LoginPageObject;
        loginPage = new LoginPageObject();

        it('should be successfully logged in',() => {
            expect(loginPage.login(userName, passWord)).toBeTruthy();
        });

    });

    describe('where the base page of the Cloudbreak application', () => {
        let basePage: BasePageObject;
        basePage = new BasePageObject();

        it('should show the Clusters page by default',() => {
            expect(basePage.amIOnTheClustersPage()).toBeTruthy();
        });

    });

});