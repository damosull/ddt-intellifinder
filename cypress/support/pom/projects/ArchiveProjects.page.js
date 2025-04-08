export class ArchiveProjectsPage {
    txtSearch = () => cy.get('[type="text"][placeholder="Search"]');
    btnTableCheckbox = () => cy.get('input[class="projectCB"][type="checkbox"]');
    
    btnSelectActions = () => cy.get('div>select');
    confirmationTitle = () => cy.get('.swal-title').contains('Are you sure?');

    searchArchivedProjects(projectName) {
        cy.wait(2000);
        this.txtSearch().should('be.visible');
        this.txtSearch().clear().type(projectName + '{enter}');
        cy.wait(2000);
    }

    selectArchivedProject(){
        this.btnTableCheckbox().eq(0).check();
    }

    selectSeveralArchivedProject(){
        this.btnTableCheckbox().eq(0).check();
        this.btnTableCheckbox().eq(1).check();
        this.btnTableCheckbox().eq(2).check();
    }

    restoreProject(){
        cy.intercept('PUT', '/api/Projects/save_projects').as('saveRequest');
        this.btnSelectActions().select(1).should('have.value', 'unarchive');
        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);

        
        cy.intercept('POST', '/api/Projects/projects_with_type').as('allProjects');
        cy.wait('@allProjects').its('response.statusCode').should('eq', 200);

        this.confirmationTitle().should('be.visible');
        cy.contains('Yes').click();
    }

    trashProjects(){
        cy.intercept('PUT', '/api/Projects/save_projects').as('saveRequest');
        this.btnSelectActions().select(2).should('have.value', 'trash');
        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);

        
        cy.intercept('POST', '/api/Projects/projects_with_type').as('allProjects');
        cy.wait('@allProjects').its('response.statusCode').should('eq', 200);

        this.confirmationTitle().should('be.visible');
        cy.contains('Yes').click();
        
    }
}
