Feature: Cloudbreak Dashboard page available

  @DashboardScenario
  Scenario: User opens Credential page from Dashboard page
    Given I am on the Cloudbreak Dashboard page
    When I click on the Credentials menu item
    Then I should see Credentials page