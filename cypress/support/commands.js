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
            email:"test1237@gmail.com",
            password:"test1237",
            "g-recaptcha-response":""
         }
        
    }).its('body').then((response) => {
        window.localStorage.setItem('token', response.token)
    })
});

Cypress.Commands.add('Register BE', () => {
    
})


Cypress.Commands.add('Jelena', (email, password) => {
    cy.session("Jelena", () => { 
        cy.request({
            method:'POST',
            url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/login', 
            body:{
               email:"test1235test@gmail.com",
               password:"test1235test",
               "g-recaptcha-response":""
         }
        
    }).its('body').then((response) => {
        window.localStorage.setItem('token', response.token)
    })
  });
});
