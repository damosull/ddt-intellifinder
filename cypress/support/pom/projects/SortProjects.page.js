export class SortProjectsPage {

    sltDataTable = () => cy.get('[class="table modern-table footable footable-1 footable-filtering footable-filtering-right footable-paging footable-paging-center breakpoint-md"]');

    btnSorTableSubject = () => cy.get('th:contains("Subject")');
    btnSorTableStartDate = () => cy.get('th:contains("Start date")');
    btnSorTableEndDate = () => cy.get('th:contains("End date")');

    btnStartIcon = () => cy.get('[class="fooicon fooicon-sort"]'); // start icon before sorting

    tableSubject(sortedIcon){
        cy.wait(2000);
        this.btnSorTableSubject().click();

        cy.wait(500);
        this.btnSorTableSubject().find(sortedIcon).should('be.visible');
    }

    tableStartDate(sortedIcon){
        cy.wait(2000);
        this.btnSorTableStartDate().click();

        cy.wait(500);
        this.btnSorTableStartDate().find(sortedIcon).should('be.visible');

    }

    tableEndDate(sortedIcon){
        cy.wait(2000);
        this.btnSorTableEndDate().click();

        cy.wait(500);
        this.btnSorTableEndDate().find(sortedIcon).should('be.visible');

    }

    sortSubject(sortedIconAsc, sortedIconDesc, column){
        this.tableSubject(sortedIconAsc);
        this.sortedDateDataAscending(column); // Iterate over each row and extract the 2nd column (index 1 etc.)

        this.tableSubject(sortedIconDesc);
        this.sortedDateDataDescending(column);
    }

    sortStartDate(sortedIconAsc, sortedIconDesc, column){
        this.tableStartDate(sortedIconAsc);
        this.sortedDateDataAscending(column);

        this.tableStartDate(sortedIconDesc);
        this.sortedDateDataDescending(column);
    }

    sortEndDate(sortedIconAsc, sortedIconDesc, column){
        this.tableEndDate(sortedIconAsc);
        this.sortedDateDataAscending(column);

        this.tableEndDate(sortedIconDesc);
        this.sortedDateDataDescending(column);
    }

    sortedDateDataAscending(column) {

        this.sltDataTable().find('tbody').then((rows) => {
          const dates = [];
      
          Cypress.$(rows).each((row) => {
            const cellText = Cypress.$(row).find('td').eq(column).text().trim();
            //expect(cellText).to.increase(row, 'val');
            const date = new Date(cellText);
            if (!isNaN(date)) { dates.push(date);}
            });
        
            // expect(dates).to.be.strictly.increasing;
          const sorted = [...dates].sort((a, b) => a - b);
          expect(dates).to.deep.equal(sorted);
        });

      }
   
    sortedDateDataDescending(column){
        this.sltDataTable().find('tbody').then((rows) => {
            const dates = [];
           
            Cypress.$(rows).each((row) => {
              const cellText = Cypress.$(row).find('td').eq(column).text().trim();
              const date = new Date(cellText);
              if (!isNaN(date)) { dates.push(date);}
            });
        
            const sorted = [...dates].sort((b, a) => b - a);
            expect(dates).to.deep.equal(sorted);
          });
    }

}