export class SitesPage {
    txtSearch = () => cy.get('#searchField')
    siteNameOnList = () => cy.get('.btnViewSite')
    tableCell = () => cy.get('tbody td')
    noResultsFooter = () => cy.get('.footable-empty').contains('No results.')
    btnEditDetail = () => cy.get('[title="Edit site"]');


    searchSite(siteName, latitude, longitude) {
        cy.intercept('POST', '/api/site/sites').as('searchRequest');
        this.txtSearch().should('be.visible')
        this.txtSearch().type(siteName + '{enter}')
        cy.wait('@searchRequest').its('response.statusCode').should('eq', 200);
        this.siteNameOnList().eq(0).should('be.visible', { timeout: 20000 }).and('have.text', siteName);
        this.tableCell().eq(3).should('be.visible', { timeout: 20000 }).and('have.text', `Lat. ${latitude} Lon. ${longitude}`);
    }

    searchSiteWithNoResults(siteName) {
        cy.intercept('POST', '/api/site/sites').as('searchRequest');
        this.txtSearch().clear().type(`${siteName}{enter}`);
        cy.wait('@searchRequest').its('response.statusCode').should('eq', 200);
        this.noResultsFooter().should('be.visible')
    }
    verfiyEditButtonVisibility()
    {
        this.btnEditDetail().should('be.visible')
    }

}