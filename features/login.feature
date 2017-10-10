Feature: Login
  Cloudbreak login

  @LoginScenario
  Scenario: Valid user successfully logs in to Cloudbreak
    Given I am on the Cloudbreak Login page
    When I submit my user credentials
     And Close Default Credential warning dialog if it is present
    Then I should be logged in