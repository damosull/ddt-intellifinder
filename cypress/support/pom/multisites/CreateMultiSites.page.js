export class CreateMultiSitesPage {
  txtMultiSiteName = () => cy.get('[title="Site name"]');

  multiSitePicture = () => cy.get("#sitePic");
  txtTelephone = () => cy.get('[title="Telephone"]');
  txtDescription = () => cy.get('[title="Description"]');

  btnSave = () => cy.get('[title="Save"]');
  toastMultiSiteCreated = () =>
    cy.get(".toast-text").contains("Multi-sites created");

  btnGoBack = () => cy.get('[title="Back"]');

  createMultiSite(siteName) {
    this.txtMultiSiteName().clear().type(siteName);

    this.multiSitePicture().attachFile("testImage.jpg");
    this.txtTelephone().type("88888888");
    this.txtDescription().type("My Desc - This is a test");

    this.btnSave().click();
    this.toastMultiSiteCreated().should("be.visible");

    cy.intercept("POST", "/api/multiSites/get_multi_sites_by_id").as(
      "seeNewMultiSite"
    );
    cy.wait("@seeNewMultiSite").its("response.statusCode").should("eq", 200);
  }

  clickBackButton() {
    this.btnGoBack().click();
  }
}
