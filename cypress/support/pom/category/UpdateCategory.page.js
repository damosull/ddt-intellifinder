export class UpdateCategoryPage {
    txtCategoryName = () => cy.get(':nth-child(3) > .col-sm-12 > .form-control');
    btnSave = () => cy.get('[title="Save"]');

    updateCategoryName(newName) {
        this.txtCategoryName().clear().type(newName);
        this.btnSave().click();
        cy.wait('@allCategories').its('response.statusCode').should('eq', 200);
    }
}

