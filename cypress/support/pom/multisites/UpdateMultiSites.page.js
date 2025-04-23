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

    confirmationTitle = () => cy.get('.swal-title').contains('Are you sure you want to delete this picture?');
  
    multiSitePlanDrawing= () => cy.get('#planDrawing');
    btnEditPlanDrawing = () => cy.get('[title="Edit plan drawing"]');
    btnDeletePlanDrawing = () => cy.get('[title="Delete plan drawing"]');

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

  // add new picture -- it is a plan drawing. 
  addNewPlanDrawing() {
      this.btnAddNewPlan().click();
      this.multiSitePlanDrawing().attachFile('pexels-pixabay-test.jpg');
      this.txtAddTitle().type('TestPlanDrawing-v2');

      cy.intercept('POST', '/api/multiSites/submit_plan_drawing').as('savePlanDrawing');
      this.btnSavePlanDrawing().click();
      cy.wait('@savePlanDrawing').its('response.statusCode').should('eq', 200);
      this.toastMultiSitePicUploaded().should('be.visible');
  }

   // edit new picture / plan drawing
  editPlanDrawing() {
    cy.wait(200);
    this.btnEditPlanDrawing().eq(1).click();
    this.txtAddTitle().clear().type('TestPlanDrawing-v3');

    cy.intercept('POST', 'api/multiSites/submit_plan_drawing').as('editPlanDrawing');
    this.btnSavePlanDrawing().click();
    cy.wait('@editPlanDrawing').its('response.statusCode').should('eq', 200);
  }

   // delete new picture / plan drawing
    deletePlanDrawing() {
    cy.wait(500);
    this.btnDeletePlanDrawing().eq(1).click();
    this.confirmationTitle().should('be.visible');

    cy.intercept('POST', '/api/multiSites/delete_plan_drawing').as('deletePlanDrawing');
    cy.contains('Yes').click();
    cy.wait('@deletePlanDrawing').its('response.statusCode').should('eq', 200);
    

  }

}