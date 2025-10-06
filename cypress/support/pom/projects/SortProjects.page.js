export class SortProjectsPage {
  ICON_ASC = '[class="fooicon fooicon-sort-asc"]';
  ICON_DESC = '[class="fooicon fooicon-sort-desc"]';
  COLUMN_SUBJECT = 0;
  COLUMN_START_DATE = 1;
  COLUMN_END_DATE = 2;

  sltDataTable = () =>
    cy.get(
      '[class="table modern-table footable footable-1 footable-filtering footable-filtering-right footable-paging footable-paging-center breakpoint-md"]'
    );

  btnSorTableSubject = () => cy.get('th:contains("Subject")');
  btnSorTableStartDate = () => cy.get('th:contains("Start date")');
  btnSorTableEndDate = () => cy.get('th:contains("End date")');

  btnStartIcon = () => cy.get('[class="fooicon fooicon-sort"]'); // start icon before sorting

  tableSubject(sortedIcon) {
    this.btnSorTableSubject().click();
    this.btnSorTableSubject().find(sortedIcon).should("be.visible");
  }

  tableStartDate(sortedIcon) {
    this.btnSorTableStartDate().click();
    this.btnSorTableStartDate().find(sortedIcon).should("be.visible");
  }

  tableEndDate(sortedIcon) {
    this.btnSorTableEndDate().click();
    this.btnSorTableEndDate().find(sortedIcon).should("be.visible");
  }

  sortSubject() {
    this.tableSubject(this.ICON_ASC);
    this.sortedDateDataAscending(this.COLUMN_SUBJECT);

    this.tableSubject(this.ICON_DESC);
    this.sortedDateDataDescending(this.COLUMN_SUBJECT);
  }

  sortStartDate() {
    this.tableStartDate(this.ICON_ASC);
    this.sortedDateDataAscending(this.COLUMN_START_DATE);

    this.tableStartDate(this.ICON_DESC);
    this.sortedDateDataDescending(this.COLUMN_START_DATE);
  }

  sortEndDate() {
    this.tableEndDate(this.ICON_ASC);
    this.sortedDateDataAscending(this.COLUMN_END_DATE);

    this.tableEndDate(this.ICON_DESC);
    this.sortedDateDataDescending(this.COLUMN_END_DATE);
  }

  sortedDateDataAscending(column) {
    const dates = [];
    this.sltDataTable()
      .find("tbody > tr:visible")
      .then((rows) => {
        Cypress.$(rows).each((index, row) => {
          const cellText = Cypress.$(row).find("td").eq(column).text().trim();
          //expect(cellText).to.increase(row, 'val');
          const date = new Date(cellText);
          if (!isNaN(date)) {
            dates.push(date);
          }
        });

        const sorted = [...dates].sort((a, b) => a - b);
        expect(dates).to.deep.equal(sorted);
      });
  }

  sortedDateDataDescending(column) {
    const dates = [];
    this.sltDataTable()
      .find("tbody > tr:visible")
      .then((rows) => {
        Cypress.$(rows).each((index, row) => {
          const cellText = Cypress.$(row).find("td").eq(column).text().trim();
          const date = new Date(cellText);
          if (!isNaN(date)) {
            dates.push(date);
          }
        });

        const sorted = [...dates].sort((a, b) => b - a);
        expect(dates).to.deep.equal(sorted);
      });
  }
}
