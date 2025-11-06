import { MultiSitesCommon } from "./MultiSitesCommon.page";

export class EditPlanDrawingPopup {
  txtTitle = () => cy.get('[id="planTitle"]');
  btnSave = () => cy.get('[class="btn btn-success customBtn"]');

  updatePlanDrawingDetails() {
    this.txtTitle().clear().type("TestPlanDrawing-v3");
  }

  savePlanDrawing() {
    this.btnSave().click();
  }

  verifyPlanDrawingSaved() {
    MultiSitesCommon.toastPlanDrawingUpdated().should("be.visible");
  }
}
