/// <reference types="cypress" />
import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";

import { ProjectsPage } from "../support/pom/projects/Projects.page.js";
import { CreateProjectsPage } from "../support/pom/projects/CreateProjects.page.js";
import { ArchiveProjectsPage } from "../support/pom/projects/ArchiveProjects.page.js";
import { TrashProjectsPage } from "../support/pom/projects/TrashProjects.page.js";
import { SortProjectsPage } from "../support/pom/projects/SortProjects.page.js";
import { ProjectDetailsPage } from "../support/pom/projects/ProjectDetails.page.js"

describe('Projects Test Suite', () => {

  const loginPage = new LoginPage();
  const sideMenuPage = new SideMenuPage();

  const projectsPage = new ProjectsPage();
  const sortProjectsPage = new SortProjectsPage();
  const createProjectsPage = new CreateProjectsPage();
  const archiveProjectsPage = new ArchiveProjectsPage();
  const trashedProjectsPage = new TrashProjectsPage();

  const projectDetailsPage = new ProjectDetailsPage();


  const timeStamp = new Date().getTime();
  const testText = 'test';
  const searchName = 'Cypress Created Name';
  const sortedIconAsc = '[class="fooicon fooicon-sort-asc"]';
  const sortedIconDesc = '[class="fooicon fooicon-sort-desc"]';
  const columnSubjectIndex = 0;
  const columnStartDateIndex = 1;
  const columnEndDateIndex = 2;
  const taskName = 'Cypress Created Task';

  beforeEach(() => {
    cy.visit('/');
    loginPage.login();
    
  });

it('Sort all columns, export csv and check pagination Projects List page', () => {
    sideMenuPage.openProjectsPage();

    projectsPage.exportCSVData();
    
    //check load data
    // projectsPage.loadALlProjects();

    //initiate 'Subject' sorting check that it is acceding order
    sortProjectsPage.sortSubject(sortedIconAsc, sortedIconDesc, columnSubjectIndex);

    //initiate 'Start Date' sorting check that it is acceding order
    sortProjectsPage.sortStartDate(sortedIconAsc, sortedIconDesc, columnStartDateIndex);

    //initiate 'End Date' sorting check that it is acceding order
    sortProjectsPage.sortEndDate(sortedIconAsc, sortedIconDesc, columnEndDateIndex);

});

it('Create, Search Project and Archive via Projects List page', () => {
    sideMenuPage.openProjectsPage();
    const projectName = `Cypress Created Name - ${timeStamp}`;

    //create project
    createProjectsPage.createNewProject(projectName,timeStamp,testText);

    //search test, select checkbox and use archive action on a selected project then clear search
    projectsPage.searchProjects(projectName);
    projectsPage.selectProjectCheckbox();
    projectsPage.archiveProjects();
    projectsPage.searchProjectsClear();

});

//archived page
it('Trash and Restore Project via Archived Projects page', () => {
   sideMenuPage.openProjectsArchivePage();

   //trash project 
   projectsPage.searchProjects(searchName);
   archiveProjectsPage.selectSeveralArchivedProject();
   archiveProjectsPage.trashProjects();

   //restore project
   archiveProjectsPage.selectArchivedProject();
   trashedProjectsPage.restoreProject();
   projectsPage.searchProjectsClear();

});

//trashed projects page    
it('Archive and Restore Project via Trashed Projects page', () => {
  sideMenuPage.openProjectsTrashPage();

  //restore project
  projectsPage.searchProjects(searchName);
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

//Project Details page    
it.only('Project Details via Task Page', () => {
  sideMenuPage.openProjectsPage();

  projectsPage.searchProjects(searchName);
 
  //save the name of the project with index 0 before selecting it, so we can do verifications
  projectDetailsPage.sltProject().eq(0).invoke('text').then((selectedProject) => {
    //cy.log('Selected Project:', selectedProject);

     //go to project Details page -- So it in another place -> Task List page 
    // Now proceed to select and validate
    projectDetailsPage.selectProject();
    projectDetailsPage.pageTitle(selectedProject.trim());
    projectDetailsPage.openInformationPopUp(selectedProject.trim());

    projectDetailsPage.addNewTaskToProjectEssentials(taskName,timeStamp);
    //projectDetailsPage.addNewTaskToProjectNoForms(taskName,timeStamp);
    //projectDetailsPage.addNewTaskToProjectWithForm(taskName,timeStamp);
    //projectDetailsPage.addNewTaskToProjectPeriodic(taskName,timeStamp);


  });
});

})