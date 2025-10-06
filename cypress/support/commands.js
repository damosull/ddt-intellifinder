// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import 'cypress-file-upload';

Cypress.Commands.add('extractDistance', (text) => {
    const regex = /(\d+(\.\d+)?)\s*km away$/;
    const match = text.match(regex);
    return match ? parseFloat(match[1]) : null;
});

Cypress.Commands.add('selectAction', (actionType, selector = 'select.actionsList') => {
    cy.get(selector)
        .should('be.visible')
        .select(actionType)
        .should('have.value', actionType);
});

Cypress.Commands.add('confirmAction', (decision) => {
    cy.intercept('PUT', '/api/Projects/save_projects').as('saveRequest');
    cy.intercept('POST', '/api/Projects/projects_with_type').as('allProjects');
    
    cy.get('.swal-title').should('be.visible');
    cy.contains(decision).click();
    
    cy.wait('@saveRequest').its('response.statusCode').should('eq', 200);
    cy.wait('@allProjects').its('response.statusCode').should('eq', 200);
});