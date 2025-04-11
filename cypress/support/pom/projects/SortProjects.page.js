export class SortProjectsPage {

    sltDataTable = () => cy.get('[class="table modern-table footable footable-1 footable-filtering footable-filtering-right footable-paging footable-paging-center breakpoint-md"]');

    btnSorTableSSubject = () => cy.get('th:contains("Subject")');
    btnSorTableStartDate = () => cy.get('th:contains("Start date")');
    btnSorTableEndDate = () => cy.get('th:contains("End date")');

    btnStartIcon = () => cy.get('[class="fooicon fooicon-sort"]');
    sltTableRow = () => cy.get('tr');

    // sorTableSubject(){
    //     this.btnSorTableSSubject().click();
    // }

    sorTableStartDate(){
    this.btnSorTableStartDate().click();
    }

    // sorTableEndDate(){
    //     this.btnSorTableEndDate().click();
    // }

    sortedAscIcon(){
        this.btnSorTableStartDate().find('[class="fooicon fooicon-sort-asc"]').should('be.visible');
    }

     sortedDescIcon(){
        this.btnSorTableStartDate().find('[class="fooicon fooicon-sort-desc"]').should('be.visible');
    }

    sortedDateDataAcceding(){
    this.sltDataTable().then((cells) => {
    const dates = Array.from(cells).map(cell => 
    Date(cell.textContent));

    const sortedDates = [...dates].sort((a, b) => a - b);
    expect(dates).to.deep.equal(sortedDates);
    });
    }

    sortedDateDataDescending(){
    this.sltDataTable().then((cells) => {
    const dates = Array.from(cells).map(cell => 
    Date(cell.textContent));

    const sortedDates = [...dates].sort((b, a) => b - a);
    expect(dates).to.deep.equal(sortedDates);
    });
    }



    // paginationFooterCount(){
    // //class="label label-default"
    // }

}