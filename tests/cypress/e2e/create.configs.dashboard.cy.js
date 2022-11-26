import {
  API_BASE_ADMIN_URL, API_CONFIGS_ENDPOINT,
  API_SERVICES_ENDPOINT, DASHBOARD_CONFIGS_CREATE_URL, DASHBOARD_CONFIGS_URL
} from "../../../src/constants";
import {createConfig, getServices} from "./configs.db";
import {testFormReset} from "./utils";

/* eslint-disable testing-library/-async-utils */
/// <reference types="cypress" />
describe("Страница создания конфига", () => {
  beforeEach(() => {
    cy.login();
    cy.stubConfigsAPI();
    cy
      .visit(DASHBOARD_CONFIGS_CREATE_URL)
  });

  it("Все поля заполнены - успешное создание", () => {
    cy.get("#config_name").type("CONFIG_NAME");
    cy.get("#service_name").type("new_service");
    cy.get(".monaco-editor").first().type("{}");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "успешно создан");
    cy.location().should(loc => {
      expect(loc.pathname).to.equal(DASHBOARD_CONFIGS_URL);
    });
    cy.contains("CONFIG_NAME").should("exist");
  });

  it("Пустое поле - ошибка", () => {
    cy.get("#config_name").type("CONFIG_NAME");
    cy.get("#service_name").type("new_service");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "ошибки в полях");
  });

  it("Невалидный JSON - ошибка", () => {
    cy.get("#config_name").type("CONFIG_NAME");
    cy.get("#service_name").type("new_service");
    cy.get(".monaco-editor").first().type("200{}");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "ошибки в полях");
  });

  testFormReset({
    config: {
      config_name: "",
      config_value: "",
      service_name: ""
    }
  });
});
