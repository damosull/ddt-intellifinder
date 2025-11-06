import { MultiSitesCommon } from "./MultiSitesCommon.page";

export class MultiSitesEditPage {
  txtMultiSiteName = () => cy.get('[title="Site name"]');
  txtLat = () => cy.get('[title="lat"]');
  txtLong = () => cy.get('[title="lon"]');
  txtPhone = () => cy.get('[title="Telephone"]');
  txtDescription = () => cy.get('[title="Description"]');
  btnSave = () => cy.get('[title="Save"]');

  updateDetails(name, long, lat, phone, description) {
    this.txtMultiSiteName().clear().type(name);
    this.txtLong().clear().type(long);
    this.txtLat().clear().type(lat);
    this.txtPhone().clear().type(phone);
    this.txtDescription().type("{selectAll}" + description);
  }

  saveMultiSitesDetails() {
    cy.intercept("POST", "/api/multiSites/edit_multi_sites").as(
      "editedMultiSites"
    );
    this.btnSave().click();
    MultiSitesCommon.toastMultiSiteEdited().should("be.visible");
    cy.wait("@editedMultiSites").its("response.statusCode").should("eq", 200);
  }
}
