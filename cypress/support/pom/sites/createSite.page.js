export class CreateSitePage {
    btnCreateNewSite = () => cy.contains('Create new');
    txtSiteName = () => cy.get('[title="Site name"]');
    txtLatitude = () => cy.get('[type="number"]').eq(0);
    txtLongitude = () => cy.get('[type="number"]').eq(1);
    selectCategory = () => cy.get('#select2-categoryDropdown-container');
    sitePicture = () => cy.get('#sitePic');
    txtTelephone = () => cy.get('[title="Telephone"]');
    txtNFC = () => cy.get('#siteNfc');
    txtRfidTag = () => cy.get('[title="RFID tag"]');
    txtQrCode = () => cy.get('[title="QR code"]');
    txtDescription = () => cy.get('.note-editing-area');
    btnSave = () => cy.get('[title="Save"]');
    txtCategorySearch = () => cy.get('[type="search"]');
    txtCategorySearchOptions = () => cy.get('[role="option"]');
    toastSiteCreated = () => cy.get('.toast-msg').contains('Site created.');

    createSite(siteName, latitude, longitude) {
        this.btnCreateNewSite().click()
        this.txtSiteName().clear().type(siteName)
        this.txtLatitude().clear().type(latitude)
        this.txtLongitude().clear().type(longitude)
        this.selectCategory().click()
        cy.intercept('POST', '/api/categories/all_categories').as('postRequest');
        this.txtCategorySearch().type('Default')
        cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
        this.txtCategorySearchOptions().eq(0).click()
        this.sitePicture().attachFile('testImage.jpg');
        this.txtTelephone().type('1234567')
        this.txtNFC().type('123')
        this.txtRfidTag().type('123')
        this.txtQrCode().type('123')
        this.txtDescription().type('My Desc')
        cy.intercept('POST', '/api/site/new_site').as('saveRequest');
        cy.intercept('POST', '/api/site/sites').as('allSitesRequest');
        this.btnSave().click()
        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);
        cy.wait('@allSitesRequest').its('response.statusCode').should('eq', 200);
        this.toastSiteCreated().should('be.visible');
    }
}