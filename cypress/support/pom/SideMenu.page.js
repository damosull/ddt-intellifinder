export class SideMenuPage {
    navbarToggle = () => cy.get('.navbar-toggle');
    categoriesLink = () => cy.contains('Categories');
    sitesLink = () => cy.contains('Sites');
    multiSitesLink = () => cy.contains('Multi-Sites');
    projectsLink = () => cy.contains('Projects');
    viewAllProjectsLink = () => cy.get('[routerlink="/projects/list-projects/latest"]');
    viewArchivedProjectsLink = () => cy.get('[routerlink="/projects/list-projects/archive"]');
    viewTrashedProjectsLink = () => cy.get('[routerlink="/projects/list-projects/trash"]');

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

    openProjectsPage() {
        this.navbarToggle().click();
        this.projectsLink().click();
        this.viewAllProjectsLink().click();
        cy.url().should('include', '/projects/list-projects/latest');
    }

    openProjectsArchivePage() {
        this.navbarToggle().click();
        this.projectsLink().click();
        this.viewArchivedProjectsLink().click();
        cy.url().should('include', '/projects/list-projects/archive');
    }

    openProjectsTrashPage() {
        this.navbarToggle().click();
        this.projectsLink().click();
        this.viewTrashedProjectsLink().click();
        cy.url().should('include', '/projects/list-projects/trash');
    }
}
