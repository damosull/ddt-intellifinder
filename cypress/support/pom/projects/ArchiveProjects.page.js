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

    trashProjects(){
        this.btnSelectActions().select(2).should('have.value', 'trash');
        cy.wait(2000);
        this.confirmationTitle().should('be.visible');
        cy.contains('Yes').click();
    }
    restoreProject(){
        this.btnSelectActions().select(1).should('have.value', 'unarchive');
        cy.wait(2000);
        this.confirmationTitle().should('be.visible');
        cy.contains('Yes').click();
    }
}
