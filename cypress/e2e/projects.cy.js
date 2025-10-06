/// <reference types="cypress" />
import { deleteDownloadsFolderBeforeEach } from "cypress-delete-downloads-folder";

import { LoginPage } from "../support/pom/Login.page";
import { SideMenuPage } from "../support/pom/SideMenu.page";
import { ProjectsPage } from "../support/pom/projects/Projects.page.js";
import { CreateProjectsPage } from "../support/pom/projects/CreateProjects.page.js";
import { ArchiveProjectsPage } from "../support/pom/projects/ArchiveProjects.page.js";
import { TrashProjectsPage } from "../support/pom/projects/TrashProjects.page.js";
import { SortProjectsPage } from "../support/pom/projects/SortProjects.page.js";
import { ProjectDetailsPage } from "../support/pom/projects/ProjectDetails.page.js";
import { EditProjectPage } from "../support/pom/projects/EditProject.page.js";
import { ProjectInformationPopup } from "../support/pom/projects/ProjectInformationPopup.page.js";
import { AddTaskPopup } from "../support/pom/projects/AddTaskPopup.page.js";

describe("Projects Test Suite", () => {
  const loginPage = new LoginPage();
  const sideMenuPage = new SideMenuPage();

  const projectsPage = new ProjectsPage();
  const sortProjectsPage = new SortProjectsPage();
  const createProjectsPage = new CreateProjectsPage();
  const archiveProjectsPage = new ArchiveProjectsPage();
  const trashedProjectsPage = new TrashProjectsPage();

  const projectDetailsPage = new ProjectDetailsPage();
  const editProjectPage = new EditProjectPage();
  const projectInformationPopup = new ProjectInformationPopup();
  const addTaskPopup = new AddTaskPopup();

  const timeStamp = new Date().getTime();
  const testText = "test";
  const searchName = "Cypress Created Name";
  const sortedIconAsc = '[class="fooicon fooicon-sort-asc"]';
  const sortedIconDesc = '[class="fooicon fooicon-sort-desc"]';
  const columnSubjectIndex = 0;
  const columnStartDateIndex = 1;
  const columnEndDateIndex = 2;
  const taskName = "Cypress Created Task";

  deleteDownloadsFolderBeforeEach();

  beforeEach(() => {
    cy.visit("/");
    loginPage.login();
  });

  it("CSV Export", () => {
    sideMenuPage.openProjectsPage();
    projectsPage.exportCSVData();
  });

  it.only("Sort all columns on the Projects List page", () => {
    sideMenuPage.openProjectsPage();
    //initiate 'Subject' sorting check that it is acceding order
    sortProjectsPage.sortSubject(
      sortedIconAsc,
      sortedIconDesc,
      columnSubjectIndex
    );
    //initiate 'Start Date' sorting check that it is acceding order
    // sortProjectsPage.sortStartDate(
    //   sortedIconAsc,
    //   sortedIconDesc,
    //   columnStartDateIndex
    // );
    // //initiate 'End Date' sorting check that it is acceding order
    // sortProjectsPage.sortEndDate(
    //   sortedIconAsc,
    //   sortedIconDesc,
    //   columnEndDateIndex
    // );
  });

  it("Pagination", () => {
    sideMenuPage.openProjectsPage();
    // projectsPage.checkPagination();
  });

  //main project page actions
  it("Create, Search & Archive a Project via Projects List page", () => {
    const projectName = `Cypress Created Name - ${timeStamp}`;
    sideMenuPage.openProjectsPage();
    createProjectsPage.createNewProject(projectName, timeStamp, testText);
    projectsPage.searchProjects(projectName);
    projectsPage.verifyProjectAppearsInTable(projectName);
    projectsPage.selectFirstProject();
    projectsPage.archiveProjects();
    projectsPage.clearProjectsSearch();
  });

  // THIS TEST IS FULLY REFACTORED
  it("Trash Project via Archived Projects page", () => {
    sideMenuPage.openProjectsArchivePage();
    projectsPage.searchProjects(searchName);
    archiveProjectsPage.selectMultipleProjects(3);
    archiveProjectsPage.trashProjects();
  });

  // THIS TEST IS FULLY REFACTORED
  it("Restore Project via Archived Projects page", () => {
    sideMenuPage.openProjectsArchivePage();
    archiveProjectsPage.selectArchivedProject();
    trashedProjectsPage.restoreProject();
    projectsPage.clearProjectsSearch();
  });

  //trashed projects page
  // THIS TEST IS FULLY REFACTORED
  it("Restore Project via Trashed Projects page", () => {
    sideMenuPage.openProjectsTrashPage();
    projectsPage.searchProjects(searchName);
    trashedProjectsPage.selectTrashedProject();
    trashedProjectsPage.restoreProject();
    projectsPage.clearProjectsSearch();
  });

  // THIS TEST IS FULLY REFACTORED
  it("Archive Project via Trashed Projects page", () => {
    sideMenuPage.openProjectsTrashPage();
    projectsPage.searchProjects(searchName);
    trashedProjectsPage.selectTrashedProject();
    trashedProjectsPage.archiveProjects();
    projectsPage.clearProjectsSearch();
  });

  // THIS TEST IS FULLY REFACTORED
  it("Delete Project via Trashed Projects page", () => {
    sideMenuPage.openProjectsTrashPage();
    projectsPage.searchProjects(searchName);
    trashedProjectsPage.selectTrashedProject();
    trashedProjectsPage.deleteProject();
    projectsPage.clearProjectsSearch();
  });

  it("Verify Project Page Title", () => {
    sideMenuPage.openProjectsPage();
    projectsPage.searchProjects(searchName);
    projectsPage.getFirstProjectName().then((projectName) => {
      projectsPage.clickFirstProjectName();
      projectDetailsPage
        .txtProjectTitle()
        .should("be.visible")
        .and("contain.text", projectName);
    });
  });

  it("Verify Project Information Pop Up", () => {
    sideMenuPage.openProjectsPage();
    projectsPage.searchProjects(searchName);
    projectsPage.getFirstProjectName().then((projectName) => {
      projectsPage.clickFirstProjectName();
      projectDetailsPage.btnProjectInformation().click();
      projectInformationPopup.verifyProjectInformation(projectName);
    });
  });

  it("Add task to project using only required fields", () => {
    sideMenuPage.openProjectsPage();
    projectsPage.searchProjects(searchName);
    projectsPage.clickFirstProjectName();
    projectDetailsPage.btnAddTask().click(); // open function?
    addTaskPopup.header().should("be.visible").and("contain.text", "Add task");
    addTaskPopup.createTaskWithOnlyRequiredFields(taskName, timeStamp);
  });

  it("Add task to project using additional fields", () => {
    sideMenuPage.openProjectsPage();
    projectsPage.searchProjects(searchName);
    projectsPage.clickFirstProjectName();
    projectDetailsPage.btnAddTask().click();
    addTaskPopup.header().should("be.visible").and("contain.text", "Add task");
    addTaskPopup.createTaskWithRequiredFields(taskName, timeStamp);
    // TODO: Add more fields as part of this test
  });

  it("Edit a Project", () => {
    sideMenuPage.openProjectsPage();
    projectsPage.searchProjects(searchName);
    projectsPage.clickFirstProjectName();
    projectDetailsPage.openEditProjectPage();
    editProjectPage
      .header()
      .should("be.visible")
      .and("have.text", "Edit project");
    editProjectPage.editProject("updated name");
    // TODO: In above 'editProject', we need to update more fields as part of this test
    // TODO: We also need to search for the project and verify the updates were made via the UI
  });
});
