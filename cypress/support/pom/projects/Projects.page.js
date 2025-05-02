export class ProjectsPage {
    txtSearch = () => cy.get('[type="text"][placeholder="Search"]');
   

    btnTableCheckbox = () => cy.get('input[class="projectCB"][type="checkbox"]');
    
    btnSelectActions = () => cy.get('div>select');
    confirmationTitle = () => cy.get('.swal-title').contains('Are you sure?');
    btnClearSearch = () => cy.get('[class="btn btn-primary"][type="button"]')

    
    // btnFilterSubject = () => cy.contains('Subject');
    // btnFilterStartDate = () => cy.contains('Start date');
    // btnFilterEndDate = () => cy.contains('End date');

    searchProjects(projectName) {
        this.txtSearch().should('be.visible');
        this.txtSearch().type(projectName + '{enter}');
        cy.wait(2000);
    }

    selectProjectCheckbox(){
        this.btnTableCheckbox().check();
    }

    archiveProjects(){
        this.btnSelectActions().select(1).should('have.value', 'archive');
  
        cy.wait(2000);
        this.confirmationTitle().should('be.visible');
        cy.contains('Yes').click();

    }

    searchProjectsClear() {
        this.btnClearSearch().click();
    }


    // filterDate(){
    //      this.btnFilterStartDate.click();
    // }
}