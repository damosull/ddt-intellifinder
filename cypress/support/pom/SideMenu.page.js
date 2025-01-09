export class SideMenuPage {
    navbarToggle = () => cy.get('.navbar-toggle');
    categoriesLink = () => cy.contains('Categories');

    openCategoriesPage() {
        cy.intercept('api/categories/all_categories').as('allCategories');
        this.navbarToggle().click();
        this.categoriesLink().click();
        cy.wait('@allCategories').its('response.statusCode').should('eq', 200);
    }
}
