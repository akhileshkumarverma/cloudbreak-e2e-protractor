Feature: Create new credential

  @CredentialScenario
  Scenario: User opens Cloudbreak Credential Setup Wizard
    Given I am on the Cloudbreak Credentials page
    When I click on the Create Credential button
    Then I should see Credential Setup Wizard

  @CredentialScenario
  Scenario: User creates a new OpenStack credential
    Given I am on the Cloudbreak Credential Setup Wizard
    When I submit my OpenStack credentials
    Then I should see Cluster Create Wizard

#  @CredentialScenario
#  Scenario: User deletes the previously created OpenStack credential
#    Given I am opened Cloudbreak Credential page
#    When I delete my previously created OpenStack credential
#    Then I should NOT see my previously created credential on the page