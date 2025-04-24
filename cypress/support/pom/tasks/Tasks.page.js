export class TasksPage {
    txtPageTitle = () => cy.get('h2');

    pageTitle() {
        this.txtPageTitle().should('be.visible').should('contain.text', 'Task list');
    }

}