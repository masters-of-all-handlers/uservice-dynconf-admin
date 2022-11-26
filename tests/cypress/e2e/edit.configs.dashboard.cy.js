import {getConfig, getConfigs} from "./configs.db";
import {testFormReset} from "./utils";
import {
  DASHBOARD_CONFIGS_EDIT_URL,
  DASHBOARD_CONFIGS_URL
} from "../../../src/constants";

/* eslint-disable testing-library/-async-utils */
/// <reference types="cypress" />
describe("Страница редактирования конфига", () => {

  const config = getConfigs()[0];

  beforeEach(() => {
    cy.stubConfigsAPI();
    cy.login();
    cy
      .visit(DASHBOARD_CONFIGS_EDIT_URL(config.uuid));
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
    cy.contains(".ant-form-item", "Значение").find(".monaco-editor").first()
      .click().focused().type("{selectAll}{backspace}");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "ошибки в полях");
  });

  it("Невалидный JSON - ошибка", () => {
    cy.contains(".ant-form-item", "Значение").find(".monaco-editor").first()
      .click().focused().type("200{}");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "ошибки в полях");
  });

  testFormReset({config});
});
