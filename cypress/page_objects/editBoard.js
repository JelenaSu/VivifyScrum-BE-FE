class EditBoard {

    lastBoard(boardId) {
        cy.get(`a[href="/boards/${boardId}"]`).eq(0).scrollIntoView().should('be.visible').click()

    }

    configureBoard(boardId) {
        return cy.get(`[href="/boards/${boardId}/settings"]`)
    }

    get boardName() {
        return cy.get('[name="name"]')
    }

    get boardDescription() {
        return cy.get('[name="description"]')
    }

    get submitBtn() {
        return cy.get('[class="vs-c-btn vs-c-btn--primary vs-c-btn--spaced vs-u-font-weight-bold vs-c-btn-auth--top-gap"]')
    }

    get deleteBtn() {
        return cy.get('[class="vs-c-btn vs-c-btn--warning vs-c-btn--spaced"]')
    }

    clickDeleteBtn() {
        this.deleteBtn.click();
    }

    get confirmYesBtn() {
        return cy.get('[name="save-btn"]')
    }

    clickYesBtn() {
        this.confirmYesBtn.click();
    }

    get finalConfirmBtn() {
        return cy.get('.vs-c-modal--features-button > .vs-c-btn')
    }

    clickFinalConfirmBtn() {
        this.finalConfirmBtn.click()
    }

    editBoard(boardId, editedName, description) {
        cy.wait(4000)
        this.lastBoard(boardId);
        this.configureBoard(boardId).should('be.visible').click();
        this.boardName.should('be.visible').clear().type(editedName);
        this.boardDescription.should('be.visible').type(description);
        this.submitBtn.should('be.visible').click();
    }


    editBoardBE(token, editedName, description, boardId, code) {
        return cy.request({
            method: 'PUT',
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
            body: {
                name: editedName,
                description: description,
                code: `${code}`,
                task_unit: "points"
            },
            headers: {
                authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            return response
        })

    }

    deleteBoard(boardId) {
        this.lastBoard(boardId);
        this.configureBoard(boardId).click();
        this.clickDeleteBtn();
        this.clickYesBtn();
        this.clickFinalConfirmBtn();
    }

    deleteBoardBE(token, boardId) {
        return cy.request({
            method: "DELETE",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
            headers: {
                authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            expect(response.status).to.eq(200)
        })
    }
}

export const editBoard = new EditBoard();