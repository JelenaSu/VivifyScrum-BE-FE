/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';
import { board } from "../../page_objects/board";

let boardId;
let code;

let user = {
    name: faker.word.adjective(),
    editedName: faker.vehicle.vehicle(),
    description: faker.animal.cat(),
}

describe('Board-create, edit and delete UI', () => {
    beforeEach('Visit Vivifyscrum page and login', () => {
        board.beforeEachLogin("Proba");
    })

    it('Create new board', () => {
        board.createBoardFunction(user.name).then(response => {
            boardId = response.body.id
            code = response.body.code
        })
    })

    it('Edit board UI', () => {
        board.editBoardFunction(`${boardId}`, user.editedName, user.description)
    });

    it('Delete board UI', () => {
        board.deleteBoardFunction(`${boardId}`)
    })
})

