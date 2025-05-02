export class CreateProjectsPage {
    btnAddProject = () => cy.get('[class="fas fa-plus"]');
     sltStartDate = () => cy.get(['id="project_startDate"']);
     txtProjectName = () => cy.get('input[class="form-control ng-untouched ng-pristine ng-valid"]');

     btnEmailInput = () => cy.get('[class="select2-selection select2-selection--multiple"][title="email recipents"]');
     sltEmailOptions = () => cy.get('[class="select2-results__option"]');
     txtDescriptionInput = () => cy.get('[class="note-editing-area"]');

     toastProjectCreated = () => cy.get('[id="toasty"]').contains('Project created.');

     btnSave = () => cy.get('[title="Save"]');

    createNewProject(projectName, timeStamp, testText) {
        this.btnAddProject().click();

        this.sltStartDate(timeStamp);
        this.txtProjectName().type(projectName);
        this.btnEmailInput().click();
        this.sltEmailOptions().eq(1).click();
        this.txtDescriptionInput().type(testText);

        cy.intercept('POST', '/api/Projects/new_project').as('saveRequest');
        this.btnSave().click();
        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);

        this.toastProjectCreated().should('be.visible');
        cy.wait(2000);
       
    }
}

