import {getConfig} from "./configs.db";
import {testFormReset} from "./utils";
import {
  DASHBOARD_CONFIGS_EDIT_URL,
  DASHBOARD_CONFIGS_URL
} from "../../../src/constants";

/* eslint-disable testing-library/-async-utils */
/// <reference types="cypress" />
describe("Страница клонирования конфига", () => {

  const config = getConfig("00000000-0000-0000-0000-000000000001");

  beforeEach(() => {
    cy.login();
    cy.stubConfigsAPI();
    cy
      .visit(DASHBOARD_CONFIGS_EDIT_URL(config.uuid));
    cy.wait("@getConfig");
    cy.wait("@getServices");
  });

  it("Все поля заполнены - успешное редактирование", () => {
    cy.get("#config_name").should("have.attr", "disabled", "disabled");
    cy.get("#service_name").should("have.attr", "disabled", "disabled");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "успешно обновлен");
    cy.location().should(loc => {
      expect(loc.pathname).to.equal(DASHBOARD_CONFIGS_URL);
    });
  });

  it("Пустое поле - ошибка", () => {
    cy.get(".monaco-editor").first().type("{selectAll}{backspace}");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "ошибки в полях");
  });

  it("Невалидный JSON - ошибка", () => {
    cy.get(".monaco-editor").first().type("200{}");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "ошибки в полях");
  });

  testFormReset({config});
});
