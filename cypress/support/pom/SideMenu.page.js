export class SideMenuPage {
    navbarToggle = () => cy.get('.navbar-toggle');
    categoriesLink = () => cy.contains('Categories');
    sitesLink = () => cy.contains('Sites');

    openCategoriesPage() {
        cy.intercept('api/categories/all_categories').as('allCategories');
        this.navbarToggle().click();
        this.categoriesLink().click();
        cy.wait('@allCategories').its('response.statusCode').should('eq', 200);
    }
    openSitesPage() {
        // cy.intercept('GET', '**/api/site/settings*').as('getSiteSettings');
        this.navbarToggle().click();
        this.sitesLink().click();
        cy.contains('Create new').click()
        // cy.wait('@getSiteSettings').its('response.statusCode').should('eq', 200);
    }
}
