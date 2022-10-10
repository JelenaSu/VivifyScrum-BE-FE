import { general } from "../page_objects/general"
import data from "../fixtures/data.json"

class LoginPage {

    get emailInput() {
        return cy.get('input[type="email"]');
    }

    get passwordInput() {
        return cy.get('input[type="password"]');
    }

    get loginBtn() {
        return cy.get('button[type="submit"]');
    }

    clickOnLoginBtn() {
        this.loginBtn.click();
    }

    login(email, password) {
        this.emailInput.should('be.visible').type(email);
        this.passwordInput.should('be.visible').type(password);
        this.loginBtn.should('be.visible').click();
    }

    backendLogin() {
        return cy.request({
            method: "POST",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
            body: {
                email: "test1236@gmail.com",
                password: "test1236",
                "g-recaptcha-response": ""
            }

        }).then((response) => {
            window.localStorage.setItem("token", response.body.token)
            window.localStorage.setItem('user_id', response.body.user.id);
            window.localStorage.setItem('user', JSON.stringify(response.body.user));
            return response.body.token;
        })
    }

    loginFunction(email, password) {
        cy.visit("/");
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/login').as('validLogin');
        cy.url().should('contain', "/login");
        loginPage.login(email, password);
        cy.url().should('contain', "https://cypress.vivifyscrum-stage.com/my-organizations")
        cy.wait('@validLogin').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200)
            expect(intercept.response.url).to.eq('https://cypress-api.vivifyscrum-stage.com/api/v2/login');
            expect(intercept.request.body.email).to.eq(Cypress.env('validLoginEmail'));
            expect(intercept.request.body.password).to.eq(Cypress.env('validLoginPassword'));
            expect(intercept.response.statusMessage).to.eq("OK")
            return intercept.response
        })
    }

    loginInvalidFunctionNoMsg(email, password) {
        cy.visit("/");
        cy.url().should("contain", "/login");
        loginPage.login(email, password);
        cy.url().should("not.contain", "/my-organizations").then((response) => {
            return response
        })
    }

    loginInvalidFunction(email, password) {
        cy.visit("/");
        cy.url().should("contain", "/login");
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/login').as('invalidLogin');
        loginPage.login(email, password);
        cy.wait('@invalidLogin').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(401)
            expect(intercept.response.url).to.eq('https://cypress-api.vivifyscrum-stage.com/api/v2/login');
            expect(intercept.response.statusMessage).to.eq("Unauthorized")
            return intercept.response
        })
    }

    errorUnregisteredUser() {
        general.alertCredentials.should("have.text", data.badCredentials)
            .and("have.css", "color", "rgb(187, 57, 22)")
            .and("have.css", "font-family", "OpenSans, sans-serif")
    }

    errorAlertEmail() {
        general.alertEmail.should("have.text", data.alertEmail)
            .and("have.css", "color", "rgb(187, 57, 22)")
            .and("have.css", "font-family", "OpenSans, sans-serif")
    }

    errorAlertPassword() {
        general.alertPassword.should("have.text", data.alertPassword)
            .and("have.css", "color", "rgb(187, 57, 22)")
            .and("have.css", "font-family", "OpenSans, sans-serif")
    }

    errorBlankEmail() {
        general.emptyEmail.should("have.text", data.emptyEmail)
            .and("have.css", "color", "rgb(187, 57, 22)")
            .and("have.css", "font-family", "OpenSans, sans-serif")
    }

    errorBlankPassword() {
        general.emptyPassword.should("have.text", data.emptyPassword)
            .and("have.css", "color", "rgb(187, 57, 22)")
            .and("have.css", "font-family", "OpenSans, sans-serif")
    }

    errorBlankPasswordReg() {
        general.emptyPasswordReg.should("have.text", data.emptyPassword)
            .and("have.css", "color", "rgb(187, 57, 22)")
            .and("have.css", "font-family", "OpenSans, sans-serif")
    }

    errorInvalidNumberOfUsers() {
        general.invalidNumberOfUsers.should("have.text", data.invalidNumberUsers)
            .and("have.css", "color", "rgb(187, 57, 22)")
            .and("have.css", "font-family", "OpenSans, sans-serif")
    }

    errorBlankNumberOfUsers() {
        general.blankNumberOfUsers.should("have.text", data.blankNumberOfUsers)
            .and("have.css", "color", "rgb(187, 57, 22)")
            .and("have.css", "font-family", "OpenSans, sans-serif")
    }

    functionVisitBaseUrl() {
        cy.visit('/');
        cy.url().should('contain', 'https://cypress.vivifyscrum-stage.com/');
        general.headerTitleLogin.should('have.text', data.headerTitleLogin);
        cy.url().should('contain', '/login');
        loginPage.loginBtn.should('exist');
    }

}



export const loginPage = new LoginPage();
