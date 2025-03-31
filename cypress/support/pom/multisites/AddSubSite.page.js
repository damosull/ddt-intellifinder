export class AddSubSitePage {

    //select image 
    btnAddSubSite= () => cy.get('[title="Sub-sites"]');
    sltPlanDrawingImg= () => cy.get('#planDrawingImg');

    //create new site when adding a Sub Site
    sltSubSiteDropDown = () => cy.get('#select2-availableSites-container');
    // btnAddSubSiteOPtion = () => cy.get('[class="btn btn-warning btn-xs"]');
    // txtSubSiteName = () => cy.get('[title="Site name"]');
    // txtLatitude = () => cy.get('[type="number"]').eq(0);
    // txtLongitude = () => cy.get('[type="number"]').eq(1);
    // selectCategory = () => cy.get('#select2-categoryDropdown-container');
    // sitePicture = () => cy.get('#sitePic');
    // btnSave = () => cy.get('[title="Save"]');
    
    //add Sub Site to an image
    sltDropDownResult = () => cy.get('.select2-results__options');
    btnSaveSubSite = () => cy.get('.btn.btn-success.customBtn');
   
    sltSubSite() {
        //click on SubSite icon under the image
        cy.intercept('POST', '/api/multiSites/get_sub_sites').as('allSubSites');
        this.btnAddSubSite().eq(0).click();
        cy.wait('@allSubSites').its('response.statusCode').should('eq', 200);

        //click somewhere on the image
        cy.intercept('POST', '/api/multiSites/get_available_sites').as('getSubSiteDropdown');
        this.sltPlanDrawingImg().click();
        cy.wait('@getSubSiteDropdown').its('response.statusCode').should('eq', 200);
    }

    //currently not tested feature
    // createSubSite(subSiteName, latitude, longitude) { 
    //     // open the select dropdown
    //      this.sltSubSiteDropDown().click();

    //      this.btnAddSubSiteOPtion().click();
    //      this.txtSubSiteName().clear().type(subSiteName);
    //      this.txtLatitude().clear().type(latitude);
    //      this.txtLongitude().clear().type(longitude);
    //      this.selectCategory().click();
    //      cy.intercept('POST', '/api/categories/all_categories').as('postRequest');
    //      this.txtCategorySearch().type('Default');
    //      cy.wait('@postRequest').its('response.statusCode').should('eq', 200);
    //      this.txtCategorySearchOptions().eq(0).click();
    //      this.sitePicture().attachFile('testImage.jpg');

    //      cy.intercept('POST', '/api/site/new_site').as('saveRequest');
    //      cy.intercept('POST', '/api/site/sites').as('allSitesRequest');
    //      this.btnSave().click()
    //      cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);
    //      cy.wait('@allSitesRequest').its('response.statusCode').should('eq', 200);
    //     }

    addPSubSite(){
        // open the select dropdown
        this.sltSubSiteDropDown().click(); 

        // Wait for dropdown options to be visible and select "Default".
        this.sltDropDownResult().contains('Default').click({ force: true });
    
        // Click the save button
        this.btnSaveSubSite().click();
    }
    
}

