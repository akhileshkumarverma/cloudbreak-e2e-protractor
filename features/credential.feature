Feature: Credential
  Azure, AWS, Google Cloud and OpenStack credentials can be managed here for cluster creation on these providers

  @CredentialScenario
  Scenario: User opens Cloudbreak Credential Setup Wizard
    Given I am opened Cloudbreak Credential page
    When I click on the Create Credential button
    Then I should see Credential Setup Wizard

  @CredentialScenario
  Scenario Outline: User creates a new credential
    Given I am on the Cloudbreak Credential Setup Wizard
    When I create my new Credential for the following "<Provider>"
    Then I should see Create Cluster Wizard

    Examples:
      | Provider  |
      | AWS       |
      | Azure     |
      | OpenStack |
