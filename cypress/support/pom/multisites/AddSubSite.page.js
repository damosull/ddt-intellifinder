export class AddSubSitePage {

    //select image 
    btnAddSubSite= () => cy.get('[title="Sub-sites"]');
    sltPlanDrawingImg= () => cy.get('#planDrawingImg');

    //create new site when adding a Sub Site
    sltSubSiteDropDown = () => cy.get('#select2-availableSites-container');
  
    btnSaveSubSite = () => cy.get('.btn.btn-success.customBtn');
    toastMultiSiteCreated = () => cy.get('.toast-text').contains('Site updated.');
      
    addSubSite(){
        //click on SubSite icon under the image
        cy.intercept('POST', '/api/multiSites/get_sub_sites').as('allSubSites');
        this.btnAddSubSite().eq(0).click();
        cy.wait('@allSubSites').its('response.statusCode').should('eq', 200);

        // //click somewhere on the image
        cy.intercept('POST', '/api/multiSites/get_available_sites').as('getSubSiteDropdown');
        this.sltPlanDrawingImg().click();
        cy.wait('@getSubSiteDropdown').its('response.statusCode').should('eq', 200);

        this.sltSubSiteDropDown().click();

        cy.wait(2000)
        cy.get('.select2-results__option').eq(1).invoke('text').then((text) => {
            cy.wrap(text).as('selectedSubSiteName');
          });
        
        cy.get('.select2-results__option').eq(1).click();

        cy.get('@selectedSubSiteName').then((selectedSubSiteName) => {
            cy.log('Second Time:', selectedSubSiteName);
            this.sltSubSiteDropDown().should('contain.text', selectedSubSiteName);
          });

        cy.intercept('POST', '/api/multiSites/submit_sub_site').as('saveSubSite');
        this.btnSaveSubSite().click();
        cy.wait('@saveSubSite').its('response.statusCode').should('eq', 200);

        cy.intercept('POST', '/api/multiSites/get_sub_sites').as('allSubSite');
        cy.wait('@allSubSite').its('response.statusCode').should('eq', 200);

        this.toastMultiSiteCreated().should('be.visible');
    }
   
}