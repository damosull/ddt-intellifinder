export class EditProjectPage {
  header = () => cy.get(".h3-padding");
  txtProjectName = () =>
    cy.get(":nth-child(3) > :nth-child(1) > .form-control");
  txtProjectDescription = () =>
    cy.get("[class='note-editable']");
  btnSave = () => cy.get('[title="Save"]');
  toastProjectUpdated = () =>
    cy.get('[id="toasty"]').contains("Project updated.");

  editProject(updatedProjectDescription) {
    cy.intercept("PUT", "/api/Projects/update_project").as("updateProject");
    this.txtProjectDescription().clear().type(updatedProjectDescription);
    this.btnSave().click();
    cy.wait("@updateProject").its("response.statusCode").should("eq", 200);
    this.toastProjectUpdated().should("be.visible");
  }
}
