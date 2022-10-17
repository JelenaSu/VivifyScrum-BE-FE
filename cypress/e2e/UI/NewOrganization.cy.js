/// <reference types="Cypress" />

import { newOrganization } from "../../page_objects/newOrganization";
import { faker } from "@faker-js/faker";
import { newTask } from "../../page_objects/newTask";
import { loginPage } from "../../page_objects/loginPage";

let taskId;
let boardId;
let code;
let organizationId;
let nesto;

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
  title: faker.git.commitMessage(),
  descriptionTitle: faker.hacker.phrase(),
  comment: faker.lorem.paragraph(),
}

describe("New organization task test cases", () => {
  beforeEach("Visit Vivify Scrum and login", () => {
    loginPage.loginFunction(Cypress.env("validLoginEmail"), Cypress.env("validLoginPassword"))
    // loginPage.beforeEachSession("Jelena");
  });

  it("Create new organization", () => {
    cy.visit("/");
    newOrganization
      .createNewOrganizationIDfunction(user.name)
      .then((response) => {
        organizationId = response.body.id;
      });
  });

  it("Create new organization board", () => {
    cy.visit(`/organizations/${organizationId}/boards`);
    newOrganization
      .NewOrgCreateBoard(user.boardName)
      .then((response) => {
        boardId = response.body.id;
        code = response.body.code;
      });
  });

  it("Create new task", () => {
    cy.visit(`/boards/${boardId}`);
    newTask
      .newTaskFunction(user.title, user.descriptionTitle, user.comment)
      .then((response) => {
        taskId = response.body.code;
      });
  });

  it("Task dropdown change elements", () => {
    newTask.TaskTypeFunction(boardId, taskId);
  });

  it('Sprint dropdown change column', () => {
    newTask.SprintDropdownChange(boardId, taskId);
  });

  
  it("Create second task", () => {
    cy.visit(`/boards/${boardId}`);
    newTask
      .newTaskFunction(user2.title, user2.descriptionTitle, user2.comment)
      .then((response) => {
        nesto = response.body.id;
      
      });
  });

  it("Drag drop", () => {
    cy.visit(`/boards/${boardId}`);
    cy.get(`[id="task-${nesto}"]`).drag('div[class="vs-c-task-list vs-is-empty"]');
    cy.get(`[id="task-${nesto}"]`).drag('[class="vs-c-task-list"]')
  });


 

  // it("Create new Task and column change drag-drop", () => {
  //   cy.visit("/");
  //   createTask
  //     .createTask(task.text, task.comment, task.labelText)
  //     .then((response) => {
  //       taskCode = response.body.code;
  //       taskId = response.body.id;
  //     });
  // });
  

// it('Delete org', () => {
//   newTask.deleteOrg(`${organizationId}`)
// })  


});
