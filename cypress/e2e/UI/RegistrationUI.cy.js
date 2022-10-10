/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';
import { loginPage } from '../../page_objects/loginPage';
import { register } from '../../page_objects/register';


let user = {
  email: faker.internet.email(),
  password: faker.internet.password(),
  users: faker.datatype.number({
    'min': 1,
    'max': 10
  })
}

describe('Register UI', () => {
  beforeEach("Visit Vivifyscrum register page", () => {
    register.functionVisitRegisterPage();
  })

  it('Register NEG - invalid email', () => {
    register.register("testtestgmail.com", user.password, user.users);
    loginPage.errorAlertEmail();
  })

  it('Register NEG - blank email', () => {
    register.register(" ", user.password, user.users);
    loginPage.errorAlertEmail();
  })

  it('Register NEG - invalid password', () => {
    register.register(user.email, "aa", user.users);
    loginPage.errorAlertPassword()
  })

  it('Register NEG - blank password', () => {
    register.register(user.email, " ", user.users);
    loginPage.errorBlankPasswordReg();
  })

  it('Register NEG - invalid form number of users', () => {
    register.register(user.email, user.password, "text");
    loginPage.errorInvalidNumberOfUsers();
  })

  it('Register NEG - blank number of users', () => {
    register.register(user.email, user.password, " ");
    loginPage.errorBlankNumberOfUsers();
  })

  it('Register new account', () => {
    register.registerFunction();
  })

})
