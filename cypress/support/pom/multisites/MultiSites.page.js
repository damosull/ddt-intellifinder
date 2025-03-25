export class MultiSitesPage {
    txtSearch = () => cy.get('#searchField');
    btnCreateMultiSites = () => cy.get('[routerlink="/multi-sites/create"]');
    siteNameOnList = () => cy.get('.toolText');
    btnGoBack = () => cy.get('[title="Back"]');
    categoryContainer = () => cy.get('.category-container');

    //searches for a MultiSite and checks if there is a response with the search prompt name
     searchMultiSites(multiSiteName) {
      cy.intercept('POST', '/api/multiSites/get_multi_sites').as('searchRequest');

      this.txtSearch().should('be.visible');
      this.txtSearch().clear().type(multiSiteName + '{enter}');
      
      cy.wait('@searchRequest').its('response.statusCode').should('eq', 200);
      this.siteNameOnList().eq(0).should('be.visible', { timeout: 20000 }).and('have.text', multiSiteName);
     }

     verifyMultiSitesDeleted() {
        this.categoryContainer().should('contain', 'No results');
    }

}
