class General {
    
    get headerTitle() {
        return cy.get('[class="vs-c-auth-modal-body__heading"]');
    }

    get modalBtn() {
        return cy.get('.vs-c-modal--features-button > .vs-c-btn');  
    }

    clickModalBtn() {
        this.modalBtn.click();
    }

}

export const general = new General();