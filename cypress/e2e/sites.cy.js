/// <reference types="cypress" />
import { LoginPage } from "../pom/Login.page";
import { SideMenuPage } from "../pom/SideMenu.page";

describe('Sites Test Suite', () => {
    const loginPage = new LoginPage();
    const sideMenuPage = new SideMenuPage();

    beforeEach(() => {
        cy.visit('/');
        loginPage.login();
        sideMenuPage.openCategoriesPage(); // Reference 'openCategoriesPage()', create openSitesPage method & put it here
    });

    it('Create Site via the Sites page', () => {
        // Similar to Create Category test. Create a site (entering the required fields), click save button
        // Verify site is created (in the list)
    });

    // Note: In the side menu, where we are clicking (openSitesPage), there is a 'Create new' option. You can also create a site via that page. We may need to create another test for that.

    it('Update Site', () => {
        // Similar to Update Category - via the Sites list page, click Update button for the first record. Update some fields. Click save button. Verify values are updated
    });

    it('Delete Site', () => {
        // Similar to Delete Category - via the Sites list page, click Delete button for the first record. Verify the record is deleted (that it does not exist in the table. You may need to enter the site name into the search field & click the Search button).
    });

    // Investigate if the below tests can be automated. If they can, let me know & I'll check with the client if they want us to do them

    it('View all on  map', () => {
        // In the side menu, there is a 'View all on map' option
        // If we go to that page, can you check if there is a response that contains longitude & latitude values? If there is, these values are what populates the map.
        // We can do something like this:
        // Go to the 'View all on map' page
        // Get the response
        // Check if the response contains longitude & latitude values
        // Verify the map loads (you can check how this can be done)
    });

    it('Nearest', () => {
        // There's a 'Nearest' option in the side menu
        // Investigate if/how this can be tested
    });

});