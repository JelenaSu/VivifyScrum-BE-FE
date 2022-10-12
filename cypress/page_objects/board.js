import { loginPage } from "../page_objects/loginPage";
import { editBoard } from "./editBoard";

class Board {
  get addNewBoard() {
    return cy.get('[class="vs-c-boards-item__header--add-new "]').last()
    // return cy.get('[class="vs-c-media__object"]');
  }

  get enterTitle() {
    return cy.get('input[name="name"]');
  }

  get nextBtnFirst() {
    return cy
      .get(
        '[class="el-button vs-c-button-focus el-button--success el-button--large"]'
      )
      .last();
  }

  get kanbanCheck() {
    return cy.get('[name="type_kanban"]');
    // class="vs-c-radio-check"
  }

  get nextBtnSecond() {
    return cy
      .get(
        '[class="el-button vs-c-button-focus el-button--success el-button--large"]'
      )
      .last();
  }

  get nextBtnThird() {
    return cy
      .get(
        '[class="el-button vs-c-button-focus el-button--success el-button--large"]'
      )
      .last();
  }

  get nextBtnFourth() {
    return cy
      .get(
        '[class="el-button vs-c-button-focus el-button--success el-button--large"]'
      )
      .last();
  }

  get finishBtn() {
    return cy.get('[name="next_btn"]');
  }

  get createBoardNewOrg() {
    return cy.get(".vs-c-my-organization__board");
    // return cy.get('.vs-c-media__object > .vs-c-img--avatar > span')
  }
  get newOrganizationBtn() {
    return cy.get('[class="vs-c-my-organization__avatar"]');
  }
  get newOrgLogoSign() {
    return cy.get('[class="vs-c-site-logo vs-u-cursor--pointer"]').last();
  }

  clickCreateBoardNewOrg() {
    this.createBoardNewOrg.click();
  }

  clickAddNewBoard() {
    this.addNewBoard.click({force: true});
  }

  clickNextBtnFirst() {
    this.nextBtnFirst.click();
  }

  clickKanbanCheck() {
    this.kanbanCheck.click();
  }

  clickNextBtnSecond() {
    this.nextBtnSecond.click();
  }

  clickNextBtnThird() {
    this.nextBtnThird.click();
  }

  clickNextBtnFourth() {
    this.nextBtnFourth.click();
  }

  clickFinishBtn() {
    this.finishBtn.click();
  }

  get modalBtn() {
    return cy.get(".vs-c-modal--features-button > .vs-c-btn");
  }

  clickModalBtn() {
    this.modalBtn.click();
  }

  createBoard(name) {
    this.clickModalBtn();
    // this.newOrgLogoSign.click({ force: true });
    this.clickAddNewBoard({force: true});
    this.enterTitle.should("be.visible").type(name);
    this.clickNextBtnFirst();
    this.clickKanbanCheck();
    this.clickNextBtnSecond();
    this.clickNextBtnThird();
    this.clickNextBtnFourth();
    this.clickFinishBtn();
  }

  createBoardBE(token, boardName) {
    return cy
      .request({
        method: "POST",
        url: "https://cypress-api.vivifyscrum-stage.com/api/v2/boards",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "aplication/json",
        },
        body: {
          name: boardName,
          type: "kanban_board",
          configuration_board_id: "",
          team_members_board_id: "",
          organization_id: 22056,
          avatar_crop_cords: {},
          file: "",
        },
      })
      .then((response) => {
        return response;
      });
  }

  beforeEachLogin(name) {
    cy.session(name, () => {
      cy.visit("/");
      cy.intercept(
        "POST",
        "https://cypress-api.vivifyscrum-stage.com/api/v2/login"
      ).as("validLogin");
      cy.url().should("contain", "https://cypress.vivifyscrum-stage.com/");
      cy.url().should("contain", "/login");
      loginPage.login(
        Cypress.env("validLoginEmail"),
        Cypress.env("validLoginPassword")
      );
      cy.url().should("contain", "/my-organizations");
      cy.wait("@validLogin").then((intercept) => {
        expect(intercept.response.statusCode).to.eq(200);
        // expect(intercept.response.body.user_id).to.eq(userId)
        // token = intercept.response.body.token;
        // userId = intercept.response.body.user_id;
      });
    });
  }

  createBoardFunction(name) {
    cy.visit("/");
    cy.url().should("contain", "/my-organization");
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/boards"
    ).as("createBoard");
    // board.clickCreateBoardNewOrg(name);
    board.createBoard(name);
    return cy.wait("@createBoard").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(201);
      expect(intercept.response.statusMessage).to.eq("Created");
      return intercept.response;
      // boardId = intercept.response.body.id
      // code = intercept.response.body.code
      // organization_id = intercept.response.body.organization_id
    });
  }

  editBoardFunction(boardId, name, description) {
    cy.visit("/");
    cy.url().should("contain", "/my-organization");
    cy.intercept(
      "PUT",
      `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`
    ).as("editBoard");
    editBoard.editBoard(boardId, name, description);
    return cy.wait("@editBoard").then((intercept) => {
      expect(intercept.response.body.name).to.eq(name);
      expect(intercept.response.body.description).to.eq(description);
      return intercept.response;
    });
  }

  deleteBoardFunction(boardId) {
    cy.visit("/");
    cy.url().should("contain", "/my-organization");
    cy.intercept(
      "DELETE",
      `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`
    ).as("deleteBoard");
    editBoard.deleteBoard(boardId);
    return cy.wait("@deleteBoard").then((intercept) => {
      expect(intercept.response.statusCode).to.eq(200);
    });
  }

  createBoardOrganization(name) {
    this.newOrgLogoSign.click({ force: true }).last();
    this.clickAddNewBoard();
    this.enterTitle.should("be.visible").type(name);
    this.clickNextBtnFirst();
    this.clickKanbanCheck();
    this.clickNextBtnSecond();
    this.clickNextBtnThird();
    this.clickNextBtnFourth();
    this.clickFinishBtn();
  }
}

// createBoardBE(token) {
//     it('Create board BE', () => {
//         cy.request({
//             method: 'POST',
//             url: 'https://cypress-api.vivifyscrum-stage.com/api/v2/boards',
//             headers: {
//                 authorization: `Bearer ${token}`,
//                 "content-type": "aplication/json",
//             },
//             body: {
//                 name: "fgd",
//                 type: "kanban_board",
//                 configuration_board_id: "",
//                 team_members_board_id: "",
//                 organization_id: 21446,
//                 avatar_crop_cords: {},
//                 file: "",
//             }
//         }).then((response) => {
//             return response
//             // console.log((response))
//             // expect(response.status).to.eq(201)
//             // boardId = response.body.id
//             // code = response.body.code
//         })
//     })

export const board = new Board();
