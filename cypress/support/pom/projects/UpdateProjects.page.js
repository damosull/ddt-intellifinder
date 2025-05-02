export class UpdateProjectsPage {
     btnEditProject = () => cy.get('[title="Edit project"]');
     sltEndDate = () => cy.get(['#project_endDate']);
     txtProjectName = () => cy.get('input[class="form-control ng-untouched ng-pristine ng-valid"]');

     //txtDescriptionInput = () => cy.get('[class="note-editing-area"]');
     //txtDescriptionInput = () => cy.get('[class="note-editable"]');
     
    sltCategory = () => cy.get('span[title="Link categories"]');
  
     btnSave = () => cy.get('[title="Save"]');
     toastProjectCreated = () => cy.get('[id="toasty"]').contains('Project updated.');

    editProject(projectName, timeStamp, newDate, testText) {
        cy.wait(2000);
        this.btnEditProject().click();
        cy.intercept('POST', '/api/Projects/project').as('editProject');
        
        cy.wait(100);
        cy.wait('@editProject').its('response.statusCode').should('eq', 200);

        this.sltEndDate(newDate);
        this.txtProjectName().clear().type(projectName + 'v2');
  
        ///this.txtDescriptionInput().clear().type(testText + ' - ' + timeStamp ,{force: true});

        cy.wait(100);
        this.sltCategory().click().type('Random'+ '{enter}');

        cy.intercept('POST', '/api/Projects/new_project').as('saveRequest');
        this.btnSave().click();
        this.toastProjectCreated().should('be.visible');
        //cy.wait(2000);
        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);

        cy.wait(2000);
    }
}
