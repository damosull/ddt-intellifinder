export class ProjectDetailsPage {
    //General Project Detail Page
    sltProject = () => cy.get('tr>td>a[class="orange"]');
    txtProjectTitle = () => cy.get('h3');
    btnAddTask = () => cy.get('[title="Add task"]');
    btnProjectInformation = () => cy.get('[class="fas fa-info-circle"]');
    btnEditProject = () => cy.get('[title="Edit project"]');

    //info  Pop Up
    txtPopUpInfoProjectTitle = () => cy.get('[class="modal-header"]');
    txtPopUpInfoDates = () => cy.get('div>p>span');
    txtPopUpInfoEmail = () => cy.get('div>p>a');
    txtPopUpInfoDescription = () => cy.get('div>p>b');
    btnCancelPopUp = () => cy.get('[class="btn btn-danger customBtn"]');
    
    //Add Task Pop Up
    txtPopUpNewTask = () => cy.get('h1');
    sltSite = () => cy.get('.mat-form-field-infix');
    sltSiteOption = () => cy.get('[class="mat-option ng-star-inserted"]');

    selectedProjectName(){
        cy.wait(2000);
        return this.sltProject().eq(0).innerText;
    }

    selectProject(){
        cy.wait(2000);
        this.sltProject().eq(0).click();

        // cy.intercept('POST', '/api/Projects/project').as('projectDetails');
        // cy.intercept('POST', '/api/Projects/projectDoctrine').as('projectDoctrine');
        // cy.wait(2000);
        // cy.wait('@projectDoctrine').its('response.statusCode').should('eq', 200);
        // cy.wait('@projectDetails').its('response.statusCode').should('eq', 200);
        cy.wait(2000);
    }

    pageTitle(projectName) {
        this.txtProjectTitle().should('be.visible').should('contain.text', projectName);
    }

    openInformationPopUp(projectName){
        this.btnProjectInformation().click();
        cy.wait(300);
        this.txtPopUpInfoProjectTitle().should('be.visible').should('contain.text', projectName);
        this.txtPopUpInfoDates().should('be.visible');
        this.txtPopUpInfoEmail().should('be.visible');
        this.txtPopUpInfoDescription().should('be.visible');
        
        this.btnCancelPopUp().click();
    }

    addNewTaskToProject(){
        this.btnAddTask().click();

        this.txtPopUpNewTask().should('be.visible').should('contain.text', 'Add task');
        this.sltSite().click().type('Default'+ '{enter}');
        // cy.wait(1000);
        // this.sltSiteOption().eq(0).click();

    }
}