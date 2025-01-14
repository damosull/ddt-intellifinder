export class CreateSitePage {
    txtSiteName = () => cy.get('[title="Site name"]');
    txtLatitude = () => cy.get('[type="number"]');
    selectCategory = () => cy.get('[id="select2-categoryDropdown-container"]');
    sitePicture = () => cy.get('[id="sitePic"]');
    txtTelephone = () => cy.get('[title="Telephone"]');
    txtNFC = () => cy.get('[id="siteNfc"]');
    txtRFIDtag= () => cy.get('[title="RFID tag"]');
    txtQRCode = () => cy.get('[title="QR code"]');
    txtDescription = () => cy.get('[class="note-editing-area"]');
    saveButton = () => cy.get('[title="Save"]');
    txtCategorySearch = () => cy.get('[type="search"]');
    txtCategorySearchOptions = () => cy.get('[role="option"]');
    saveToast = () => cy.get('[class="toast-msg"]');
    btnCreateNewSite = () => cy.contains('Create new');

    createSite(siteName,latitude,longitude) {
        this.btnCreateNewSite().click()
        this.txtSiteName().clear().type(siteName)
        this.txtLatitude().eq(0).clear().type(latitude)
        this.txtLatitude().eq(1).clear().type(longitude)
        this.selectCategory().click()
        cy.intercept('POST', '/api/categories/all_categories').as('postRequest');
        this.txtCategorySearch().type('Default')
        cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
        this.txtCategorySearchOptions().eq(0).click()
        this.sitePicture().attachFile('testImage.jpg');
        this.txtTelephone().type('1234567')
        this.txtNFC().type('123')
        this.txtRFIDtag().type('123')
        this.txtQRCode().type('123')
        this.txtDescription().type('My Desc')
        cy.intercept('POST', '/api/site/new_site').as('saveRequest');
        cy.intercept('POST', '/api/site/sites').as('allSitesRequest');
        this.saveButton().click()
        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);
        cy.wait('@allSitesRequest').its('response.statusCode').should('eq', 200);
        this.saveToast().should('have.text', 'Site created.');
    }

}

