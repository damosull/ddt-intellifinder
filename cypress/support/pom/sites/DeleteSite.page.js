export class DeleteSitePage {
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
    
    deleteSite() {        
        cy.intercept('POST', '/api/site/delete_site').as('deleteRequest');
        this.deleteSitebtn().click()
        this.getModalMsg().should('be.visible')
        cy.contains('Yes').click()
        cy.wait('@deleteRequest').its('response.statusCode').should('eq', 200);
        cy.reload()
    }
}

