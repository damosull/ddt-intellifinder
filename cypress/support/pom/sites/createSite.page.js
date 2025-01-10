export class CreateSitePage {
    txtSiteName = () => cy.get('[title="Site name"]');
    txtLocation = () => cy.get('[id="search-location"]');
    txtAddress = () => cy.get('[title="Address"]');
    txtZipCode = () => cy.get('[title="Zip code"]');
    txtCity = () => cy.get('[title="City"]');
    txtLatitude = () => cy.get('[type="number"]');
    txtLongitude = () => cy.get('[id="search-location"]');
    selectCategory = () => cy.get('[id="categoryDropdown"]');
    getSitePicture = () => cy.get('[id="sitePic"]');
    gettelephone = () => cy.get('[title="Telephone"]');

    getNFC = () => cy.get('[id="siteNfc"]');
    getRFIDtag= () => cy.get('[title="RFID tag"]');
    getQRCode = () => cy.get('[title="QR code"]');
    getSiteContactPerson = () => cy.get('select[title="Select a contact person"]');
    getDescription = () => cy.get('[class="note-editing-area"]');
    getSaveButton = () => cy.get('[title="Save"]');
    getLocationSuggestions = () => cy.get('[class="pac-item"]');
    getCategorySearch = () => cy.get('[type="search"]');
    getCategorySearchOptions = () => cy.get('[role="option"]');

    

    createSite(siteName) {
        this.txtSiteName().type(siteName)
        this.txtLocation().type('London')
        this.getLocationSuggestions().eq(0).click()
        this.txtAddress().type('My Address')
        this.txtZipCode().type('My ZipCode')
        this.txtCity().type('My City')
        
        this.txtLatitude().eq(0).type('123')

        this.txtLatitude().eq(1).type('456')

        cy.get('[id="sitePic"]').attachFile('testImage.jpg');
        this.gettelephone().type('1234567')
        
        this.getNFC().type('123')
        this.getRFIDtag().type('123')
        this.getQRCode().type('123')
        this.getDescription().type('My Desc')
        this.getSaveButton().click()
    }
}

