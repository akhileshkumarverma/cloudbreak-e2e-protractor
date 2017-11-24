import {BasePageObject} from "../../pages/basePage";

describe('Testing Cloudbreak is up and running', () => {

    describe('where the base page of the Cloudbreak application', () => {
        let basePage: BasePageObject;
        basePage = new BasePageObject();

        it('should be able to log out from',() => {
            expect(basePage.logOut()).toBeTruthy();
        });

        it('should be logged out from',() => {
            expect(basePage.isLoggedOut()).toBeTruthy();
        });
    });
});