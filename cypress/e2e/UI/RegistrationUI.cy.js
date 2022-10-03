/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';
import { loginPage } from '../../page_objects/loginPage';
import { register } from '../../page_objects/register';

let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
  }

describe('Register UI', () => {
    before('Visit Vivifyscrum page', () => {
      cy.visit('/');
      cy.url().should('contain', 'https://cypress.vivifyscrum-stage.com/');
      cy.url().should('contain', '/login');
      register.signUpBtn.should('exist');
      register.clickOnSignUpBtn();
    })

    it('Register new account', ()=> {
        register.register(user.email, user.password, "10");
        cy.url().should('contain', '/my-organizations');
        loginPage.loginBtn.should('not.exist');
    })

})

    