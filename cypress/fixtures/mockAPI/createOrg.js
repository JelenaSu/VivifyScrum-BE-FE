/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';
import tokenData from "../tokenData.json";

let user = {
    name: faker.word.adjective(),
    editedName: faker.vehicle.vehicle(),
    description: faker.animal.cat(),
}

class CreateOrgMock {
    
    post({name = user.name, status = 201, token = tokenData.token}) {
        return cy.request({
            failOnStatusCode: false,
                method: 'POST',
                url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
                headers: {
                    authorization: `Bearer ${token}`,
                    accept: "aplication/json",
                },
                body: {
                    name: name,
                    avatar_crop_cords: "",
                    file: ""
                },
                }).then((response)=>{
                   window.localStorage.setItem('organizationId', response.body.id);
                   expect(response.status).to.eq(status)
                   return response
            })
        }
    }


export const createOrgMock = new CreateOrgMock()