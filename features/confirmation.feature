Feature: Agree Cloudbreak Terms of Use

  @CucumberScenario
  Scenario: User agrees the Terms of Use on Confirmation page
    Given I am on Confirmation page
    When I check to agree the Terms of Use
    Then I click on agree button