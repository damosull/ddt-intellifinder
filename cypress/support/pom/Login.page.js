export class LoginPage {
    txtUsername = () => cy.get('#username');
    txtPassword = () => cy.get('#password');
    btnLogin = () => cy.get('#kc-login');

    login() {
        this.txtUsername().type('fivercompanyadmin@intellifinder.dk')
        this.btnLogin().click()
        this.txtPassword().type('^Gx|pTj682I|IkDypM2V')
        this.btnLogin().click()
        cy.contains('Yes', { timeout: 40000 }).should('be.enabled').click();
        cy.get('h2', { timeout: 30000 }).should('have.text', 'Overview');
    }
}
