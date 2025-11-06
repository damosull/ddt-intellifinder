import { MultiSitesCommon } from "./MultiSitesCommon.page";

export class NewSubSitePopup {
  sltSubSite = () => cy.get("#select2-availableSites-container");
  sltOptions = () => cy.get(".select2-results__option");
  btnSave = () => cy.get(".btn-success");

  selectSubSite() {
    cy.intercept("POST", "/api/multiSites/submit_sub_site").as("saveSubSite");
    cy.intercept("POST", "/api/multiSites/get_sub_sites").as("allSubSite");
    this.sltSubSite().click();
    cy.wait(1000);
    cy.get(".select2-results__option")
      .eq(1)
      .invoke("text")
      .then((text) => {
        cy.wrap(text).as("selectedSubSiteName");
      });
    this.sltOptions().eq(1).click();
    cy.get("@selectedSubSiteName").then((selectedSubSiteName) => {
      this.sltSubSite()
        .should("be.visible")
        .and("contain.text", selectedSubSiteName);
    });
    this.btnSave().click();
    cy.wait("@saveSubSite").its("response.statusCode").should("eq", 200);
    cy.wait("@allSubSite").its("response.statusCode").should("eq", 200);
    MultiSitesCommon.toastMultiSiteCreated().should("be.visible");
  }
}
