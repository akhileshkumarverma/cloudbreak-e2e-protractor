Feature: Cloudbreak Dashboard page available

  @DashboardScenario
  Scenario: User navigates over Dashboard page
    Given I am on the Cloudbreak Dashboard page
    When I click on the Credentials menu item
      And I click on the Logout icon
    Then I should be logged out