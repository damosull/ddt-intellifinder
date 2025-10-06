import { ProjectsCommon } from "./ProjectsCommon.page.js";

export class AddTaskPopup {
  header = () => cy.get("h1");
  txtSubjectName = () => cy.get('[placeholder="Subject"]');
  sltSite = () => cy.get('[aria-label="Site"]');
  sltSiteOption = () => cy.get('[id="searchField"]');
  sltOptionDropDown = () => cy.get('[class="mat-option ng-star-inserted"]');
  txtDescription = () => cy.get(".note-editable");
  txtRefNumber = () => cy.get('[placeholder="Ref. number"]');
  btnSave = () => cy.get('[class="btn btn-success active mat-flat-button"]');

  createTaskWithRequiredFields(taskName, timeStamp) {
    this.txtSubjectName().type(taskName + timeStamp + "{enter}");
    this.sltSite().click();
    this.sltSiteOption().type("Test" + "{enter}");
    this.sltOptionDropDown().eq(0).click();
    this.txtDescription().type(taskName + " - My Desc Test");
    this.txtRefNumber().type(8888);

    cy.intercept("POST", "/api/task/new_task").as("newProjectTask");
    cy.intercept("POST", "/api/services/my_tasks_optimised").as(
      "reloadProjectTasks"
    );
    cy.intercept("POST", "/api/services/countTaskSearchResults").as(
      "countProjectTasks"
    );

    this.btnSave().click();
    cy.wait("@newProjectTask").its("response.statusCode").should("eq", 200);
    ProjectsCommon.toastProjectTaskCreated().should("be.visible");
    cy.wait("@countProjectTasks").its("response.statusCode").should("eq", 200);
    cy.wait("@reloadProjectTasks").its("response.statusCode").should("eq", 200);
  }

  createTaskWithOnlyRequiredFields(taskName, timeStamp) {
    cy.intercept("POST", "/api/task/new_task").as("newProjectTask");
    cy.intercept("POST", "/api/services/my_tasks_optimised").as(
      "reloadProjectTasks"
    );
    cy.intercept("POST", "/api/services/countTaskSearchResults").as(
      "countProjectTasks"
    );

    this.txtSubjectName().type(
      taskName + "- Essentials only - " + timeStamp + "{enter}"
    );
    this.sltSite().click();
    this.sltSiteOption().type("Test" + "{enter}");
    this.sltOptionDropDown().eq(0).click();
    this.btnSave().click();
    cy.wait("@newProjectTask").its("response.statusCode").should("eq", 200);
    ProjectsCommon.toastProjectTaskCreated().should("be.visible");
    cy.wait("@countProjectTasks").its("response.statusCode").should("eq", 200);
    cy.wait("@reloadProjectTasks").its("response.statusCode").should("eq", 200);
  }
}
