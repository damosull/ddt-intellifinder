export class UpdateSitePage {
    txtSiteName = () => cy.get('[title="Site name"]');
    txtLocation = () => cy.get('[id="search-location"]');
    txtAddress = () => cy.get('[title="Address"]');
    txtZipCode = () => cy.get('[title="Zip code"]');
    txtCity = () => cy.get('[title="City"]');
    txtLatitude = () => cy.get('[type="number"]');
    txtLongitude = () => cy.get('[id="search-location"]');
    selectCategory = () => cy.get('[id="select2-categoryDropdown-container"]');
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
    getSaveToast = () => cy.get('[class="toast-msg"]');
    getSiteListViewSearch= () => cy.get('[id="searchField"]') 
    getSiteNameOnList = () => cy.get('[class*="btnViewSite"]') 
    getTableCell = () => cy.get('tbody td') 
    CreateNew = () => cy.contains('Create new')
    editSitebtn = () => cy.get('[title="Edit"]') 
    deleteSitebtn = () => cy.get('[title="Delete"]') 
    getModalMsg = () => cy.get('[class="swal-title"]') 
    getNoResultMsg = () => cy.get('[class="footable-empty"]') 


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

