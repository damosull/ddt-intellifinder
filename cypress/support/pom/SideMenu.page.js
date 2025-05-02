export class SideMenuPage {
    navbarToggle = () => cy.get('.navbar-toggle');
    categoriesLink = () => cy.contains('Categories');
    sitesLink = () => cy.contains('Sites');
    multiSitesLink = () => cy.contains('Multi-Sites');


    openCategoriesPage() {
        cy.intercept('api/categories/all_categories').as('allCategories');
        this.navbarToggle().click();
        this.categoriesLink().click();
        cy.wait('@allCategories').its('response.statusCode').should('eq', 200);
    }

    openSitesPage() {
        this.navbarToggle().click();
        this.sitesLink().click();
    }

    openMultiSitesPage() {
        cy.intercept('/api/multiSites/get_multi_sites').as('allMultiSites');
        this.navbarToggle().click();
        this.multiSitesLink().click();
        cy.wait('@allMultiSites').its('response.statusCode').should('eq', 200);
    }
}
