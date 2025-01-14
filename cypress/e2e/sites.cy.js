/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";
import { CreateSitePage } from "../support/pom/sites/CreateSite.page";
import { UpdateSitePage } from "../support/pom/sites/UpdateSite.page";
import { DeleteSitePage } from "../support/pom/sites/DeleteSite.page";
import { SitesPage } from "../support/pom/sites/Sites.page";

describe('Sites Test Suite', () => {
    const loginPage = new LoginPage();
    const sideMenuPage = new SideMenuPage();
    const createSitePage = new CreateSitePage();
    const updateSitePage = new UpdateSitePage();
    const deleteSitePage = new DeleteSitePage();
    const sitePage = new SitesPage();

    const timestamp = new Date().getTime();
    const longitude = -74.005974;
    const latitude = 40.712776;

    beforeEach(() => {
        cy.visit('/');
        loginPage.login();
        sideMenuPage.openSitesPage();
    });

    it('Create & Search Site via Sites List page', () => {
        const siteName = `Created Name - ${timestamp}`;
        createSitePage.createSite(siteName, latitude, longitude);
        sitePage.searchSite(siteName, latitude, longitude);
    })

    it('Edit Site via Sites List page', () => {
        const siteName = `Site to be updated - ${timestamp}`;
        const updatedSiteName = `Updated Site - ${timestamp}`;
        createSitePage.createSite(siteName, latitude, longitude);
        let updatedLatitude = 35.689487;
        let updatedLongitude = 139.691711;
        sitePage.searchSite(siteName, latitude, longitude);
        updateSitePage.updateSite(updatedSiteName, updatedLatitude, updatedLongitude)
        sitePage.searchSite(updatedSiteName, updatedLatitude, updatedLongitude)
    });

    it('Delete Site via Sites List page:', () => {
        const siteName = `Site to be deleted - ${timestamp}`;
        createSitePage.createSite(siteName, latitude, longitude);
        sitePage.searchSite(siteName, latitude, longitude);
        deleteSitePage.deleteSite()
        sitePage.searchSiteWithNoResults(siteName);
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