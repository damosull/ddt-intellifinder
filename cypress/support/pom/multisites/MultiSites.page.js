export class MultiSitesPage {
    txtSearch = () => cy.get('#searchField')
    //siteNameOnList = () => cy.get('.btnViewSite')
    //tableCell = () => cy.get('tbody td')
   // noResultsFooter = () => cy.get('.footable-empty').contains('No results.')

     searchMultiSites(siteName) {
        cy.intercept('POST', '/api/multiSites/get_multi_sites').as('searchRequest');
        this.txtSearch().should('be.visible');
        this.txtSearch().type(siteName + '{enter}');
        cy.wait('@searchRequest').its('response.statusCode').should('eq', 200);
    //     this.siteNameOnList().eq(0).should('be.visible', { timeout: 20000 }).and('have.text', siteName);
    //     this.tableCell().eq(2).should('be.visible', { timeout: 20000 }).and('have.text', `Lat. ${latitude} Lon. ${longitude}`);
     }

    // searchMultiSitesWithNoResults(siteName) {
    //     cy.intercept('POST', '/api/multiSites/get_multi_sites').as('searchRequest');
    //     this.txtSearch().clear().type(`${siteName}{enter}`);
    //     cy.wait('@searchRequest').its('response.statusCode').should('eq', 200);
    //     this.noResultsFooter().should('be.visible')
    // }
}