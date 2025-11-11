export class SideMenuPage {
  navbarToggle = () => cy.get(".navbar-toggle", { timeout: 20000 });
  categoriesLink = () => cy.contains("Categories");
  sitesLink = () => cy.get('[href="#dropdown-lvl1"]');
  multiSitesLink = () => cy.contains("Multi-Sites");
  projectsLink = () => cy.contains("Projects");
  viewAllLink = () => cy.contains("View all");
  nearestLink = () => cy.contains("Nearest");


  viewAllProjectsLink = () =>
    cy.get('[routerlink="/projects/list-projects/latest"]');
  viewArchivedProjectsLink = () =>
    cy.get('[routerlink="/projects/list-projects/archive"]');
  viewTrashedProjectsLink = () =>
    cy.get('[routerlink="/projects/list-projects/trash"]');

  openCategoriesPage() {
    cy.intercept("api/categories/all_categories").as("allCategories");
    this.categoriesLink().click();
    cy.wait("@allCategories").its("response.statusCode").should("eq", 200);
  }

  openViewAllSitesPage() {
    cy.intercept("/api/site/sites").as("allSites");
    this.sitesLink().click();
    this.viewAllLink().click();
    cy.wait("@allSites").its("response.statusCode").should("eq", 200);
  }
  
  openSiteOptionFromSideMenu(SiteOption) {
    this.sitesLink().click();
    cy.contains(SiteOption).click();
  }

  openMultiSitesPage() {
    cy.intercept("/api/multiSites/get_multi_sites").as("allMultiSites");
    this.navbarToggle().click();
    this.multiSitesLink().click();
    cy.wait("@allMultiSites").its("response.statusCode").should("eq", 200);
  }

  openNearestSitePage() {
    cy.intercept("/api/site/sites").as("allSites");
    this.sitesLink().click();
    this.nearestLink().click();
    cy.wait("@allSites").its("response.statusCode").should("eq", 200);
  }

  openProjectsPage() {
    cy.intercept("/api/Projects/projects_with_type").as("allProjects");
    this.navbarToggle().click();
    this.projectsLink().click();
    this.viewAllProjectsLink().click();
    cy.wait("@allProjects").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/projects/list-projects/latest");
  }

  openProjectsArchivePage() {
    this.navbarToggle().click();
    this.projectsLink().click();
    this.viewArchivedProjectsLink().click();
    cy.url().should("include", "/projects/list-projects/archive");
  }

  openProjectsTrashPage() {
    cy.intercept("/api/Projects/projects_with_type").as("allProjects");
    this.navbarToggle().click();
    this.projectsLink().click();
    this.viewTrashedProjectsLink().click();
    cy.wait("@allProjects").its("response.statusCode").should("eq", 200);
    cy.url().should("include", "/projects/list-projects/trash");
  }
}
