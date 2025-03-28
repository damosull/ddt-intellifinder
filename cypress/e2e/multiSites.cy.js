
/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";

import { MultiSitesPage } from "../support/pom/multisites/MultiSites.page";
import { CreateMultiSitesPage } from "../support/pom/multisites/CreateMultiSites.page";
import { UpdateMultiSitesPage } from "../support/pom/multisites/UpdateMultiSites.page";
import { DeleteMultiSitesPage } from "../support/pom/multisites/DeleteMultiSites.page";
import { AddSubSitePage } from "../support/pom/multisites/AddSubSite.page";


//describe represents the test script that will be run for this spec for this page and it takes two arguments, description and a callback function.
describe('MultiSites Test Suite', () => {

  //make an instance of the used classes
  const loginPage = new LoginPage();
  const sideMenuPage = new SideMenuPage();

  const multiSitesPage = new MultiSitesPage();
  const createMultiSitesPage = new CreateMultiSitesPage();
  const updateMultiSitesPage = new UpdateMultiSitesPage();
  const deleteMultiSitesPage = new DeleteMultiSitesPage();
  const addSubSitePage = new AddSubSitePage();

    //for creating a MultiSite & editing
  const timestamp = new Date().getTime();
  const searchName = 'test';
  const newTextEdit = 'new text addition';
  const latitude  = 55.6120128;
  const longitude = 12.6476789;

//each "it" section is an individual test that will be run it also takes two arguments, description and a callback. Before each "it" session is terminated, but if there is an error in first "It" it will just jump to the next one.
  beforeEach(() => {
    cy.visit('/');
    loginPage.login();
    sideMenuPage.openMultiSitesPage();
  });

  //creates a new site with a unique name and then searches for this specific MultiSite
  it('Test MultiSites', () => {
    const multiSiteName = `Created Name - ${searchName + timestamp}`;
    multiSitesPage.btnCreateMultiSites().click();
    createMultiSitesPage.createMultiSite(multiSiteName);
    
    multiSitesPage.btnGoBack().click(); // goes back to add new MultiSite
    multiSitesPage.btnGoBack().click(); //goes to view all MultiSites
    multiSitesPage.searchMultiSites(multiSiteName);

    updateMultiSitesPage.editMultiSites(multiSiteName,latitude,longitude,newTextEdit);

    multiSitesPage.searchMultiSites(multiSiteName);
    deleteMultiSitesPage.deleteMultiSite();
    multiSitesPage.verifyMultiSitesDeleted();

  })

    //creates a new site with a unique name and then searches for this specific MultiSite
    it.only('Test SubSites', () => {
      multiSitesPage.selectMultiSite(searchName);
      
      updateMultiSitesPage.addNewPlanDrawing();
      // updateMultiSitesPage.editPlanDrawing();

      // addSubSitePage.sltPSubSite();
      // addSubSitePage.addPSubSite();
  
      //multiSitesPage.btnCreateMultiSites().click();
      //createMultiSitesPage.createMultiSite(multiSiteName);
  
    })

})