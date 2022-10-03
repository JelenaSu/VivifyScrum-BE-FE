/// <reference types="Cypress" />

import { loginPage } from "../../page_objects/loginPage"
import { general } from "../../page_objects/general"

describe('Login UI', () => {
    before('Visit Vivifyscrum page', () => {
      cy.visit('/');
      cy.url().should('contain', 'https://cypress.vivifyscrum-stage.com/');
      general.headerTitle.should('contain', 'Log in with your existing account');
      cy.url().should('contain', '/login');
      loginPage.loginBtn.should('exist');
    });

    var token;


    it("Login with valid credentials", () => {
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/login').as('login')
        loginPage.login(Cypress.env('validLoginEmail'), Cypress.env('validLoginPassword'));
        cy.wait('@login').then((intercept) => {
          expect(intercept.response.statusCode).to.eq(200);
          expect(intercept.response.url).to.eq('https://cypress-api.vivifyscrum-stage.com/api/v2/login');
          expect(intercept.request.body.email).to.eq(Cypress.env('validLoginEmail'));
          expect(intercept.request.body.password).to.eq(Cypress.env('validLoginPassword'));
         token = intercept.response.body.token;
        });
     });
});



