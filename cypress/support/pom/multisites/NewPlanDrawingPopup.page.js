import { MultiSitesCommon } from "./MultiSitesCommon.page";

export class NewPlanDrawingPopup {
  multiSitePlanDrawing = () => cy.get("#planDrawing");
  txtAddTitle = () => cy.get('[id="planTitle"]');
  btnSave = () => cy.get('[class="btn btn-success customBtn"]');

  fillPlanDrawingDetails() {
    this.multiSitePlanDrawing().attachFile("pexels-pixabay-test.jpg");
    this.txtAddTitle().type("TestPlanDrawing-v2");
  }

  savePlanDrawing() {
    cy.intercept("POST", "/api/multiSites/submit_plan_drawing").as(
      "savePlanDrawing"
    );
    this.btnSave().click();
    cy.wait("@savePlanDrawing").its("response.statusCode").should("eq", 200);
  }

  verifyPlanDrawingSaved() {
    MultiSitesCommon.toastPlanDrawingSaved().should("be.visible");
  }
}
