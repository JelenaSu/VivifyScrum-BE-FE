/// <reference types="Cypress" />

describe ("Login through Backend", ()=>{
    it("Login with valid credentials through Backened", ()=>{
        cy.LoginBE();
        cy.visit("/")
    });
});