export class SubSitesListPage {
  image = () => cy.get("#planDrawingImg");

  clickImage() {
    cy.intercept("POST", "/api/multiSites/get_available_sites").as(
      "getSubSiteDropdown"
    );
    this.image().click();
    cy.wait("@getSubSiteDropdown").its("response.statusCode").should("eq", 200);
  }
}
