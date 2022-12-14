/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';
import tokenData from "../../fixtures/tokenData.json";

let user = {
    name: faker.word.adjective(),
    editedName: faker.vehicle.vehicle(),
    description: faker.animal.cat(),
}

class CreateBoardMock {
    
    post({boardName = user.name, status = 201, token = tokenData.token, organizationId = 22056 }) {
        return cy.request({
                method: 'POST',
                url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards',
                headers: {
                    authorization: `Bearer ${token}`,
                    accept: "aplication/json",
                },
                body: {
                    name: boardName,
                    type: "kanban_board",
                    configuration_board_id: "",
                    team_members_board_id: "",
                    organization_id: organizationId,
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