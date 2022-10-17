/// <reference types="Cypress" />

import { faker } from '@faker-js/faker';
import { newTask } from "../../page_objects/newTask";
import {createBoardMock} from "../../fixtures/mockAPI/board";
import { createOrgMock } from "../../fixtures/mockAPI/createOrg";
import {loginMock}  from "../../fixtures/mockAPI/login";
import { loginPage } from "../../page_objects/loginPage"

let user = {
    boardName: faker.commerce.product(),
    name: faker.word.adjective(),
    editedName: faker.vehicle.vehicle(),
    description: faker.animal.cat(),
    title: faker.git.commitMessage(),
    descriptionTitle: faker.hacker.phrase(),
    image: faker.image.cats(),
    comment: faker.lorem.paragraph(),
  };

  let user2 = {
    name: faker.commerce.product(),
    descriptionTitle: faker.git.commitMessage(),
    comment: faker.lorem.paragraph(),
  };

  let boardId;
  let code;
 

describe('Task test cases', () => {
    beforeEach('Login and create org/board/task', () => {
        loginMock.post({})
        // .then((response) => {
        //     cy.writeFile("cypress/fixtures/tokenData.json", { token: response })
        // });
        createOrgMock.post({}).then((response) => {
            createBoardMock.post({organizationId: response.body.id}).then((response) => {
                cy.visit(`/boards/${response.body.id}`)
                boardId = response.body.id
                code = response.body.code
            })
        })
    })

        it('try', () => {
           cy.visit(`/boards/${boardId}`)
           newTask.newTaskFunction(user.title, user.descriptionTitle, user.comment)
        })
    

        it('try2', () => {
            cy.visit(`/boards/${boardId}`)
            newTask.newTaskFunction(user2.name, user2.descriptionTitle, user2.comment)
        })
    
})

