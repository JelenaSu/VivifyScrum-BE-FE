import { faker } from '@faker-js/faker';
import data from '../fixtures/data.json'

let user = {
    email: faker.internet.email(),
    password: faker.internet.password(),
    users: faker.datatype.number({
      'min': 1,
      'max': 10
    })
  }

class Register {
    
    get signUpBtn() {
        return cy.get('a[data-cy="login-sign-up-link"]');
    }

    get freeSignUpBtn() {
        return cy.get('.vsp-c-pricing-plan-list--annual > :nth-child(1) > .vsp-c-btn');
    }

    get emailInput() {
        return cy.get("input[name='email']");
    }

    get passwordInput() {
        return cy.get("input[name='password']").first();
    }

    get numberOfUsersInput() {
        return cy.get('input[name="number_of_users"]');
    }

    get startFreeTrialBtn() {
        return cy.get("button[type='submit']");
    }

    get errorMsgEmail() {
        return cy.get ('[class="el-form-item__error el-form-item-error--top"]');
    }

    get errorBlankEmail() {
        return cy.get ('.vs-c-form-item__error-wrapper > .el-form-item__error')
    }

    get errorMsgPassword() {
        return cy.get (':nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error');
    }

    get errorMsgNumber() {
        return cy.get (':nth-child(3) > .vs-c-form-item__error-wrapper > .el-form-item__error');
        // [data-cy="login-sign-up-link"]
    }

    clickOnStartFreeTrialBtn() {
        this.startFreeTrialBtn.click();
    }

    clickOnSignUpBtn() {
        this.signUpBtn.click();
    }

    clickOnFreeSignUpBtn() {
        this.freeSignUpBtn.should("be.visible").click({force:true});
    }

    register(email, password, number) {
        // this.freeSignUpBtn.click({force: true});
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.numberOfUsersInput.should('be.visible').type(number);
        this.clickOnStartFreeTrialBtn();
    }

    functionVisitRegisterPage() {
        cy.visit('https://cypress.vivifyscrum-stage.com/sign-up?type=yearly&plan=1&event=page-card');
        cy.url().should('contain', 'https://cypress.vivifyscrum-stage.com/');
        // general.headerTitleLogin.should('have.text', data.headerTitleLogin);
        cy.url().should('contain', '/sign-up');
        register.startFreeTrialBtn.should("be.visible")
        
        }

       
    registerFunction(email, password, users) {
        cy.intercept('POST', 'https://cypress-api.vivifyscrum-stage.com/api/v2/register').as('register')
        register.register(email = user.email, password = user.password, users = user.users);
        cy.wait('@register').then((intercept) => {
           expect(intercept.response.statusCode).to.eq(200);
           expect(intercept.response.url).to.eq('https://cypress-api.vivifyscrum-stage.com/api/v2/register');
        return intercept.response
        })
    }

    registerBE(email, password, users) {
        return cy.request({
            method: 'POSt',
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/register",
            body: {
                email: email,
                password: password,
                "repeatpassword":"probaprobba",
                "agreed_to_terms":true,
                "g-recaptcha-response":"",
                "finished_registration":true,
                "plan_id":"1",
                "plan_type":"yearly",
                number_of_users: users,
                "referal":null
            },
          }).then((response) => {
            return response
        })

      }

    }

export const register = new Register();