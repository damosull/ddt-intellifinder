export class SitesPage {
    txtSearch = () => cy.get('#searchField')
    siteNameOnList = () => cy.get('.btnViewSite')
    tableCell = () => cy.get('tbody td')
    noResultsFooter = () => cy.get('.footable-empty').contains('No results.')

    searchSite(siteName, latitude, longitude) {
        cy.intercept('POST', '/api/site/sites').as('searchRequest');
        this.txtSearch().type(siteName + '{enter}', { force: true })
        cy.wait('@searchRequest').its('response.statusCode').should('eq', 200);
        this.siteNameOnList().eq(0).isVisibleWithText(siteName);
        this.tableCell().eq(2).isVisibleWithText(`Lat. ${latitude} Lon. ${longitude}`);
    }

    searchSiteWithNoResults(siteName) {
        cy.intercept('POST', '/api/site/sites').as('searchRequest');
        this.txtSearch().clear().type(`${siteName}{enter}`);
        cy.wait('@searchRequest').its('response.statusCode').should('eq', 200);
        this.noResultsFooter().should('be.visible')
    }
}