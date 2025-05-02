export class UpdateMultiSitesPage {
    btnEditMultiSite = () => cy.get('[title="Edit"]');

    txtMultiSiteName = () => cy.get('[title="Site name"]');

    txtLatitude = () => cy.get('[title="lat"]');
    txtLongitude = () => cy.get('[title="lon"]');

    txtTelephone = () => cy.get('[title="Telephone"]');
    txtDescription = () => cy.get('[title="Description"]');

    btnSave = () => cy.get('[title="Save"]');
    toastMultiSiteCreated = () => cy.get('.toast-text').contains('Multi-sites edited');

   //selectPicture = () => cy.get('[id="site-documents"]');

   //    addSubSites(){
   //       this.selectPicture().click();
   //   }

   updateMultiSites(multiSiteName,latitude,longitude,newTextEdit){
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

      // cy.intercept('POST', '/api/multiSites/get_multi_sites').as('allMultiSites');
      // cy.wait('@allMultiSites').its('response.statusCode').should('eq', 200);      
  }

}