export class CategoriesPage {
    btnDelete = () => cy.get('.btn.btnDeleteCat');
    editButtons = () => cy.get('[title="Edit"]');
    btnCreateCategory = () => cy.get('[routerlink="../create-category"]');
    txtSearch = () => cy.get('#searchCat');
    btnSearch = () => cy.get('.btnSearchOrange');
    categoryContainer = () => cy.get('.category-container');
    categoryName = () => cy.get('li[role="treeitem"] .col-sm-6 strong');

    clickDeleteButtonForFirstRecord() {
        this.btnDelete().eq(0).click();
    }

    clickEditButtonForFirstRecord() {
        cy.intercept('GET', '**/categories/update-category/*').as('updateCategory');
        this.editButtons().eq(0).click();
        cy.wait('@updateCategory').its('response.statusCode').should('eq', 200);
    }

    searchCategory(categoryName) {
        this.txtSearch().clear().type(categoryName);
        this.btnSearch().click();
        cy.wait('@allCategories').its('response.statusCode').should('eq', 200);
    }

    verifyCategoryDeleted() {
        this.categoryContainer().should('contain', 'No results');
    }

    verifyCategoryIsVisible(categoryName) {
        cy.get('strong').should('contain.text', categoryName);
    }

    getFirstCategoryName() {
        return this.categoryName().eq(1).invoke('text').then((text) => text.trim());
        // Note: we need to use 'eq(1)' because the first element is the column header value
    }
}
