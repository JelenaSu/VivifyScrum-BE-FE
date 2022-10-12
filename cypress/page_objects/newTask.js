import { faker } from "@faker-js/faker";

let boardId;
let taskId;

let user = {
  boardName: faker.commerce.product(),
  name: faker.word.adjective(),
  editedName: faker.vehicle.vehicle(),
  description: faker.animal.cat(),
  title: faker.git.commitMessage(),
  descriptionTitle: faker.hacker.phrase(),
  image: faker.image.cats(),
};

class NewTask {
  get newTaskBtn() {
    return cy
      .get(
        '[class="vs-add-new-task vs-c-btn vs-c-btn--themify-secondary vs-c-btn--round vs-c-btn--sm vs-c-task-card__not-selectable"]'
      )
      .last();
  }

  clickNewTaskBtn() {
    this.newTaskBtn.click({ force: true });
  }

  get writeTitle() {
    return cy.get('[name="item_name"]');
  }

  get openTaskBody() {
    return cy.get('[class="vs-c-task-card__body"]').last();
  }

  clickOpenTaskBody() {
    this.openTaskBody.click();
  }

  get saveNewTaskBtn() {
    return cy.get('[name="new_item_save"]');
  }

  clickSaveNewtaskBtn() {
    this.saveNewTaskBtn.click();
  }

  get editDescriptionField() {
    return cy.get('[class="el-icon-edit"]');
  }

  clickEditDescriptionField() {
    this.editDescriptionField.click();
  }

  get writeDescriptionField() {
    return cy.get('[name="description"]');
  }

  get saveDescriptionBtn() {
    return cy.get('[name="item_description_save"]');
    // return cy.get(':nth-child(1) > .vs-u-text--right > .el-button--success')
  }

  clickSaveDescriptionBtn() {
    this.saveDescriptionBtn.click();
  }

  get uploadFilesBtn() {
    return cy.get('[type="file"]').attachFile("cheetah-002.jpg");
  }

  clickUploadFilesBtn() {
    this.uploadFilesBtn.click();
  }

  get writeCommentInput() {
    return cy.get('[name="new_comment"]');
  }

  get postTaskBtn() {
    return cy.get('[name="comment_save"]');
  }

  clickPostTaskBtn() {
    this.postTaskBtn.click();
  }

  get dragAndDropImage() {
    return cy.get('input[type="file"]').attachFile("cheetah-002.jpg").first();
  }

  clickDragAndDropImage() {
    this.dragAndDropImage.click({ force: true });
  }

  get addLabelBtn() {
    return cy.get('[name="add-label-button"]');
  }

  clickAddLabelBtn() {
    this.addLabelBtn.click();
  }

  get chooseLabel() {
    return cy.get('[class="vs-c-label item-label"]').first();
  }

  clickChooseLabel() {
    this.chooseLabel.click();
  }

  get closeTaskBtn() {
    return cy.get('[name="close-item-modal-btn"]');
  }

  clickCloseTaskBtn() {
    this.closeTaskBtn.click();
  }

  get storyDropdownBtn() {
    return cy.get("[class='el-icon-caret-bottom el-icon--right']").first();
  }

  clickStoryDropdownBtn() {
    this.storyDropdownBtn.click({ force: true });
  }

  get firstDropdownElement() {
    return cy.get('[class="vs-c-task-modal-type-dropdown__item-name"]').first();
  }

  clickFirstDropdownElement() {
    this.firstDropdownElement.click();
  }

  get statsBtn() {
    return cy.get(".vs-c-task-card-task-type__icon-inner");
  }

  clickStatsBtn() {
    this.statsBtn.click();
  }

  get lastBoardBtn() {
    return cy.get('[class="vs-c-img--avatar vs-c-img--board-avatar"]').last();
  }

  clickLastBoardBtn() {
    this.lastBoardBtn.click();
  }

  get taskTypeDropdown() {
    return cy.get("[name='sprint-info-dropdown']")
  }

  clickTaskTypeDropdown() {
    this.taskTypeDropdown.click()
  }

  newTaskFunction(title, description, comment) {
    cy.intercept(
      "POST",
      "https://cypress-api.vivifyscrum-stage.com/api/v2/tasks"
    ).as("task");
    // this.clickLastBoardBtn()
    this.clickNewTaskBtn();
    this.writeTitle.type(title);
    this.clickSaveNewtaskBtn();
    this.clickOpenTaskBody();
    this.clickEditDescriptionField();
    this.writeDescriptionField.type(description);
    this.clickSaveDescriptionBtn();
    cy.wait(3000);
    this.uploadFilesBtn;
    cy.wait(2000);
    this.clickAddLabelBtn();
    this.clickChooseLabel();
    this.writeCommentInput.type(comment);
    this.clickPostTaskBtn();
    this.clickCloseTaskBtn();
    return cy.wait("@task").then((intercept) => {
      return intercept.response;
    });
  }

  TaskIdFunction(token) {
    cy.request({
      method: "POST",
      url: "https://cypress-api.vivifyscrum-stage.com/api/v2/tasks",
      body: {
        item: { 
          "item":{
            "name":"gfd",
            "board_id":11958,
            "sprint_id":20087,
            "sprint_backlog_column_id":null,
            "priority_id":2,"parent_id":null,
            "labels":[],
            "doers":[],
            "reviewers":[],
            "type_id":1,
            "points_id":null,
            "taskvalue_id":1,
            "checklists":[],
            "blocking_task_id":null
        },
        "prev":{
            "id":15774,
            "order":1
        },
        "next":null,
        "board_id":11958,
        "isOnSprint":true
        }
    },
      headers: {
        authorization: `Bearer ${token}`,
      },
    }).then((response) => {
      return response;
    })
  }

  TaskTypeFunction(boardId, taskId) {
    cy.visit(`/boards/${boardId}/${taskId}`);
    cy.get('[name="sprint-info-dropdown"]').click();
    cy.get('[name="itemTypes"]').find("li").first().contains("span", "Story");
    cy.get('[name="itemTypes"]').find("li").last().contains("span", "Idea");
    cy.get('[name="itemTypes"]').should("contain.text", "Bug");
    var dropdown = ["Story", "Improvement", "Bug", "Task", "Note", "Idea"];
    cy.get('[name="itemTypes"] [name]*').each(($el, index, list) => {
      expect(list).to.have.length(6);
      cy.wrap($el).should("contain.text", dropdown[index]);
    })
  }

  SprintDropdownChange(boardId, taskId) {
    cy.visit(`/boards/${boardId}/${taskId}`)
    this.taskTypeDropdown.click()
    cy.get('[class="vs-c-task-modal-type-dropdown__item-name"]').eq(6).click()
    cy.get("[name='sprint-info-dropdown']").should("have.text", "To Do  ")
    cy.get ('[class="vs-c-col"]').first().should("contain", `${taskId}`)
    this.taskTypeDropdown.click();
    cy.get('[class="vs-c-task-modal-type-dropdown__item-name"]').eq(7).click()
    cy.get("[name='sprint-info-dropdown']").should("have.text", "In Progress  ")
    cy.get ('[class="vs-c-col"]').eq(1).should("contain", `${taskId}`)
    this.taskTypeDropdown.click();
    cy.get('[class="vs-c-task-modal-type-dropdown__item-name"]').eq(8).click()
    cy.get("[name='sprint-info-dropdown']").should("have.text", "Done  ")
    cy.get ('[class="vs-c-col"]').eq(2).should("contain", `${taskId}`)
  }
}

export const newTask = new NewTask();
