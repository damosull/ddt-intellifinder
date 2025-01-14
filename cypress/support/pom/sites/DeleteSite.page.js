export class DeleteSitePage {
    btnDeleteSite = () => cy.get('[title="Delete"]')
    confirmationTitle = () => cy.get('.swal-title').contains('Are you sure?')

    deleteSite() {
        cy.intercept('POST', '/api/site/delete_site').as('deleteRequest');
        this.btnDeleteSite().click()
        this.confirmationTitle().should('be.visible')
        cy.contains('Yes').click()
        cy.wait('@deleteRequest').its('response.statusCode').should('eq', 200);
    }
}