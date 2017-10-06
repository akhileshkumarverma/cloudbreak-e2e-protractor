Feature: Create new cluster

  @ClusterScenario
  Scenario: User creates a new cluster
    Given I am on the Create Cluster Wizard
    When I submit my provider related configurations
    Then I should see my new cluster's widget

  @ClusterScenario
  Scenario: User deletes the previously created cluster
    Given I am opened Cluster Details
    When I terminate my previously created provider related cluster
    Then I should NOT see my previously created cluster on the Cloudbreak Dashboard