Feature: Cluster
  Azure, AWS, Google Cloud and OpenStack clusters can be managed here

  @ClusterScenario
  Scenario Outline: User creates a new cluster
    Given I am on the Create Cluster Wizard
    When I select my previously created "<Provider>" credential
      And I create my new Cluster for "<Provider>"
    Then I should see my "<Provider>" cluster's widget

    Examples:
      | Provider  |
      | AWS       |
      | Azure     |
      | GCP       |
      | OpenStack |

  @ClusterScenario
  Scenario Outline: User deletes the previously created cluster
    Given I see my previously created "<Provider>" cluster on the Clusters page
    When I open "<Provider>" Cluster Details
      And I terminate my Cluster on "<Provider>"
    Then I should NOT see my "<Provider>" cluster on the Cloudbreak Dashboard

    Examples:
      | Provider  |
      | AWS       |
      | Azure     |
      | GCP       |
      | OpenStack |
