export class DeleteMultiSitesPage {
    btnDeleteMultiSite = () => cy.get('[title="Delete"]')
    confirmationTitle = () => cy.get('.swal-title').contains('Are you sure?')

    deleteMultiSite() {
        cy.intercept('POST', 'api/multiSites/delete_multi_sites').as('deleteRequest');
        this.btnDeleteMultiSite().click();
        this.confirmationTitle().should('be.visible');
        cy.contains('Yes').click();
        cy.wait('@deleteRequest').its('response.statusCode').should('eq', 200);

        // cy.intercept('POST', '/api/multiSites/get_multi_sites').as('allMultiSites');
        // cy.wait('@allMultiSites').its('response.statusCode').should('eq', 200);

    }
}