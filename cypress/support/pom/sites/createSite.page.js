export class CreateSitePage {
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
        cy.get('[id="sitePic"]').attachFile('testImage.jpg');
        this.gettelephone().type('1234567')
        this.getNFC().type('123')
        this.getRFIDtag().type('123')
        this.getQRCode().type('123')
        this.getDescription().type('My Desc')
        cy.intercept('POST', '/api/site/new_site').as('saveRequest');
        this.getSaveButton().click()
        cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);
        this.getSaveToast().should('have.text', 'Site created.');
    }

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
        this.getSiteListViewSearch().type(siteName+'{enter}')
        cy.wait('@searchRequest').its('response.statusCode').should('eq', 200);
        this.getNoResultMsg().should('be.visible')
    }

    editSite(siteName,latitude,longitude) {
        this.editSitebtn().eq(0).click()
        this.txtSiteName().clear().type(siteName)
        this.txtLatitude().eq(0).clear().type(latitude)
        this.txtLatitude().eq(1).clear().type(longitude)
        cy.intercept('POST', '/api/site/update_site').as('updateRequest');
        this.getSaveButton().click()
        cy.wait('@updateRequest').its('response.statusCode').should('eq', 200);
        this.getSaveToast().should('have.text', 'Site updated.');
    }
    
    deleteSite() {
        cy.wait(5000000)
        this.deleteSitebtn().click()
        this.getModalMsg().should('be.visible')
        cy.contains('Yes').click()
    }
}

