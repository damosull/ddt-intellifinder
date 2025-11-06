export class MultiSitesCommon {
  static toastMultiSiteCreated = () =>
    cy.get(".toast-text").contains("Site updated.");
  static toastPlanDrawingSaved = () =>
    cy.get(".toast-text").contains("Picture uploaded.");

  static toastPlanDrawingUpdated = () =>
    cy.get(".toast-text").contains("Picture updated.");

  static toastMultiSiteEdited = () =>
    cy.get(".toast-text").contains("Multi-sites edited");
}
