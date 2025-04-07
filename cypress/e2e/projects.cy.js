/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";

import { ProjectsPage } from "../support/pom/projects/Projects.page.js";
import { CreateProjectsPage } from "../support/pom/projects/CreateProjects.page.js";
import { ArchiveProjectsPage } from "../support/pom/projects/ArchiveProjects.page.js";

describe('Projects Test Suite', () => {

  const loginPage = new LoginPage();
  const sideMenuPage = new SideMenuPage();
  const projectsPage = new ProjectsPage();
  const createProjectsPage = new CreateProjectsPage();
  const archiveProjectsPage = new ArchiveProjectsPage();

  const timeStamp = new Date().getTime();
  const testText = 'test';
  const searchName = 'Created Name';

  beforeEach(() => {
    cy.visit('/');
    loginPage.login();
    
  });

  it('Create, Search Project and Archive via Projects List page', () => {
    sideMenuPage.openProjectsPage();
    const projectName = `Created Name - ${timeStamp}`;

    //create project
    createProjectsPage.createNewProject(projectName,timeStamp,testText);

    //search test
    projectsPage.searchProjects(projectName);

    //select checkbox
    projectsPage.selectProjectCheckbox();

    //projectsPage.btnFilterDate().click();

    //use archive action on a selected project
    projectsPage.archiveProjects();

    projectsPage.searchProjectsClear();

});

// it.only('Delete Project via Archived Projects List page', () => {
//    sideMenuPage.openProjectsArchivePage();
//    archiveProjectsPage.searchArchivedProjects(searchName);

// });

})