Feature: Clean up after tests have done

  @TeardownScenario
  Scenario: User delete the previously created credential
    Given I am opened Cloudbreak Credential page
    When I delete my previously created provider related credential
    Then I should NOT see my previously created credential on the page