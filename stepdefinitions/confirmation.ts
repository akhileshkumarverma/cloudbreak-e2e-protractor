import { ConfirmationPageObject } from '../pages/confirmationPage';
import { defineSupportCode } from 'cucumber';

defineSupportCode(function ({ When, Then }) {
    let confirmation: ConfirmationPageObject = new ConfirmationPageObject();
    When(/^I check to agree the Terms of Use$/, async () => {
        await confirmation.optCheckBox.click();
    });

    Then(/^I click on agree button$/, async () => {
        await confirmation.agreeButton.click();
    });

});