Feature: Clean up after tests have done

  @TeardownScenario
  Scenario: User delete the previously created OpenStack credential
    Given I am opened Cloudbreak Credential page
    When I delete my previously created OpenStack credential
    Then I should NOT see my previously created credential on the page