export class ProjectInformationPopup {
  header = () => cy.get('[class="modal-header"]');
  projectInformationDetails = () => cy.get(".row p");
  btnCloseProjectInfoPopup = () => cy.get(".customBtn");

  verifyProjectInformation(projectName) {
    this.header().should("be.visible").and("contain.text", projectName);
    this.projectInformationDetails().should("be.visible");
    this.projectInformationDetails().should("contain.text", "Start date");
    this.projectInformationDetails().should("contain.text", "End date");
    this.projectInformationDetails().should(
      "contain.text",
      "Created by support intellifinder TESTING"
    );
    this.projectInformationDetails().should("contain.text", "Description");
    this.btnCloseProjectInfoPopup().click();
  }
}
