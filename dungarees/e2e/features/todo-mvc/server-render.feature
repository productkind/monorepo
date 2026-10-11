Feature: Todo MVC rendered on the server and taken over in the browser

  Scenario Outline: The server sends the list the path asks for
    When the visitor opens "/completed" on the <mode> server
    Then the page the server sent lists only the completed todos

    Examples:
      | mode        |
      | development |
      | production  |

  Scenario Outline: A path the app does not have is not found
    When the visitor opens "/no-such-page" on the <mode> server
    Then the server answers that the page is not found

    Examples:
      | mode        |
      | development |
      | production  |

  Scenario Outline: The browser takes over the page without reloading it
    When the visitor opens "/" on the <mode> server
    And the visitor picks the active filter
    Then the page lists only the active todos
    And the page was not reloaded
    And the browser reported no errors

    Examples:
      | mode        |
      | development |
      | production  |
