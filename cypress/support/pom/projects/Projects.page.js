export class ProjectsPage {
    txtSearch = () => cy.get('#searchField');
    btnFilterDate = () => cy.contains('Start date');

    filterDate(){
    this.btnFilterDate.click();
  
    }


}