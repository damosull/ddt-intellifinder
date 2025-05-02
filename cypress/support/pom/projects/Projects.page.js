export class ProjectsPage {
    txtSearch = () => cy.get('[type="text"][placeholder="Search"]');
    //txtSearch = () => cy.get('[class="form-group footable-filtering-search"]');
    
    // btnTableRow = () => cy.get("tr");

    //btnFilterDate = () => cy.contains('Start date');

    searchProjects(testText) {
       this.txtSearch().should('be.visible');
      this.txtSearch().type(testText + '{enter}');
    //    this.txtSearch().type(testText);
       
       
      // this.siteNameOnList().eq(0).should('be.visible', { timeout: 20000 }).and('have.text', testText);
    }

    // filterDate(){
    //     this.btnFilterDate.click();
    //     }

}