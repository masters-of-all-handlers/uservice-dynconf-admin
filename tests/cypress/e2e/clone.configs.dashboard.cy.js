import {getConfig} from "./configs.db";
import {testFormReset} from "./utils";

/* eslint-disable testing-library/-async-utils */
/// <reference types="cypress" />
describe("Страница клонирования конфига", () => {

  const config = getConfig("00000000-0000-0000-0000-000000000001");

  beforeEach(() => {
    cy.login();
    cy.stubConfigsAPI();
    cy
      .visit(`/dashboard/configs/${config.uuid}/clone`);
    cy.wait("@getConfig");
    cy.wait("@getServices");
  });

  it("Все поля заполнены - успешное клонирование", () => {
    cy.get("#config_name").type("CONFIG_NAME");
    cy.get("#service_name").type("new_service");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "успешно клонирован");
    cy.location().should(loc => {
      expect(loc.pathname).to.equal("/dashboard/configs");
    });
    cy.contains(`${config.config_name}CONFIG_NAME`).should("exist");
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
