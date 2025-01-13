export class CreateSitePage {
    txtSiteName = () => cy.get('[title="Site name"]');
    txtLatitude = () => cy.get('[type="number"]');
    selectCategory = () => cy.get('[id="select2-categoryDropdown-container"]');
    getSitePicture = () => cy.get('[id="sitePic"]');
    gettelephone = () => cy.get('[title="Telephone"]');

    getNFC = () => cy.get('[id="siteNfc"]');
    getRFIDtag= () => cy.get('[title="RFID tag"]');
    getQRCode = () => cy.get('[title="QR code"]');
    getDescription = () => cy.get('[class="note-editing-area"]');
    getSaveButton = () => cy.get('[title="Save"]');
    getCategorySearch = () => cy.get('[type="search"]');
    getCategorySearchOptions = () => cy.get('[role="option"]');
    getSaveToast = () => cy.get('[class="toast-msg"]');
    CreateNew = () => cy.contains('Create new');

    createSite(siteName,latitude,longitude) {
        this.CreateNew().click()
        this.txtSiteName().clear().type(siteName)
        this.txtLatitude().eq(0).clear().type(latitude)
        this.txtLatitude().eq(1).clear().type(longitude)
        this.selectCategory().click()
        cy.intercept('POST', '/api/categories/all_categories').as('postRequest');
        this.getCategorySearch().type('Default')
        cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
        this.getCategorySearchOptions().eq(0).click()
        this.getSitePicture().attachFile('testImage.jpg');
        this.gettelephone().type('1234567')
        this.getNFC().type('123')
        this.getRFIDtag().type('123')
        this.getQRCode().type('123')
        this.getDescription().type('My Desc')
        cy.intercept('POST', '/api/site/new_site').as('saveRequest');
        cy.intercept('POST', '/api/site/sites').as('allSitesRequest');
        this.getSaveButton().click()
        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);
        cy.wait('@allSitesRequest').its('response.statusCode').should('eq', 200);
        this.getSaveToast().should('have.text', 'Site created.');
    }

}

