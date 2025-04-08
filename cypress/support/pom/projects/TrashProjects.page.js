export class TrashProjectsPage {
    txtSearch = () => cy.get('[type="text"][placeholder="Search"]');
    btnTableCheckbox = () => cy.get('input[class="projectCB"][type="checkbox"]');
    
    btnSelectActions = () => cy.get('div>select');
    confirmationTitle = () => cy.get('.swal-title').contains('Are you sure?');
    extraConfirmationTitle = () => cy.get('.swal-title').contains('Do you want to delete relevant tasks?');
   
    searchTrashedProjects(projectName) {
        cy.wait(2000);
        this.txtSearch().should('be.visible');
        this.txtSearch().clear().type(projectName + '{enter}');
        cy.wait(2000);
    }

    selectTrashedProject(){
        cy.wait(2000);
        this.btnTableCheckbox().eq(0).check();
    }

    restoreProject(){
        this.btnSelectActions().select(1).should('have.value', 'unarchive');
        cy.wait(2000);
        this.confirmationTitle().should('be.visible');
        cy.contains('Yes').click();

        cy.intercept('PUT', '/api/Projects/save_projects').as('saveRequest');
        cy.intercept('POST', '/api/Projects/projects_with_type').as('allProjects');

        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);
        cy.wait('@allProjects').its('response.statusCode').should('eq', 200);
    }

    archiveProjects(){
        this.btnSelectActions().select(2).should('have.value', 'archive');
        this.confirmationTitle().should('be.visible');
        cy.contains('Yes').click();

        cy.intercept('PUT', '/api/Projects/save_projects').as('saveRequest');
        cy.intercept('POST', '/api/Projects/projects_with_type').as('allProjects');

        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);
        cy.wait('@allProjects').its('response.statusCode').should('eq', 200);
    }

    deleteProject(){
        this.btnSelectActions().select(3).should('have.value', 'delete');
 
        this.confirmationTitle().should('be.visible');
        cy.contains('Yes').click();

        this.extraConfirmationTitle().should('be.visible');
        cy.contains('Yes').click();


        cy.intercept('PUT', '/api/Projects/save_projects').as('saveRequest');
        cy.intercept('POST', '/api/Projects/projects_with_type').as('allProjects');

        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);
        cy.wait('@allProjects').its('response.statusCode').should('eq', 200);
    }
}
