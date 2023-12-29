class BookingHomePageObject{
    elements = {
        CarsMenu: () => cy.get('[data-bdd="cars"]'),
        FlightsMenu: () => cy.get('[data-bdd="flights"]'),
        Vacations: () => cy.get('[data-bdd="packages"]'),
        SearchBar: () => cy.get("input[data-bdd = 'farefinder-hotel-destination-input']"),
        FirstOption: () => cy.get("li.active > .active"),
        FindAHotelBtn: () => cy.get(".submit-button > .btn > .btn__label"),
        CalendarModal: () => cy.get('[data-bdd="farefinder-hotel-startdate-input"]'),
        Calendar: () => cy.get('[class="month multi simple"]'),
        Products: () => cy.get('[data-testid="product-tabs"]'),
        Filters: () => cy.get('[data-module="filters"]'),
        FlightsTab:() => cy.get('[data-bdd="farefinder-option-flights"]'),
        OriginCity:() => cy.get('[data-bdd="farefinder-flight-origin-input"]'),
        DestinationCity:() => cy.get('[data-bdd="farefinder-flight-destination-input"]'),
        ButtonFindFlights:() => cy.get('[data-bdd="farefinder-flight-search-button"]'),
        HeaderFlights:() => cy.get('[class="header-region"]'),
        FilterBySection:() => cy.get('[data-test-id="filter-container"]'),
    }

    ValidateMainPage() {
        this.elements.FlightsMenu().should('be.visible');
        this.elements.CarsMenu().should('be.visible');
        this.elements.Vacations().should('be.visible');
    }

    SearchDestination(destination) {
        this.elements.SearchBar().type(destination);

        this.elements.FirstOption().should('be.visible');
        this.elements.FirstOption().click();
        this.SetCurrentDayAndNextDay();
        this.elements.FindAHotelBtn().click();
    }

    SetCurrentDayAndNextDay() {
        const date = new Date();
        const today = date.getDate();

        const newDate = new Date();
        const tomorrow = new Date(newDate);
        tomorrow.setDate(newDate.getDate() - 2);

        this.elements.CalendarModal().click();
        this.elements.Calendar().eq(0).within(() => {
            cy.contains('div', today).click();
        })
        
        this.elements.Calendar().eq(1).within(() => {
            cy.contains('div', tomorrow.getDate()).click();
        })
    }

    FillFlightForm(origin, destination) {
        const firstDate = new Date();
        const departing = new Date(firstDate);
        departing.setDate(firstDate.getDate() + 2);
        
        const secondDate = new Date();
        const returning = new Date(secondDate);
        returning.setDate(secondDate.getDate() + 4);
        
        this.elements.OriginCity().type(origin);
        this.elements.FirstOption().click();
        this.elements.DestinationCity().type(destination);
        this.elements.FirstOption().click();
        cy.get('[data-bdd="farefinder-flight-startdate-input"]').click();
        this.elements.Calendar().eq(0).within(() => {
            cy.contains('div', departing.getDate()).click();
        })
        
        this.elements.Calendar().eq(1).within(() => {
            cy.contains('div', returning.getDate()).click();
        })
        this.elements.ButtonFindFlights().click();
    }

    SelectFlightsTab() {
        this.elements.FlightsTab().click();
    }

    ValidateTitle() {
        cy.title().should('include', 'Cheap Hotels, Cars, & Flights | Last Minute Travel Deals | Hotwire')
    }

    ValidateFilterOptions() {
        this.elements.Products.within(() => {
            cy.contains('span', 'Hotels').should('be.visible');
            cy.contains('div', 'Hot Rate').should('be.visible');
            cy.contains('div', 'Standard rate hotels').should('be.visible');
        });
        
        this.elements.Filters.within(() => {
            cy.contains('span', 'Sort by').should('be.visible');
            cy.contains('span', 'Price range').should('be.visible');
            cy.contains('span', 'Hotel class').should('be.visible');
            cy.contains('span', 'Amenities').should('be.visible');
            cy.contains('span', 'Areas').should('be.visible');
            cy.contains('span', 'Guest ratings').should('be.visible');
            cy.contains('span', 'Health and safety').should('be.visible');
        });
    }

    ValidateFlightsOptions() {
        this.elements.HeaderFlights().within(() => {
            cy.contains('a', 'Get the app').should('be.visible');
            cy.contains('button', 'Support').should('be.visible');
            cy.contains('a', 'My Account').should('be.visible');
        });
        this.elements.FilterBySection().eq(0).within(() => {
            cy.contains('legend', 'Stops').should('be.visible');
            cy.contains('legend', 'Airlines').should('be.visible');
        });
    }
}

module.exports = new BookingHomePageObject();