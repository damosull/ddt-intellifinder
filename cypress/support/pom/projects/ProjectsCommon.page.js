export class ProjectsCommon {
  static chkSelectProject = () => cy.get(".projectCB");
  static txtSearch = () => cy.get('[type="text"][placeholder="Search"]');
  static confirmationTitle = () =>
    cy.get(".swal-title").contains("Are you sure?");
  static toastProjectTaskCreated = () =>
    cy.get(".toast-text").contains("New task is created successfully.");
  static btnClearSearch = () =>
    cy.get('[class="btn btn-primary"][type="button"]');

  static selectProjectByIndex(index = 0) {
    cy.wait(1000);
    this.chkSelectProject().eq(index).check();
    this.chkSelectProject().eq(index).should("be.checked");
  }

  static selectMultipleProjects(count) {
    cy.wait(1000);
    this.chkSelectProject().should("have.length.at.least", count);

    for (let i = 0; i < count; i++) {
      this.chkSelectProject().eq(i).check();
      this.chkSelectProject().eq(i).should("be.checked");
    }
  }

  static searchProjects(projectName) {
    this.txtSearch().should("be.visible");
    this.txtSearch().type(projectName + "{enter}");
    cy.wait(1000);
  }

  static clearProjectsSearch() {
    this.btnClearSearch().click();
    // Future Investigation:
    // In the HTML, the entered text that's visible on the UI isn't appearing. The below should be the right way, but it passes even if there is text in the field, so we need to investigate.
    // cy.get('[placeholder="Search"]').should('have.text', '');
  }
}
