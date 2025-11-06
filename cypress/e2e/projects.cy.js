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
import { ProjectsCommon } from "../support/pom/projects/ProjectsCommon.page.js";

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
  const projectDescription = "test";
  const searchName = "Cypress Created Name";
  const taskName = "Cypress Created Task";

  deleteDownloadsFolderBeforeEach();

  beforeEach(() => {
    cy.visit("/");
    loginPage.login();
  });

  describe("Projects List Page", () => {
    it("CSV Export", () => {
      sideMenuPage.openProjectsPage();
      projectsPage.exportCSVData();

      // IMPROVEMENT: Investigate the CSV file content is as expected
    });

    it("Sort by Subject column", () => {
      sideMenuPage.openProjectsPage();
      sortProjectsPage.sortSubject();

      // IMPROVEMENT: Investigate this test, refactor & move functionality to ProjectsPage()
    });

    it("Sort by Start Date column", () => {
      sideMenuPage.openProjectsPage();
      sortProjectsPage.sortStartDate();

      // IMPROVEMENT: Investigate this test, refactor & move functionality to ProjectsPage()
    });

    it("Sort by End Date column", () => {
      sideMenuPage.openProjectsPage();
      sortProjectsPage.sortEndDate();

      // FAILURE - need to investigate
      // IMPROVEMENT: Investigate this test, refactor & move functionality to ProjectsPage()
    });

    it.skip("Pagination", () => {
      sideMenuPage.openProjectsPage();

      // IMPROVEMENT: Add steps to test projectsPage.checkPagination();
    });

    it("Create, Search & Archive a Project via Projects List page", () => {
      const projectName = `Cypress Created Name - ${timeStamp}`;
      sideMenuPage.openProjectsPage();
      createProjectsPage.createNewProject(
        projectName,
        timeStamp,
        projectDescription
      );
      ProjectsCommon.searchProjects(projectName);
      projectsPage.verifyProjectAppearsInTable(projectName);
      projectsPage.selectFirstProject();
      projectsPage.archiveProjects();
      ProjectsCommon.clearProjectsSearch();

      // IMPROVEMENT: In 'archiveProjects' above, API response is validated, but we need to verify on the UI as well
    });
  });

  describe("Archived Projects Page", () => {
    it("Trash Project", () => {
      sideMenuPage.openProjectsArchivePage();
      ProjectsCommon.searchProjects(searchName);
      archiveProjectsPage.selectMultipleProjects(3);
      archiveProjectsPage.trashProjects();
      // IMPROVEMENT: In 'trashProjects' above, API response is validated, but we need to verify on the UI as well
    });

    it("Restore Project", () => {
      sideMenuPage.openProjectsArchivePage();
      archiveProjectsPage.selectArchivedProject();
      trashedProjectsPage.restoreProject();
      // IMPROVEMENT: In 'restoreProject' above, API response is validated, but we need to verify on the UI as well
    });
  });

  describe("Trashed Projects Page", () => {
    it("Restore Project", () => {
      sideMenuPage.openProjectsTrashPage();
      ProjectsCommon.searchProjects(searchName);
      trashedProjectsPage.selectTrashedProject();
      trashedProjectsPage.restoreProject();

      // IMPROVEMENT: In 'restoreProject' above, API response is validated, but we need to verify on the UI as well
    });

    it("Archive Project", () => {
      sideMenuPage.openProjectsTrashPage();
      ProjectsCommon.searchProjects(searchName);
      trashedProjectsPage.selectTrashedProject();
      trashedProjectsPage.archiveProjects();

      // IMPROVEMENT: In archiveProjects() above, API response is validated, but we need to verify on the UI as well
    });

    it("Delete Project", () => {
      sideMenuPage.openProjectsTrashPage();
      ProjectsCommon.searchProjects(searchName);
      trashedProjectsPage.selectTrashedProject();
      trashedProjectsPage.deleteProject();

      // IMPROVEMENT: In 'deleteProject' above, API response is validated, but we need to verify on the UI as well
    });
  });

  describe("Project Details", () => {
    it("Verify Project Page Title", () => {
      sideMenuPage.openProjectsPage();
      ProjectsCommon.searchProjects(searchName);
      projectsPage.getFirstProjectName().then((projectName) => {
        projectsPage.clickFirstProjectName();
        projectDetailsPage.verifyProjectTitle(projectName);
      });
    });

    it("Verify Project Information Pop Up", () => {
      sideMenuPage.openProjectsPage();
      ProjectsCommon.searchProjects(searchName);
      projectsPage.getFirstProjectName().then((projectName) => {
        projectsPage.clickFirstProjectName();
        projectDetailsPage.openProjectInformationPopup();
        projectInformationPopup.verifyProjectInformation(projectName);

        // IMPROVEMENT: In 'verifyProjectInformation', we need to verify more info if possible via the UI
      });
    });

    it("Add task to project using only required fields", () => {
      sideMenuPage.openProjectsPage();
      ProjectsCommon.searchProjects(searchName);
      projectsPage.clickFirstProjectName();
      projectDetailsPage.openAddTaskPopup();
      addTaskPopup.verifyPopupIsOpen();
      addTaskPopup.createTaskWithOnlyRequiredFields(taskName, timeStamp);

      // FAILURE: Test fails when we try to add a task. To add a task, we need to select a 'Site', but I don't know what to search for
      // IMPROVEMENT: We also need to search for the project and verify the updates were made via the UI
    });

    it("Add task to project using additional fields", () => {
      sideMenuPage.openProjectsPage();
      ProjectsCommon.searchProjects(searchName);
      projectsPage.clickFirstProjectName();
      projectDetailsPage.openAddTaskPopup();
      addTaskPopup.verifyPopupIsOpen();
      addTaskPopup.createTaskWithRequiredFields(taskName, timeStamp);

      // FAILURE: Test fails when we try to add a task. To add a task, we need to select a 'Site', but I don't know what to search for
      // IMPROVEMENT: Add more fields as part of this test
      // IMPROVEMENT: We also need to search for the project and verify the updates were made via the UI
    });

    it("Edit a Project", () => {
      sideMenuPage.openProjectsPage();
      ProjectsCommon.searchProjects(searchName);
      projectsPage.clickFirstProjectName();
      projectDetailsPage.openEditProjectPage();
      editProjectPage
        .header()
        .should("be.visible")
        .and("have.text", "Edit project");
      editProjectPage.editProject("updated name");

      // IMPROVEMENT: In above 'editProject', we need to update more fields as part of this test
      // IMPROVEMENT: We need to search for the project and verify the updates were made via the UI
    });
  });
});
