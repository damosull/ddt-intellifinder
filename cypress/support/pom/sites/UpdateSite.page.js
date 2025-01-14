export class UpdateSitePage {
    btnEditSite = () => cy.get('[title="Edit"]');
    txtSiteName = () => cy.get('[title="Site name"]');
    txtLatitude = () => cy.get('[type="number"]').eq(0);
    txtLongitude = () => cy.get('[type="number"]').eq(1);
    btnSave = () => cy.get('[title="Save"]');
    toastSiteUpdated = () => cy.get('.toast-msg').contains('Site updated.');

    updateSite(siteName, latitude, longitude) {
        this.btnEditSite().click()
        this.txtSiteName().clear().type(siteName)
        this.txtLatitude().clear().type(latitude)
        this.txtLongitude().clear().type(longitude)
        cy.intercept('POST', '/api/site/update_site').as('updateRequest');
        this.btnSave().click()
        cy.wait('@updateRequest').its('response.statusCode').should('eq', 200);
        this.toastSiteUpdated().should('be.visible');
    }
}