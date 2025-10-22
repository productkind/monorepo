Feature: Install Dungarees Binary

  Scenario: Install Dungarees Binary
    Given the Dungarees Binary is published
    When the user installs the Dungarees Binary
    Then the user should be able to run dungarees
