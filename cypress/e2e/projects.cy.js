/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";

import { ProjectsPage } from "../support/pom/projects/Projects.page.js";
import { CreateProjectPage } from "../support/pom/projects/CreateProject.page.js";

describe('Projects Test Suite', () => {

  const loginPage = new LoginPage();
  const sideMenuPage = new SideMenuPage();
  const projectsPage = new ProjectsPage();
  const createProjectsPage = new CreateProjectPage();


  const timeStamp = new Date().getTime();
  const testText = 'test';

  beforeEach(() => {
    cy.visit('/');
    loginPage.login();
    sideMenuPage.openProjectsPage();
  });

  it('Create & Search Project via Projects List page', () => {
    const projectName = `Created Name - ${timeStamp}`;

    //create project
    createProjectsPage.createNewProject(projectName,timeStamp,testText);

    //search test
    projectsPage.searchProjects(testText);

   // projectsPage.btnFilterDate().click();

});

})