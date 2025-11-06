export class MultiSitesDetailsPage {
  btnGoBack = () => cy.get('[title="Back"]');
  btnEditMultiSite = () => cy.get('[title="Edit"]');
  btnAddSubSite = () => cy.get('[title="Sub-sites"]');
  btnAddNewPlanDrawing = () => cy.get('[title="New plan drawing"]');
  btnDeletePlanDrawing = () => cy.get('[title="Delete plan drawing"]');
  confirmationTitle = () =>
    cy
      .get(".swal-title")
      .contains("Are you sure you want to delete this picture?");

  btnEditPlanDrawing = () => cy.get('[title="Edit plan drawing"]');

  clickBackButton() {
    this.btnGoBack().click();
  }

  openEditMultiSitesPage() {
    this.btnEditMultiSite().click();
  }

  openSubSitesPageForRecord(index) {
    cy.intercept("POST", "/api/multiSites/get_sub_sites").as("allSubSites");
    this.btnAddSubSite().eq(index).click();
    cy.wait("@allSubSites").its("response.statusCode").should("eq", 200);
  }

  openNewPlanDrawingPopup() {
    this.btnAddNewPlanDrawing().click();
  }

  deletePlanDrawing(index) {
    cy.intercept("POST", "/api/multiSites/delete_plan_drawing").as(
      "deletePlanDrawing"
    );
    this.btnDeletePlanDrawing().eq(index).click();
    this.confirmationTitle().should("be.visible");
    cy.contains("Yes").click();
    cy.wait("@deletePlanDrawing").its("response.statusCode").should("eq", 200);
  }

  openEditPlanDrawingPopup(index) {
    this.btnEditPlanDrawing().eq(index).click();
  }
}
