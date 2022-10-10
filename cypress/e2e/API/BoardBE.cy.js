/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';
import { token } from "../../fixtures/token.json"
import { loginMock } from "../../fixtures/mockAPI/login";
import { createBoardMock } from "../../fixtures/mockAPI/board";
import { editBoardMock } from '../../fixtures/mockAPI/editBoard';
import { deleteBoardMock } from '../../fixtures/mockAPI/deleteBoard';

let boardId;
let code;


let user = {
    name: faker.word.adjective(),
    editedName: faker.vehicle.vehicle(),
    description: faker.animal.cat(),
}

describe("Board-create, edit and delete BE", () => {
    before('login', () => {
        loginMock.post({}).then((response) => {
            // token = response.body.token
            cy.writeFile('cypress/fixtures/token.json', {token: token})
        })
    })

    it('Create Board BE', () => {
        createBoardMock.post({token}).then((response) => {
            boardId = response.body.id
            code = response.body.code
        })
    })

    it('Edit Board BE', () => {
       editBoardMock.post({token, boardId, code})
    })

    it('Delete Board BE', () => {
       deleteBoardMock.post({token, boardId})
    })
    
})








