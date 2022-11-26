import {
  API_BASE_ADMIN_URL, API_CONFIGS_ENDPOINT,
  API_SERVICES_ENDPOINT
} from "../../../src/constants";
import {createConfig, getServices} from "./configs.db";

/* eslint-disable testing-library/-async-utils */
/// <reference types="cypress" />
describe("Страница создания конфига", () => {
  beforeEach(() => {
    cy.login();
    cy.stubConfigsAPI();
    cy
      .visit("/dashboard/configs/create")
  });

  it("Все поля заполнены - успешное создание", () => {
    cy.get("input").first().type("CONFIG_NAME");
    cy.get(".ant-select-selection-search-input").type("new_service");
    cy.get(".monaco-editor").first().type("{}");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "успешно создан");
    cy.location().should(loc => {
      expect(loc.pathname).to.equal("/dashboard/configs");
    });
    cy.contains("CONFIG_NAME").should("exist");
  });

  it("Пустое поле - ошибка", () => {
    cy.get("input").first().type("CONFIG_NAME");
    cy.get(".ant-select-selection-search-input").type("new_service");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "ошибки в полях");
  });

  it("Невалидный JSON - ошибка", () => {
    cy.get("input").first().type("CONFIG_NAME");
    cy.get(".ant-select-selection-search-input").type("new_service");
    cy.get(".monaco-editor").first().type("200{}");
    cy.get("button.ant-btn-primary").click();
    cy.get(".ant-message").should("contain.text", "ошибки в полях");
  });

  it("Корректный сброс формы", () => {
    cy.contains("Cброс").click();
    cy.contains("OK").click();
    cy.get("input").first().should("have.text", "");
    cy.get(".ant-select-selection-search-input").should("have.text", "");
    cy.get(".lines-content").first().should("have.text", "");
  });
});
