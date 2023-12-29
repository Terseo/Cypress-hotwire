import { When, Then, Given, DataTable} from "@badeball/cypress-cucumber-preprocessor";
import BookingHomePageObject from "../../Pages/HotWireHomePageObject";

beforeEach(() => {
    cy.viewport(1600, 720);
});

Given("I navigate to Booking website", function() {
    cy.visit("https://www.hotwire.com/");
});

When("I open the home page and validate the Booking page title", () => {
    BookingHomePageObject.ValidateTitle();
});

When('I search for a destination {string}', (destination) => {
    BookingHomePageObject.SearchDestination(destination);
});

When("I select the Flights tab", () => {
    BookingHomePageObject.SelectFlightsTab();
});

When('I fill the origin {string} and destination {string} flight', (origin, destination) => {
    BookingHomePageObject.FillFlightForm(origin, destination);
});

Then("Validate the Booking menu in home page", () => {
    BookingHomePageObject.ValidateMainPage();
});

Then("Validate the filters options are displayed", () => {
    BookingHomePageObject.ValidateFilterOptions();
});

Then("Validate the flight options are displayed", () => {
    BookingHomePageObject.ValidateFlightsOptions();
});
