export class ProjectDetailsPage {
    sltProject = () => cy.get('tr>td>a[class="orange"]');
    btnProjectInformation = () => cy.get('[class="btn btn-warning"]');
    btnEditProject = () => cy.get('[title="Edit project"]');

    txtProjectTitle = () => cy.get('h3');
    btnAddTask = () => cy.get('[class="fa fa-plus"]'); 

    selectedProjectName(){
        cy.wait(2000);
        return this.sltProject().eq(0).innerText;
    }

    selectProject(){
        cy.wait(2000);
        this.sltProject().eq(0).click();

        cy.intercept('POST', '/api/Projects/project').as('projectDetails');
        cy.intercept('POST', '/api/Projects/projectDoctrine').as('projectDoctrine');
        cy.wait(250);
        cy.wait('@projectDoctrine').its('response.statusCode').should('eq', 200);
        cy.wait('@projectDetails').its('response.statusCode').should('eq', 200);
    }

    pageTitle(projectName) {
        this.txtProjectTitle().should('be.visible').should('contain.text', projectName);
    }

    openInformationPopUp(projectName){
    }
}