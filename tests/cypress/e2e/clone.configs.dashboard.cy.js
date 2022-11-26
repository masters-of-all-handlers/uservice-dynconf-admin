import {getConfigs} from "./configs.db";
import {testFormReset} from "./utils";
import {
  DASHBOARD_CONFIGS_CLONE_URL,
  DASHBOARD_CONFIGS_URL
} from "../../../src/constants";

/* eslint-disable testing-library/-async-utils */
/// <reference types="cypress" />
describe("Страница клонирования конфига", () => {

  const config = getConfigs()[0];

  beforeEach(() => {
    cy.stubConfigsAPI();
    cy.login();
    cy
      .visit(DASHBOARD_CONFIGS_CLONE_URL(config.uuid));
    cy.wait("@getConfig");
    cy.wait("@getServices");
  });

  it("Все поля заполнены - успешное клонирование", () => {
    const suffix = new Date().toString();
    cy.get("#config_name").type(suffix);
    cy.get("#service_name").type("new_service");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "успешно клонирован");
    cy.location().should(loc => {
      expect(loc.pathname).to.equal(DASHBOARD_CONFIGS_URL);
    });
    cy.contains(`${config.config_name}${suffix}`).should("exist");
  });

  it("Пустое поле - ошибка", () => {
    cy.get("#config_name").clear();
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
