Feature: Agree Cloudbreak Terms of Use

  @ConfirmationScenario
  Scenario: User agrees the Terms of Use
    Given I am on the Confirmation page
    When I check to agree the Terms of Use
      And I click on agree button
    Then I should get to Dashboard page