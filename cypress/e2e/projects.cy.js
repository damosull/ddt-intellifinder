/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";

import { ProjectsPage } from "../support/pom/projects/Projects.page.js";
import { CreateProjectsPage } from "../support/pom/projects/CreateProjects.page.js";
import { ArchiveProjectsPage } from "../support/pom/projects/ArchiveProjects.page.js";
import { TrashProjectsPage } from "../support/pom/projects/TrashProjects.page.js";
import { SortProjectsPage } from "../support/pom/projects/SortProjects.page.js";

describe('Projects Test Suite', () => {

  const loginPage = new LoginPage();
  const sideMenuPage = new SideMenuPage();
  const projectsPage = new ProjectsPage();
  const sortProjectsPage = new SortProjectsPage();
  const createProjectsPage = new CreateProjectsPage();
  const archiveProjectsPage = new ArchiveProjectsPage();
  const trashedProjectsPage = new TrashProjectsPage();

  const timeStamp = new Date().getTime();
  const testText = 'test';
  const searchName = 'Created Name';
  const sortedIconAsc = '[class="fooicon fooicon-sort-asc"]';
  const sortedIconDesc = '[class="fooicon fooicon-sort-desc"]';
  const columnSubjectIndex = 0;
  const columnStartDateIndex = 1;
  const columnEndDateIndex = 2;

  beforeEach(() => {
    cy.visit('/');
    loginPage.login();
    
  });

it('Sort all columns, export csv and check pagination Projects List page', () => {
    sideMenuPage.openProjectsPage();

    //check load data
    // projectsPage.loadALlProjects();

    //initiate 'Subject' sorting check that it is acceding order
    sortProjectsPage.sortSubject(sortedIconAsc, sortedIconDesc, columnSubjectIndex);

    //initiate 'Start Date' sorting check that it is acceding order
    sortProjectsPage.sortStartDate(sortedIconAsc, sortedIconDesc, columnStartDateIndex);

    //initiate 'End Date' sorting check that it is acceding order
    sortProjectsPage.sortEndDate(sortedIconAsc, sortedIconDesc, columnEndDateIndex);

    // projectsPage.paginationChange();

    projectsPage.exportCSVData();



});

it('Create, Search Project and Archive via Projects List page', () => {
    sideMenuPage.openProjectsPage();
    const projectName = `Created Name - ${timeStamp}`;

    //create project
    createProjectsPage.createNewProject(projectName,timeStamp,testText);

    //search test, select checkbox and use archive action on a selected project then clear search
    projectsPage.searchProjects(projectName);
    projectsPage.selectProjectCheckbox();
    projectsPage.archiveProjects();
    projectsPage.searchProjectsClear();

});

it('Trash and Restore Project via Archived Projects page', () => {
   sideMenuPage.openProjectsArchivePage();

   //trash project 
   archiveProjectsPage.searchArchivedProjects(searchName);
   archiveProjectsPage.selectSeveralArchivedProject();
   archiveProjectsPage.trashProjects();
   projectsPage.searchProjectsClear();

   //restore project
   archiveProjectsPage.selectArchivedProject();
   archiveProjectsPage.restoreProject();
   projectsPage.searchProjectsClear();
});

it('Archive and Restore Project via Trashed Projects page', () => {
  sideMenuPage.openProjectsTrashPage();

  //restore project
  trashedProjectsPage.searchTrashedProjects(searchName);
  trashedProjectsPage.selectTrashedProject();
  trashedProjectsPage.restoreProject();

  //archive project
  trashedProjectsPage.selectTrashedProject();
  trashedProjectsPage.archiveProjects();

  //delete project
  trashedProjectsPage.selectTrashedProject();
  trashedProjectsPage.deleteProject();
  projectsPage.searchProjectsClear();

});

})