export class UpdateSitePage {
    txtSiteName = () => cy.get('[title="Site name"]');
    txtLatitude = () => cy.get('[type="number"]');
    txtLongitude = () => cy.get('[id="search-location"]');
    getSaveButton = () => cy.get('[title="Save"]');
    getSaveToast = () => cy.get('[class="toast-msg"]');  
    editSitebtn = () => cy.get('[title="Edit"]');
        
    updateSite(siteName,latitude,longitude) {
        this.editSitebtn().eq(0).click()
        this.txtSiteName().clear().type(siteName)
        this.txtLatitude().eq(0).clear().type(latitude)
        this.txtLatitude().eq(1).clear().type(longitude)
        cy.intercept('POST', '/api/site/update_site').as('updateRequest');
        this.getSaveButton().click()
        cy.wait('@updateRequest').its('response.statusCode').should('eq', 200);
        this.getSaveToast().should('have.text', 'Site updated.');
    }
}

