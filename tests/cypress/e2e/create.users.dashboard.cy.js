/* eslint-disable testing-library/-async-utils */
/// <reference types="cypress" />
import {API_BASE_AUTH_URL} from "../../../src/constants";

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


  it("Заполненные поля - пользователь создается", () => {

    cy.intercept({
      method: "POST",
      url: `${API_BASE_AUTH_URL}/register`
    }, req => {
      req.reply({statusCode: 201});
    });

    cy.get("input").eq(0).type("test123");
    cy.get("input").eq(1).type("test123");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "Сохранено");
  });
});
