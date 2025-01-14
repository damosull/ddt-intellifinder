export class DeleteSitePage { 
    deleteSitebtn = () => cy.get('[title="Delete"]') 
    getModalMsg = () => cy.get('[class="swal-title"]')  
    deleteSite() {        
        cy.intercept('POST', '/api/site/delete_site').as('deleteRequest');
        this.deleteSitebtn().click()
        this.getModalMsg().should('be.visible')
        cy.contains('Yes').click()
        cy.wait('@deleteRequest').its('response.statusCode').should('eq', 200);
        cy.reload()
        cy.intercept('POST', '/api/site/sites').as('allData');
        cy.wait('@allData').its('response.statusCode').should('eq', 200);

    }
}

