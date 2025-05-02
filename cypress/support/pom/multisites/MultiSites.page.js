export class MultiSitesPage {
    txtSearch = () => cy.get('#searchField');
    siteNameOnList = () => cy.get('.toolText');

    //used elsewhere
    btnCreateMultiSites = () => cy.get('[routerlink="/multi-sites/create"]');
    btnGoBack = () => cy.get('[title="Back"]');

    sltMultiSiteName = () => cy.get('[class="toolText"]');
    categoryContainer = () => cy.get('.category-container');

    //searches for a MultiSite and checks if there is a response with the search prompt name
     searchMultiSites(multiSiteName) {
      cy.intercept('POST', '/api/multiSites/get_multi_sites').as('searchRequest');

      this.txtSearch().should('be.visible');
      this.txtSearch().clear().type(multiSiteName + '{enter}');
      
      cy.wait('@searchRequest').its('response.statusCode').should('eq', 200);
      this.siteNameOnList().eq(0).should('be.visible', { timeout: 20000 }).and('have.text', multiSiteName);
     }

    //gets all MultiSites and selects the first one
     selectMultiSite(multiSiteName) {
        cy.intercept('POST', '/api/multiSites/get_multi_sites').as('allMultiSites');
        this.txtSearch().clear().type(multiSiteName + '{enter}');
        cy.wait('@allMultiSites').its('response.statusCode').should('eq', 200);
        this.sltMultiSiteName().eq(1).click();    
    }
    
    //verify no search result
     verifyMultiSitesDeleted() {
        this.categoryContainer().should('contain', 'No results');
    }

}
