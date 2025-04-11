/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";

import { CreateSitePage } from "../support/pom/sites/CreateSite.page";
import { UpdateSitePage } from "../support/pom/sites/UpdateSite.page";
import { DeleteSitePage } from "../support/pom/sites/DeleteSite.page";
import { SitesPage } from "../support/pom/sites/Sites.page";
import { SitesMapPage } from "../support/pom/sites/SitesMap.page";
import { SitesNearestPage } from "../support/pom/sites/SitesNearest.page";

describe('Sites Test Suite', () => {
    const loginPage = new LoginPage();
    const sideMenuPage = new SideMenuPage();

    const createSitePage = new CreateSitePage();
    const updateSitePage = new UpdateSitePage();
    const deleteSitePage = new DeleteSitePage();
    const sitePage = new SitesPage();
    const sitesMapPage = new SitesMapPage();
    const sitesNearestPage = new SitesNearestPage();

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

    it('Search Sites via Sites list on map', () => {
        sitesMapPage.openAndVerifySiteData();
        sitesMapPage.pageTitle().should('be.visible');
    });

    it('Search Sites via Sites > Nearest - verify distances are in ascending order', () => {
        sitesNearestPage.openAndVerifyDistancesInAscendingOrder()
    });
});