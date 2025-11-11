export class CreateCategoryPage {
    txtCategoryName = () => cy.get('[title="Enter the desired category and select icon"]');
    sltSubCategory = () => cy.get('#select2-categoryDropdown-container');
    txtSearchSubCategory = () => cy.get('[type="search"]');
    sltOptions = () => cy.get('.select2-results__option');
    btnSave = () => cy.get('[title="Save"]');

    createCategory(categoryName) {
        this.txtCategoryName().type(categoryName)
        // Currently we don't have subcategory available
        // this.sltSubCategory().click()
        // this.txtSearchSubCategory().type('test')
        // cy.wait('@allCategories').its('response.statusCode').should('eq', 200);
        // this.sltOptions().eq(0).click()
        this.btnSave().click()
        cy.wait('@allCategories').its('response.statusCode').should('eq', 200);
    }
}

