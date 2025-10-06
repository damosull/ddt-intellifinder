export class ProjectDetailsPage {
  txtProjectTitle = () => cy.get("h3");
  btnAddTask = () => cy.get('[title="Add task"]');
  btnProjectInformation = () => cy.get('[class="fas fa-info-circle"]'); // DAMO: this button is being used, keep
  btnEditProject = () => cy.get('[title="Edit project"]');

  txtDescription = () => cy.get(".note-editable");
  txtRefNumber = () => cy.get('[placeholder="Ref. number"]');

  btnSaveTask = () =>
    cy.get('[class="btn btn-success active mat-flat-button"]');
  toastProjectTasksCreated = () =>
    cy.get(".toast-text").contains("New task is created successfully.");

  openProjectInformationPopup() {
    this.btnProjectInformation().click();
  }

  openAddTaskPopup() {
    this.btnAddTask().click();
  }

  openEditProjectPage() {
    cy.intercept("POST", "/api/Projects/project").as("editProject");
    this.btnEditProject().click();

    cy.wait("@editProject").its("response.statusCode").should("eq", 200);
  }

  verifyProjectTitle(projectName) {
    this.txtProjectTitle()
      .should("be.visible")
      .and("contain.text", projectName);
  }
}
