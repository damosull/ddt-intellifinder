export class ProjectsCommon {
  static chkSelectProject = () => cy.get(".projectCB");
  static confirmationTitle = () =>
    cy.get(".swal-title").contains("Are you sure?");
  static toastProjectTaskCreated = () =>
    cy.get(".toast-text").contains("New task is created successfully.");

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
}
