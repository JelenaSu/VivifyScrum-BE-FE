/// <reference types="Cypress" />

import {loginMock } from "../../fixtures/mockAPI/login"

let token;

describe("Login through Backend", () => {
    it("Login with valid credentials through Backend", () => {
        cy.LoginBE();
        cy.visit("/")
    })

    it("Login user Jelena", () => {
        cy.Jelena();
        cy.visit("/")
    })

    it('Login mockAPI', () => {
        loginMock.post({}).then((response) => {
            token = response.body.token
            cy.writeFile('cypress/fixtures/token.json', {token: token})
        })
    })

    it('Login mockAPI with invalid email', () => {
        loginMock.post({email:"test1238gmail.com"}).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it('Login mockAPI with blank email', () => {
        loginMock.post({email: " "}).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it('Login mockAPI with invalid URL', () => {
        loginMock.post({url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/'}).then((response) => {
            expect(response.status).to.eq(404)
            cy.url().should("not.contain", "login")
        })
    })

    it('Login mockAPI with invalid password', () => {
        loginMock.post({password: "test"}).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

    it('Login mockAPI with blank password', () => {
        loginMock.post({password: " "}).then((response) => {
            expect(response.status).to.eq(401)
        })
    })

})
