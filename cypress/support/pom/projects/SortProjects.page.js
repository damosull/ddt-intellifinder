export class SortProjectsPage {


    sltDataTable = () => cy.get('[class="table modern-table footable footable-1 footable-filtering footable-filtering-right footable-paging footable-paging-center breakpoint-lg"]');

    btnSorTableSSubject = () => cy.get('th:contains("Subject")');
    btnSorTableStartDate = () => cy.get('th:contains("Start date")');
    btnSorTableEndDate = () => cy.get('th:contains("End date")');

    btnStartIcon = () => cy.get('[class="fooicon fooicon-sort"]');
    


    // sorTableSubject(){
    //     this.btnSorTableSSubject().click();
    // }

    sorTableStartDate(){
    this.btnSorTableStartDate().click();
    //this.btnSorTableStartDate().next('[class="fooicon fooicon-sort"]').click();
    // this.sltDataTable.within(() => {cy.contains('.footable-sortable', 'Start date').click(); }
    //this.btnStartIcon().click();
    }

    // sorTableEndDate(){
    //     this.btnSorTableEndDate().click();
    // }

    sortedAscIcon(){
        this.btnSorTableStartDate().find('[class="fooicon fooicon-sort-asc"]').should('be.visible');
        //this.btnSortedAscIcon.should('exist');
        //this.btnSortedAscIcon.should('be.visible');
    }

     sortedDescIcon(){
        this.btnSorTableStartDate().find('[class="fooicon fooicon-sort-desc"]').should('be.visible');
    }

    sortedDateData(){
   // const dateData = (cells$) => cy._.map(cells$, 'textContent');
   // 
   //this.btnSorTableStartDate.then((cells) => {
   //const timestamps = Cypress._.map($cells,($cell) => $cell.innerText)
   // });
    }

    paginationFooterCount(){
    //class="label label-default"
    }

}