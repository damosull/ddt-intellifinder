
/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";

import { MultiSitesPage } from "../support/pom/multisites/MultiSites.page";
import { CreateMultiSitesPage } from "../support/pom/multisites/CreateMultiSites.page";

//describe represents the test script that will be run for this spec for this page and it takes two arguments, description and a callback function.
describe('MultiSites Test Suite', () => {

  //make an instance of the used classes
  const loginPage = new LoginPage();
  const sideMenuPage = new SideMenuPage();

  const multiSitesPage = new MultiSitesPage();
  const createMultiSitesPage = new CreateMultiSitesPage();

  const timestamp = new Date().getTime();
  const searchName = 'test';

  beforeEach(() => {
    cy.visit('/');
    loginPage.login();
    sideMenuPage.openMultiSitesPage();
  });

  //each "it" section is an individual test that will be run it also takes two arguments, description and a callback.

  //creates a new site with a unique name and then searches for this specific MultiSite
  it('Create + Search MultiSites', () => {
    const multiSiteName = `Created Name - ${searchName + timestamp}`;
    multiSitesPage.btnCreateMultiSites().click();
    createMultiSitesPage.createMultiSite(multiSiteName);
    multiSitesPage.btnGoBack().click(); // goes back to add new MultiSite
    multiSitesPage.btnGoBack().click(); //goes to view all MultiSites
    multiSitesPage.searchMultiSites(multiSiteName);
  })
})