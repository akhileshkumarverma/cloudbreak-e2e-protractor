Feature: Create new credential

  @CredentialScenario
  Scenario: User opens Cloudbreak Credential Setup Wizard
    Given I am on the Cloudbreak Credentials page
    When I click on the Create Credential button
    Then I should see Credential Setup Wizard

  @CredentialScenario
  Scenario: User creates a new OpenStack credential
    Given I am on the Cloudbreak Credential Setup Wizard
    When I click on the Cloud provider
    Then I should see OpenStack as selected provider