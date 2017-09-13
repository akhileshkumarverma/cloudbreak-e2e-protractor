Feature: Cloudbreak login

  @LoginScenario
  Scenario: Valid user successfully logs in to Cloudbreak
    Given I am on the Cloudbreak Login page
    When I give my username
      And I give my password
      And I click on Login button
    Then I should be logged in