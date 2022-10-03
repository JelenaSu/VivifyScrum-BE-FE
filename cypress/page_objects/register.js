class Register {
    
    get signUpBtn() {
        return cy.get('[class="vs-u-font-bold vs-c-auth-modal__bottom-text-main vs-u-text--uppercase"]');
    }

    get freeSignUpBtn() {
        return cy.get(".vsp-c-pricing-plan-list--annual > :nth-child(1) > .vsp-c-btn");
        // this!!!!
    }

    get emailInput() {
        return cy.get('[data-cy="sign-up-email-input"]');
    }

    get passwordInput() {
        return cy.get('[type="password"]');
    }

    get numberOfUsersInput() {
        return cy.get('[name="number_of_users"]');
    }

    get startFreeTrialBtn() {
        return cy.get('button[type="submit"]');
    }

    clickOnStartFreeTrialBtn() {
        this.startFreeTrialBtn.click();
    }

    clickOnSignUpBtn() {
        this.signUpBtn.click();
    }

    clickOnFreeSignUpBtn() {
        this.freeSignUpBtn.click({force:true});
    }

    register(email, password, number) {
        this.clickOnFreeSignUpBtn();
        this.emailInput.type(email);
        this.passwordInput.type(password);
        this.numberOfUsersInput.type(number);
        this.clickOnStartFreeTrialBtn();
    }
}

export const register = new Register();