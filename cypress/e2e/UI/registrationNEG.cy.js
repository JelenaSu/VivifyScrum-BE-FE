/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';
import { loginPage } from '../../page_objects/loginPage';
import { register } from '../../page_objects/register';
import { error } from '../../page_objects/error';

let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

describe('Register UI', () => {
    beforeEach ('Visit Vivifyscrum page', () => {
      cy.visit('/');
      cy.url().should('contain', 'https://cypress.vivifyscrum-stage.com/');
      cy.url().should('contain', '/login');
      register.signUpBtn.should('exist');
      register.clickOnSignUpBtn();
    })

    it('Register NEG - invalid email', ()=> {
        register.register("testtestgmail.com", user.password, "10");
        cy.url().should('contain', 'https://cypress.vivifyscrum-stage.com/');
        error.errorMsg.should('exist');
    })

    it('Register NEG - invalid password', ()=> {
        register.register(user.email, "aa", "10");
        cy.url().should('contain', 'https://cypress.vivifyscrum-stage.com/');
    })

})
   