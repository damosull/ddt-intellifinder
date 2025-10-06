import { ProjectsCommon } from './ProjectsCommon.page.js';

export class TrashProjectsPage {
    chkSelectProject = () => cy.get('.projectCB');
    confirmationTitle = () => cy.get('.swal-title').contains('Are you sure?');
   
    selectTrashedProject(){
        ProjectsCommon.selectProjectByIndex(0);
    }

    restoreProject(){
        cy.selectAction('unarchive');
        cy.confirmAction('Yes');
    }

    archiveProjects(){
        cy.selectAction('archive');
        cy.confirmAction('Yes');
    }

    deleteProject(){
        cy.selectAction('delete');
        this.confirmationTitle().should('be.visible');
        cy.contains('Yes').click(); // Above line & this line are needed because 'delete' has 2 confirmation pop-ups
        cy.confirmAction('Yes');
    }
}
