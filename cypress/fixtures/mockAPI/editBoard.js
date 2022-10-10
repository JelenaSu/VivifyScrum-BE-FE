/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';

let user = {
    name: faker.word.adjective(),
    editedName: faker.vehicle.vehicle(),
    description: faker.animal.cat(),
}

class EditBoardMock {
    
    post({token = `${token}`, editedName = user.editedName, description = user.description, boardId, code = `${code}`}) {
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
}

export const editBoardMock = new EditBoardMock();
    
