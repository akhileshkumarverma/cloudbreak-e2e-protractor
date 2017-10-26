Feature: Cluster
  Azure, AWS, Google Cloud and OpenStack clusters can be managed here

  @ClusterScenario
  Scenario Outline: User creates a new cluster
    Given I am on the Create Cluster Wizard
    When I create my new Cluster for the following "<Provider>"
    Then I should see my "<Provider>" cluster's widget

    Examples:
      | Provider  |
      | OpenStack |
      | AWS       |
      | Azure     |
#      | GCP       |

  @ClusterScenario
  Scenario Outline: User deletes the previously created cluster
    Given I am opened "<Provider>" Cluster Details
    When I terminate my Cluster on "<Provider>"
    Then I should NOT see my "<Provider>" cluster on the Cloudbreak Dashboard

    Examples:
      | Provider  |
      | OpenStack |
      | AWS       |
      | Azure     |
#      | GCP       |
