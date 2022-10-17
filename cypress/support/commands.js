import 'cypress-file-upload';
import '@4tw/cypress-drag-drop';
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
// -- This is a dual command -
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })



Cypress.Commands.add('LoginBE', (email, password) => {
    cy.request({
        method:'POST',
        url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/login', 
        body:{
            email:"test1238@gmail.com",
            password:"test1238",
            "g-recaptcha-response":""
         }
        
    }).its('body').then((response) => {
        window.localStorage.setItem('token', response.token)
    })
});

Cypress.Commands.add('Jelena', () => {
    cy.session("Jelena", () => { 
        cy.request({
            method:'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/login', 
            body:{
               email:"test1238@gmail.com",
               password:"test1238",
               "g-recaptcha-response":""
         }
        
    }).its('body').then((response) => {
        // token = response.body.token
        cy.writeFile("cypress/fixtures/tokenData.json", { token: response })
        window.localStorage.setItem('token', response.token)
    })
  });
});
