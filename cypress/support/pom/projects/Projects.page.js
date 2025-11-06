import { ProjectsCommon } from "./ProjectsCommon.page.js";

export class ProjectsPage {
  exportCsvButtons = () => cy.get('[title="Export task data"]');
  exportModal = () => cy.get("#exportTasksDataModal");

  selectExportSubjects = () => cy.get(".selection");
  selectExportOption = () => cy.get(".select2-results__options");
  btnSave = () => cy.get('[title="Save"]');
  btnCancel = () => cy.get('[title="Cancel"]');

  projectNames = () => cy.get("tbody tr td:nth-child(2) a.orange");

  pageLoaded() {
    cy.url().should("include", "/projects/list-projects/latest");
  }

  clickFirstProjectName() {
    cy.intercept("POST", "/api/Projects/project").as("projectDetails");
    cy.intercept("POST", "/api/Projects/projectDoctrine").as("projectDoctrine");
    this.projectNames().eq(0).click();
    cy.wait("@projectDoctrine", { timeout: 30000 })
      .its("response.statusCode")
      .should("eq", 200);
    cy.wait("@projectDetails").its("response.statusCode").should("eq", 200);
  }

  getFirstProjectName() {
    return this.projectNames().eq(0).invoke("text");
  }

  verifyProjectAppearsInTable(projectName) {
    this.projectNames(projectName)
      .should("be.visible")
      .and("contain.text", projectName);
  }

  selectFirstProject() {
    ProjectsCommon.selectProjectByIndex(0);
  }

  archiveProjects() {
    cy.selectAction("trash");
    cy.confirmAction("Yes");
  }

  exportCSVData() {
    cy.intercept("GET", /\/api\/Projects\/fields_list\?.*/).as("fieldsList");

    this.exportCsvButtons().eq(1).click();
    cy.wait("@fieldsList").its("response.statusCode").should("eq", 200);
    this.exportModal().should("be.visible");

    this.selectExportSubjects().click();
    this.selectExportOption().contains(" Start date ").click();
    this.btnSave().click();

    cy.readFile("cypress/downloads/export.csv").should("exist");
    cy.readFile("cypress/downloads/export.csv").should(
      "contain",
      "Project;Site;Task"
    );

    this.btnCancel().click();
    this.exportModal().should("not.be.visible");
  }
}
