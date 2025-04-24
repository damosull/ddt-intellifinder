export class ArchiveProjectsPage {
    txtSearch = () => cy.get('[type="text"][placeholder="Search"]');
    btnTableCheckbox = () => cy.get('input[class="projectCB"][type="checkbox"]');
    
    btnSelectActions = () => cy.get('div>select');
    confirmationTitle = () => cy.get('.swal-title').contains('Are you sure?');

    selectArchivedProject(){
        cy.wait(2000);
        this.btnTableCheckbox().eq(0).check();
    }

    selectSeveralArchivedProject(){
        this.btnTableCheckbox().eq(0).check();
        this.btnTableCheckbox().eq(1).check();
        this.btnTableCheckbox().eq(2).check();
    }

    trashProjects(){
        
        this.btnSelectActions().select(2).should('have.value', 'trash');
        
        this.confirmationTitle().should('be.visible');

        cy.intercept('PUT', '/api/Projects/save_projects').as('saveRequest');
        cy.intercept('POST', '/api/Projects/projects_with_type').as('allProjects');
        cy.contains('Yes').click();
        cy.wait(100);
        
        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);
        cy.wait('@allProjects').its('response.statusCode').should('eq', 200);
        
    }
}
