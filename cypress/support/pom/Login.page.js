export class LoginPage {
    txtUsername = () => cy.get('#username');
    txtPassword = () => cy.get('#password');
    btnLogin = () => cy.get('#kc-login');

    login() {
        this.txtUsername().type('fivercompanyadmin@intellifinder.dk')
        this.btnLogin().click()
        this.txtPassword().type('^Gx|pTj682I|IkDypM2V')
        cy.intercept('POST', '/api/user/getLocale').as('modalRequest');
        this.btnLogin().click()
        cy.wait('@modalRequest').its('response.statusCode').should('eq', 200);
        cy.get('body').then(($body) => {
            // Check if the modal exists and is visible
            if ($body.find('[role="dialog"]').length > 0 && $body.find('[role="dialog"]').is(':visible')) {
              // If the modal is visible, click the "Yes" button
              cy.contains('Yes', { timeout: 40000 }).should('be.enabled').click();
            }
          });
        cy.get('h2', { timeout: 30000 }).should('have.text', 'Overview');
    }
}
