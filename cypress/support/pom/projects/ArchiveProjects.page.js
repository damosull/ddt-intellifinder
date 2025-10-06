import { ProjectsCommon } from './ProjectsCommon.page.js';

export class ArchiveProjectsPage {
    selectArchivedProject(){
        ProjectsCommon.selectProjectByIndex(0);
    }

    selectMultipleProjects(count){
        ProjectsCommon.selectMultipleProjects(count); 
    }

    trashProjects(){
        cy.selectAction('trash');
        cy.confirmAction('Yes');
    }
}
