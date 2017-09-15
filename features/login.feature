Feature: Cloudbreak login

  @LoginScenario
  Scenario: Valid user successfully logs in to Cloudbreak
    Given I am on the Cloudbreak Login page
    When I submit my user credentials
    Then I should be logged in