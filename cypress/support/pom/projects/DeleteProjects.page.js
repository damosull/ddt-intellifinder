export class DeleteProjectsPage {
    btnTableCheckbox = () => cy.get('input[class="projectCB"][type="checkbox"]');
    
    btnSelectActions = () => cy.get('div>select');
    confirmationTitle = () => cy.get('.swal-title').contains('Are you sure?');

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
}
