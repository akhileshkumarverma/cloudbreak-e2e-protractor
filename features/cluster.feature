Feature: Create new cluster

#  @ClusterScenario
#  Scenario: User opens Cloudbreak Create Clusters Wizard
#    Given I am opened the Cloudbreak Clusters page
#    When I click on the Create Cluster button
#    Then I should see Create Cluster Wizard

  @ClusterScenario
  Scenario: User creates a new OpenStack cluster
    Given I am on the Create Cluster Wizard
    When I submit my OpenStack configurations
    Then I should see my new cluster's widget

#  @ClusterScenario
#  Scenario: User deletes the previously created OpenStack cluster
#    Given I am opened Cluster Details page
#    When I terminate my previously created OpenStack cluster
#    Then I should NOT see my previously created cluster on the Clousbreak Dashboard