Feature: Clean up after tests have done

  @TeardownScenario
  Scenario Outline: User delete the previously created credential
    Given I am opened Cloudbreak Credential page
    When I delete my Credential for "<Provider>"
    Then I should NOT see my previously created credential on the page

    Examples:
      | Provider  |
      | AWS       |
      | Azure     |
      | OpenStack |
