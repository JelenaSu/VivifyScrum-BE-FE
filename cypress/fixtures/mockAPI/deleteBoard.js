/// <reference types="Cypress" />

class DeleteBoardMock {

    post({token = `${token}`, boardId}) {
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


export const deleteBoardMock = new DeleteBoardMock();