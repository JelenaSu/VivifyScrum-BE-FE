/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';

let user = {
    name: faker.word.adjective(),
    editedName: faker.vehicle.vehicle(),
    description: faker.animal.cat(),
}

class CreateBoardMock {
    
    post({boardName = user.name, status = 201, token = `${token}` }) {
        return cy.request({
                method: 'POST',
                url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards',
                headers: {
                    authorization: `Bearer ${token}`,
                    "content-type": "aplication/json",
                },
                body: {
                    name: boardName,
                    type: "kanban_board",
                    configuration_board_id: "",
                    team_members_board_id: "",
                    organization_id: "22056",
                    avatar_crop_cords: {},
                    file: "",
                },
                }).then((response)=>{
                   expect(response.status).to.eq(status)
                   return response
            })
        }
}
export const createBoardMock = new CreateBoardMock()