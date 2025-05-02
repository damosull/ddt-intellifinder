export class AddSubSitePage {

    //select image 
    btnAddSubSite= () => cy.get('[title="Sub-sites"]');
    sltPlanDrawingImg= () => cy.get('#planDrawingImg');

    //create new site when adding a Sub Site
    sltSubSiteDropDown = () => cy.get('#select2-availableSites-container');

    sltDropDownSearchField = () => cy.get('.select2-container--open .select2-search__field');
  
    //add Sub Site to an image
    sltDropDownResult = () => cy.get('.select2-results__options');

    btnSaveSubSite = () => cy.get('.btn.btn-success.customBtn');
    toastMultiSiteCreated = () => cy.get('.toast-text').contains('Site updated.');
   
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

    // open the select dropdown and wait for dropdown options to be visible Find the Select2 search input field that appears type Default and select "Default".
    addPSubSite(){
        this.sltSubSiteDropDown().click();
        cy.get('.select2-container--open .select2-search__field').should('be.visible').type('Default' + '{enter}', { force: true });

        // this.sltDropDownResult().should('contain.text', 'Default').click({ force: true });

        cy.wait(500);
        this.sltSubSiteDropDown().should('contain.text', 'Default');
  
        cy.intercept('POST', '/api/multiSites/submit_sub_site').as('saveSubSite');
        this.btnSaveSubSite().click();
        cy.wait('@saveSubSite').its('response.statusCode').should('eq', 200);

        cy.intercept('POST', '/api/multiSites/get_sub_sites').as('allSubSite');
        cy.wait('@allSubSite').its('response.statusCode').should('eq', 200);
    }
    
}

