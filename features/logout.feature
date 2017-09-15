Feature: Cloudbreak logout

  @LogoutScenario
  Scenario: Valid user successfully logs out from Cloudbreak
    Given I am on the Cloudbreak base page
    When I click on the Logout icon
    Then I should be logged out