Feature: Booking Home Page

Scenario: I want to verify Booking Hotels
    Given I navigate to Booking website
    When I open the home page and validate the Booking page title
    And I search for a destination <destination>
    Then Validate the Booking menu in home page
    And Validate the filters options are displayed

Examples:
    | destination                                    |
    | "Brooklyn, New York, United States of America" |
    | "San Francisco, California, United States of America" |
    | "Yucatán, Mexico" |

Scenario: I want to verify Booking Flights
    Given I navigate to Booking website
    When I open the home page and validate the Booking page title
    And I select the Flights tab
    And I fill the origin <origin> and destination <destination> flight
    Then Validate the flight options are displayed

Examples:
    | origin       | destination      |
    | "Bonneau, SC - (CHS)" | "Cali, Colombia (CLO-Alfonso Bonilla Aragon Intl.)" |
