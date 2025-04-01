/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";

import { ProjectsPage } from "../support/pom/projects/Projects.page.js";

describe('Projects Test Suite', () => {

  const loginPage = new LoginPage();
  const sideMenuPage = new SideMenuPage();
  const projectsPage = new ProjectsPage();

  const timestamp = new Date().getTime();
  const testName = 'Test';

  beforeEach(() => {
    cy.visit('/');
    loginPage.login();
    sideMenuPage.openProjectsPage();
  });




     projectsPage.btnFilterDate().click();

})