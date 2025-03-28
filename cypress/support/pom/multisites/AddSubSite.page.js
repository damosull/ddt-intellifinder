export class AddSubSitePage {
    btnAddSubSite= () => cy.get('[title="Sub-sites"]');
    sltPlanDrawingImg= () => cy.get('#planDrawingImg');
    sltSubSiteDropDown = () => cy.get('[id="select2-availableSites-container"]');
    sltDropDownResult = () => cy-get('[id="select2-availableSites-results"]');
    btnSaveSubSite = () => cy.get('.btn btn-success customBtn');

   //    addSubSites(){
   //       this.sltPlanDrawingImg().click();
   //   }

    sltPSubSite() {
        // //click on subsite icon under the image
        // cy.intercept('POST', '/api/multiSites/get_sub_sites').as('allSubSites');
        // this.btnAddSubSite().click();
        // cy.wait('@allSubSites').its('response.statusCode').should('eq', 200);

        // //click somewhere on the image
        // cy.intercept('POST', '/api/multiSites/get_available_sites').as('getSubSiteDropdown');
        // this.sltPlanDrawingImg().click();
        // cy.wait('@getSubSiteDropdown').its('response.statusCode').should('eq', 200);
    }

    addPSubSite()  {

    // this.sltSubSiteDropDown().click().sltDropDownResult().click().select('2');
    // this.sltSubSiteDropDown().click().select('1').and('have.text', /DEFAULT/i);
    // this.btnSaveSubSite();

    }

}

