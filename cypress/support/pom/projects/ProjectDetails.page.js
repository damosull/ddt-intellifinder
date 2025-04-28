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
    sltSite = () => cy.get('#mat-select-0');
    sltSiteOption = () => cy.get('[id="searchField"]');
    sltSiteOptionDropDown = () => cy.get('#mat-option-11');

    
    txtSubjectName = () => cy.get('#mat-input-4');
    txtDescription = () => cy.get('.note-editable');
    sltDebitorInput = () => cy.get('#mat-select-2');
    txtRefNumber = () => cy.get('#mat-input-7');
    btnSaveTask = () => cy.get('.btn btn-success active mat-flat-button');


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
        cy.wait(2000);
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

    addNewTaskToProjectEssentials(taskName,timeStamp){
        this.btnAddTask().click();
        cy.wait(200);
    
        this.txtSubjectName().type(taskName + ' - Essentials only - ' + timeStamp + '{enter}');

        this.sltSite().click();
        cy.wait(100);
        this.sltSiteOption().type('Default'+ '{enter}');
        cy.wait(100);
        this.sltSiteOptionDropDown().eq(0).click();

        this.btnSaveTask().click();

    }

    // addNewTaskToProjectNoForms(taskName,timeStamp){
    //     this.btnAddTask().click();
    //     cy.wait(200);
    
    //     this.txtSubjectName().type(taskName + ' - ' + timeStamp + '{enter}');
    //     this.txtPopUpNewTask().should('be.visible').should('contain.text', 'Add task');

    //     // this.sltSite().click();
    //     // cy.wait(100);
    //     // this.sltSiteOption().type('Default'+ '{enter}');
    //     // cy.wait(100);
    //     // this.sltSiteOption().eq(0).click();

    //     this.sltDebitorInput().click();
    //     cy.wait(100);
    //     this.sltDebitorInput().type('Default'+ '{enter}', { force: true });
    //     this.sltDebitorInput().should('contain.text', 'Default');

    //     this.txtDescription().type(taskName +' - My Desc Test');

    //     this.txtRefNumber.type(8888);

    // }

    // addNewTaskToProjectWithForm(taskName,timeStamp){
    //     this.btnAddTask().click();
    //     cy.wait(200);
    
    //     this.txtSubjectName().type(taskName + ' - With Form - ' + timeStamp + '{enter}');
    //     this.txtPopUpNewTask().should('be.visible').should('contain.text', 'Add task');

    //     // this.sltSite().click();
    //     // cy.wait(100);
    //     // this.sltSiteOption().type('Default'+ '{enter}');
    //     // cy.wait(100);
    //     // this.sltSiteOption().eq(0).click();

    //     this.sltDebitorInput().click();
    //     cy.wait(100);
    //     this.sltDebitorInput().type('Default'+ '{enter}', { force: true });
    //     this.sltDebitorInput().should('contain.text', 'Default');

    //     this.txtDescription().type(taskName +' - My Desc Test');
    //     this.txtRefNumber.type(8888);
    // }

        // addNewTaskToProjectPeriodic(taskName,timeStamp){
    //     this.btnAddTask().click();
    //     cy.wait(200);
    
    //     this.txtSubjectName().type(taskName + ' - Periodic - ' + timeStamp + '{enter}');
    //     this.txtPopUpNewTask().should('be.visible').should('contain.text', 'Add task');

    //     // this.sltSite().click();
    //     // cy.wait(100);
    //     // this.sltSiteOption().type('Default'+ '{enter}');
    //     // cy.wait(100);
    //     // this.sltSiteOption().eq(0).click();

    //     this.sltDebitorInput().click();
    //     cy.wait(100);
    //     this.sltDebitorInput().type('Default'+ '{enter}', { force: true });
    //     this.sltDebitorInput().should('contain.text', 'Default');

    //     this.txtDescription().type(taskName +' - My Desc Test');
    //     this.txtRefNumber.type(8888);
    // }


    
}