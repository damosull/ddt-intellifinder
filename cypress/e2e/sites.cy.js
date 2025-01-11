/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";
import { CreateSitePage } from "../support/pom/sites/createSite.page";

describe('Sites Test Suite', () => {
    const loginPage = new LoginPage();
    const sideMenuPage = new SideMenuPage();
    const createSitePage = new CreateSitePage();
    const timestamp = new Date().getTime();

    beforeEach(() => {
        cy.visit('/');
        loginPage.login();
        sideMenuPage.openSitesPage();
    });

    it('Create Site via the Sites page', () => {
        const siteName = `Created Name - ${timestamp}`;
        createSitePage.createSite(siteName);

        // Below are the steps I agreed with the client to do for this test. Please confirm your .createSite() function covers these steps.
        // Also, I have mentioned how to verify the site was created. You will need to implement this. If you believe additional verification is required, please include it.

        // Log in & go to main page
        // Go to Create new site page (Sites > Create new)
        // Enter Site name
        // Enter Latitude value
        // Enter Longitude value
        // Select Category
        // Select Site picture
        // Click ‘Save’ icon
        // Site saved pop-up is displayed
        // Verify site was created:
        // Go to Sites > List page
        // Search for Site name
        // Validate Lat & Long values

        // If you believe additional verification is required, please include it.
    });

    it('Search Site via Sites List page', () => {
        // Go to Sites > List page
        // Search based on Site name
        // Verify all sites displayed in the list contain the Site name value

        // If you believe additional verification is required, please include it.
    })

    it('Edit Site via Sites List page', () => {
        // Similar to Update Category - via the Sites list page, click Update button for the first record. Update some fields. Click save button. Verify values are updated
        // Go to Sites > List page
        // Click Edit button for a Site record
        // Update Site name, Latitude, Longitude, Category, & Site picture
        // Click ‘Save’ icon
        // Verify pop-up is displayed
        // Verify site was updated:
        // Go to Sites > List page
        // Search for Site name
        // Validate Site name, Latitude, Longitude, Category, & Site picture were updated

        // If you believe additional verification is required, please include it.
    });

    it('Delete Site via Sites List page:', () => {
        // Similar to Delete Category - via the Sites list page, click Delete button for the first record. Verify the record is deleted (that it does not exist in the table. You may need to enter the site name into the search field & click the Search button).
        // Go to Sites > List page
        // Click Delete button for a Site record
        // Confirm Deletion
        // Search for Site record
        // Validate Site record is no longer visible in the grid

        // If you believe additional verification is required, please include it.
    });






    // Investigate if the below tests can be automated. If they can, let me know & I'll check with the client if they want us to do them

    it('Search Sites via Sites list on map', () => {
        // In the side menu, there is a 'View all on map' option
        // If we go to that page, can you check if there is a response that contains longitude & latitude values? If there is, these values are what populates the map.
        // We can do something like this:
        // Go to the 'View all on map' page
        // Get the response
        // Check if the response contains longitude & latitude values
        // Verify the map loads (you can check how this can be done)

        // If you believe additional verification is required, please include it.
    });

    it('Search Sites via Sites > Nearest', () => {
        // There's a 'Nearest' option in the side menu
        // Investigate if/how this can be tested
        // Maybe something like:
        // Go to Sites > Nearest
        // Verify records are sorted based on distance (nearest 1st)

        // If you believe additional verification is required, please include it.
    });
});