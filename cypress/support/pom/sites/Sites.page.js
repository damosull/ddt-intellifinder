export class SitesPage {
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

    searchSite(siteName,latitude,longitude) {
        cy.url().should('include', '/sites/list-sites-by-category/');
        cy.intercept('POST', '/api/site/sites').as('searchRequest');
        this.getSiteListViewSearch().type(siteName+'{enter}', { force: true })
        cy.wait('@searchRequest').its('response.statusCode').should('eq', 200);
        this.getSiteNameOnList().eq(0).should('have.text', siteName);
        this.getTableCell().eq(2).should('have.text', 'Lat. '+latitude+' Lon. '+longitude);
    }
    searchSiteWithZeroRecord(siteName) {
        cy.url().should('include', '/sites/list-sites-by-category/');
        cy.intercept('POST', '/api/site/sites').as('searchRequest');
        this.getSiteListViewSearch().clear().type(siteName+'{enter}')
        cy.wait('@searchRequest').its('response.statusCode').should('eq', 200);
        this.getNoResultMsg().should('be.visible')
    }
}

