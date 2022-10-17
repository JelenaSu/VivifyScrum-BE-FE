import { loginPage } from "../page_objects/loginPage"
import { board } from "../page_objects/board"

class NewOrganization {

    get newOrganizationBtn() {
        return cy.get('[class="vs-c-my-organization__avatar"]')
    }

    get newOrganizationNameInput() {
        return cy.get('input[name="name"]')
    }

    get newOrganizationNextBtn() {
        return cy.get('[name="next_btn"]')
    }

    get newOrganizationCreateBtn() {
        return cy.get('[name="next_btn"]')
    }

    get newOrganizationLogoSign() {
        // return cy.get('[class="vs-c-my-organization__avatar"]')
        return cy.get('[class="vs-c-site-logo vs-u-cursor--pointer"]')
    }

    get boardClickBtn() {
        return cy.get('.vs-c-modal--features-button > .vs-c-btn')
    }

    get modalBtn() {
        return cy.get('.vs-c-modal--features-button > .vs-c-btn')
    }

    clickModalBtn() {
        this.modalBtn.click()
    }

    
    createNewOrganizationFunction(name) {
        cy.visit("https://cypress.vivifyscrum-stage.com/my-organizations");
        this.newOrganizationLogoSign.click()
        this.newOrganizationBtn.scrollIntoView().click()
        this.newOrganizationNameInput.type(name)
        this.newOrganizationNextBtn.click()
        this.newOrganizationCreateBtn.click()
        this.boardClickBtn.click()
    }



    beforeNewOrganizationLogin(email, password) {
        cy.visit("/");
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/login').as('validLogin');
        cy.url().should('contain', "/login");
        loginPage.login(email, password);
        // cy.url().should('contain', "https://cypress.vivifyscrum-stage.com/my-organizations")
        return cy.wait('@validLogin').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200)
            expect(intercept.response.url).to.eq('https://cypress-api.vivifyscrum-stage.com/api/v2/login');
            expect(intercept.request.body.email).to.eq(Cypress.env('validLoginEmail'));
            expect(intercept.request.body.password).to.eq(Cypress.env('validLoginPassword'));
            expect(intercept.response.statusMessage).to.eq("OK")
            return intercept.response
        })
    }

    NewOrganizationCreateBoard(name) {
        cy.intercept("POST", "https://cypress-api.vivifyscrum-stage.com/api/v2/boards").as("createBoard")
        board.createBoard(name);
        return cy.wait('@createBoard').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(201)
            expect(intercept.response.statusMessage).to.eq("Created")
            return intercept.response 
        })
    }

    NewOrgCreateBoard(name) {
        cy.intercept("POST", "https://cypress-api.vivifyscrum-stage.com/api/v2/boards").as("createBoard")
        board.createBoardAfterOrg(name);
        return cy.wait('@createBoard').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(201)
            expect(intercept.response.statusMessage).to.eq("Created")
            return intercept.response 
        })
    }

    createNewOrganizationIDfunction(name) {
        cy.intercept("POST", "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations").as("createOrgID")
        newOrganization.createNewOrganizationFunction(name);
        return cy.wait('@createOrgID').then((intercept =>{
            expect(intercept.response.statusCode).to.eq(201)
            expect(intercept.response.statusMessage).to.eq("Created")
            return intercept.response
        })
    
    )} 

    createNewOrganizationBE(token, name) {
        return cy.request({
        method: "POST",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
            body: {
                name: name,
                avatar_crop_cords: {},
                file: ""
            },
            headers: {
                authorization: `Bearer ${token}`,
            },

        }).then((response) => {
            // window.localStorage.setItem("token", response.body.token)
            window.localStorage.setItem('organizationId', response.body.id);
            // window.localStorage.setItem('user', JSON.stringify(response.body.user));
            return response;
        })
      }
    }


export const newOrganization = new NewOrganization();
