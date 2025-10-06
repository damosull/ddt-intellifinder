import { ProjectsCommon } from './ProjectsCommon.page.js';

export class ProjectsPage {
    txtSearch = () => cy.get('[type="text"][placeholder="Search"]');

    chkSelectProject = () => cy.get('.projectCB');
    
    confirmationTitle = () => cy.get('.swal-title').contains('Are you sure?');
    btnClearSearch = () => cy.get('[class="btn btn-primary"][type="button"]')

    sltActions = () => cy.get('.actionsList');

    exportCsvButtons = () => cy.get('[title="Export task data"]');
    exportModal = () => cy.get('#exportTasksDataModal');

    selectExportSubjects = () => cy.get('.selection');
    selectExportOption = () => cy.get('.select2-results__options');
    
    btnSave = () => cy.get('[title="Save"]');
    btnCancel = () => cy.get('[title="Cancel"]');

    paginationLabel = () => cy.get('.label label-default');
    sltPaginationOptions = () => cy.get('[data-dashlane-rid="aea5cb3f64cb7861"]');

    projectNames = () => cy.get('tbody tr td:nth-child(2) a.orange');

    searchProjects(projectName) {
        this.txtSearch().should('be.visible');
        this.txtSearch().type(projectName + '{enter}');
        cy.wait(1000);
    }

    clickFirstProjectName() {
        cy.intercept('POST', '/api/Projects/project').as('projectDetails');
        cy.intercept('POST', '/api/Projects/projectDoctrine').as('projectDoctrine');
        this.projectNames().eq(0).click();
        cy.wait('@projectDoctrine').its('response.statusCode').should('eq', 200);
        cy.wait('@projectDetails').its('response.statusCode').should('eq', 200);
    }

    getFirstProjectName() {
        return this.projectNames().eq(0).invoke('text');
    }

    verifyProjectAppearsInTable(projectName) {
        this.projectNames(projectName)
            .should('be.visible')
            .and('contain.text', projectName);
    }

    selectFirstProject(){
        ProjectsCommon.selectProjectByIndex(0);
    }

    archiveProjects(){
        cy.selectAction('trash');
        cy.confirmAction('Yes');
    }

    exportCSVData(){
        cy.intercept('GET', /\/api\/Projects\/fields_list\?.*/).as('fieldsList');

        this.exportCsvButtons().eq(1).click();    
        cy.wait('@fieldsList').its('response.statusCode').should('eq', 200);
        this.exportModal().should('be.visible');

        this.selectExportSubjects().click();
        this.selectExportOption().contains(' Start date ').click();
        this.btnSave().click();

        cy.readFile('cypress/downloads/export.csv').should('exist');
        cy.readFile('cypress/downloads/export.csv').should('contain', 'Project;Site;Task');

        this.btnCancel().click();
        this.exportModal().should('not.be.visible');
    }

    clearProjectsSearch() {
        this.btnClearSearch().click();
        // Future Investigation:
        // In the HTML, the entered text that's visible on the UI isn't appearing. The below should be the right way, but it passes even if there is text in the field, so we need to investigate.
        // cy.get('[placeholder="Search"]').should('have.text', '');
    }
}