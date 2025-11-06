export class MultiSitesListPage {
  txtSearch = () => cy.get("#searchField");
  siteNameOnList = () => cy.get(".toolText");

  //used elsewhere
  btnCreateMultiSites = () => cy.get('[routerlink="/multi-sites/create"]');
  btnGoBack = () => cy.get('[title="Back"]');
  btnEdit = () => cy.get('[title="Edit"]');

  multiSiteName = () => cy.get(".toolText");
  categoryContainer = () => cy.get(".category-container");

  btnDeleteMultiSite = () => cy.get('[title="Delete"]');
  confirmationTitle = () => cy.get(".swal-title").contains("Are you sure?");

  //searches for a MultiSite and checks if there is a response with the search prompt name
  searchMultiSites(multiSiteName) {
    cy.intercept("POST", "/api/multiSites/get_multi_sites").as("searchRequest");

    this.txtSearch().should("be.visible");
    this.txtSearch()
      .clear()
      .type(multiSiteName + "{enter}");

    cy.wait("@searchRequest").its("response.statusCode").should("eq", 200);
    this.siteNameOnList()
      .eq(0)
      .should("be.visible", { timeout: 20000 })
      .and("have.text", multiSiteName);
  }

  //gets all MultiSites and selects the first one
  selectMultiSite(multiSiteName) {
    cy.intercept("POST", "/api/multiSites/get_multi_sites").as("allMultiSites");
    this.txtSearch()
      .clear()
      .type(multiSiteName + "{enter}");
    cy.wait("@allMultiSites").its("response.statusCode").should("eq", 200);
    this.multiSiteName().eq(1).click();
  }

  //verify no search result
  verifyMultiSiteDeleted() {
    this.categoryContainer().should("contain", "No results");
  }

  openCreateMultiSitesPage() {
    this.btnCreateMultiSites().click();
  }

  openFirstSite() {
    this.multiSiteName().eq(0).click();
  }

  openEditMultiSitesPage() {
    this.btnEdit().click();
  }

  deleteMultiSite(index) {
    cy.intercept("POST", "api/multiSites/delete_multi_sites").as(
      "deleteRequest"
    );
    this.btnDeleteMultiSite().eq(index).click();
    this.confirmationTitle().should("be.visible");
    cy.contains("Yes").click();
    cy.wait("@deleteRequest").its("response.statusCode").should("eq", 200);
  }
}
