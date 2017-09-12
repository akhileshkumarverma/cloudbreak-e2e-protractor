Feature: Log in to Cloudbreak Dashboard

  @CucumberScenario
  Scenario: User logs in to Cloudbreak Dashboard
    Given I am on Cloudbreak Login page
    When I give my username "auto.teszt.elek@mailinator.com"
      And I give my password "Teszt123"
    Then I click on Login button