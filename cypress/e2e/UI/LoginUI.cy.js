/// <reference types="Cypress" />

import { loginPage } from "../../page_objects/loginPage"
import data from '../../fixtures/data.json'

describe('Login UI', () => {
  beforeEach("Visit base URL", () => {
    loginPage.functionVisitBaseUrl();
  })

  it("Login with valid credentials", () => {
    loginPage.loginFunction(Cypress.env("validLoginEmail"), Cypress.env("validLoginPassword"))
  })

  it("Login unregistered user", () => {
    loginPage.loginInvalidFunction(data.unregisteredEmail, data.unregisteredPassword)
    loginPage.errorUnregisteredUser()
  })

  it("Login with invalid email", () => {
    loginPage.loginInvalidFunctionNoMsg(data.invalidEmail, Cypress.env("validLoginPassword"))
    loginPage.errorAlertEmail()
  })

  it("Login with invalid password", () => {
    loginPage.loginInvalidFunctionNoMsg(Cypress.env("validLoginEmail"), data.invalidPassword)
    loginPage.errorAlertPassword()
  })

  it("Login with blank email", () => {
    loginPage.loginInvalidFunctionNoMsg(" ", Cypress.env("validLoginPassword"))
    loginPage.errorBlankEmail()
  })

  it("Login with blank password", () => {
    loginPage.loginInvalidFunctionNoMsg(Cypress.env("validLoginEmail"), " ")
    loginPage.errorBlankPassword()
  })

  it("Login with blank email and password", () => {
    loginPage.loginInvalidFunctionNoMsg(" ", " ")
    loginPage.errorBlankEmail()
    loginPage.errorBlankPassword()
  })

})
