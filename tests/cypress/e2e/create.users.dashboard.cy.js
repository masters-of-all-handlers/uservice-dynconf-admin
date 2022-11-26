/* eslint-disable testing-library/-async-utils */
/// <reference types="cypress" />
describe("Страница создания пользователя", () => {
  beforeEach(() => {
    cy.login();
    cy
      .visit("/dashboard/users/create")
  })

  it("Пустое поле - ошибка", () => {
    cy.get("input").first().type("newuser");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "ошибки в полях");
  });


  // it("Заполненные поля - пользователь создается", () => {
  //   cy.get("input").first().type("test123");
  //   cy.get("input")[2].type("test123");
  //   cy.get("button.ant-btn-primary").click();
  // });
});
