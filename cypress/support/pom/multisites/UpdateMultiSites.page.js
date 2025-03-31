export class UpdateMultiSitesPage {
    btnEditMultiSite = () => cy.get('[title="Edit"]');

    txtMultiSiteName = () => cy.get('[title="Site name"]');

    txtLatitude = () => cy.get('[title="lat"]');
    txtLongitude = () => cy.get('[title="lon"]');
    txtTelephone = () => cy.get('[title="Telephone"]');
    txtDescription = () => cy.get('[title="Description"]');

    btnSave = () => cy.get('[title="Save"]');
    btnSavePlanDrawing = () => cy.get('[class="btn btn-success customBtn"]');

    
    toastMultiSiteCreated = () => cy.get('.toast-text').contains('Multi-sites edited');
    toastMultiSitePicUploaded = () => cy.get('[id="toasty"]').contains('Picture uploaded.');

    btnAddNewPlan = () => cy.get('[title="New plan drawing"]');
    txtAddTitle = () => cy.get('[id="planTitle"]');


  
    multiSitePlanDrawing= () => cy.get('#planDrawing');

    btnEditPlanDrawing = () => cy.get('[title="Edit plan drawing"]');

//Edit MultiSite and here add coordinates since when it is created no address is given. Fields get new data, no original description text is kept. 
  editMultiSites(multiSiteName,latitude,longitude,newTextEdit){
      this.btnEditMultiSite().click();
      this.txtMultiSiteName().clear().type(multiSiteName);

      this.txtLatitude().clear().type(latitude);
      this.txtLongitude().clear().type(longitude);

      this.txtTelephone().clear().type('88884444');
      this.txtDescription().type('{selectAll}' + newTextEdit);
      cy.intercept('POST', '/api/multiSites/edit_multi_sites').as('editedMultiSites');
      this.btnSave().click();
      this.toastMultiSiteCreated().should('be.visible');

      cy.wait('@editedMultiSites').its('response.statusCode').should('eq', 200); 
  }

  // Issue in code need to be fixed before this can be tested
  //  //add new picture -- it is a plan drawing. 
  // addNewPlanDrawing() {
  //     cy.intercept('POST', '/api/multiSites/submit_plan_drawing').as('savePlanDrawing');
  //     this.btnAddNewPlan().click();
  //     this.txtAddTitle().type('TestPlanDrawing-v2');
  //     this.multiSitePlanDrawing().attachFile('pexels-pixabay-test.jpg');
  //     this.btnSavePlanDrawing().click();
  //     cy.wait('@savePlanDrawing').its('response.statusCode').should('eq', 200);
  //   //this.toastMultiSitePicUploaded().should('be.visible');
  //   // cy.contains('pexels-pixabay-test.jpg');
  // }

  // editPlanDrawing() {
  //   cy.intercept('POST', 'api/multiSites/submit_plan_drawing').as('editPlanDrawing');
  //     btnEditPlanDrawing().click();
  //     this.txtAddTitle().clear().type('TestPlanDrawing-v3');
  //     cy.wait('@editPlanDrawing').its('response.statusCode').should('eq', 200);
  // }

}