export class DeletePopupPage {
    btnDelete = () => cy.contains('Delete');

    confirmDeletion() {
        cy.intercept('api/categories/delete_category').as('deleteCategory');
        this.btnDelete().click();
        cy.wait('@deleteCategory').its('response.statusCode').should('eq', 200);
    }
}
