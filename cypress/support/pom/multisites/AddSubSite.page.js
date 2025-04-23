export class AddSubSitePage {

    //select image 
    btnAddSubSite= () => cy.get('[title="Sub-sites"]');
    sltPlanDrawingImg= () => cy.get('#planDrawingImg');

    //create new site when adding a Sub Site
    sltSubSiteDropDown = () => cy.get('#select2-availableSites-container');

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

    addPSubSite(){
        // open the select dropdown
        this.sltSubSiteDropDown().click(); 

        // Wait for dropdown options to be visible and select "Default".
        this.sltDropDownResult().contains('Default').click({ force: true });
    
        // Click the save button
        this.btnSaveSubSite().click();
    }
    
}

