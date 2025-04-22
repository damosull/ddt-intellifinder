export class ProjectsPage {
    txtSearch = () => cy.get('[type="text"][placeholder="Search"]');

    btnTableCheckbox = () => cy.get('input[class="projectCB"][type="checkbox"]');
    
    btnSelectActions = () => cy.get('div>select');
    confirmationTitle = () => cy.get('.swal-title').contains('Are you sure?');
    btnClearSearch = () => cy.get('[class="btn btn-primary"][type="button"]')

    brnExportCSV = () => cy.get('[title="Export task data"]');

    searchProjects(projectName) {
        this.txtSearch().should('be.visible');
        this.txtSearch().type(projectName + '{enter}');
        cy.wait(2000);
    }

    // loadALlProjects(){
    //     cy.intercept('POST', '/api/Projects/projects_with_type').as('allProjects');
    //     cy.wait(200);
    //     cy.wait('@allProjects').its('response.statusCode').should('eq', 200);
    // }

    selectProjectCheckbox(){
        this.btnTableCheckbox().check();
    }

    archiveProjects(){
        this.btnSelectActions().select(1).should('have.value', 'archive');
        cy.wait(2000);
        
        this.confirmationTitle().should('be.visible');
        cy.contains('Yes').click();

        cy.intercept('PUT', '/api/Projects/save_projects').as('saveRequest');
        cy.intercept('POST', '/api/Projects/projects_with_type').as('allProjects');

        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);
        cy.wait('@allProjects').its('response.statusCode').should('eq', 200);
    }

    exportCSVData(){
        this.brnExportCSV().check();
    }

    searchProjectsClear() {
        this.btnClearSearch().click();
    }

}