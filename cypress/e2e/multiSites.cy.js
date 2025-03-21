
/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";

import { MultiSitesPage } from "../support/pom/multisites/MultiSites.page";

//describe represents the test script that will be run for this spec for this page and it takes two arguments, description and a callback function.
describe('MultiSites Test Suite', () => {

  //make an instance of the used classes
  const loginPage = new LoginPage();
  const sideMenuPage = new SideMenuPage();

  const multiSites = new MultiSitesPage();

  //const timestamp = new Date().getTime();
  const searchName = 'test';

  beforeEach(() => {
    cy.visit('/');
    loginPage.login();
    sideMenuPage.openMultiSitesPage();
  });

  //each "it" section is an individual test that will be run it also takes two arguments, description and a callback.
  it('Search MultiSites via MultiSites List page', () => {
    const siteName = `Created Name - ${searchName}`;
    multiSites.searchMultiSites(siteName);
  })
})