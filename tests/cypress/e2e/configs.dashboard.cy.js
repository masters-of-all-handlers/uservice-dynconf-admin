import {getConfigs} from "./configs.db";
import {
  DASHBOARD_CONFIGS_CREATE_URL,
  DASHBOARD_CONFIGS_URL
} from "../../../src/constants";
import {testConfigsLength} from "./utils";

describe("Страница списка конфигов", () => {
  beforeEach(() => {
    cy.stubConfigsAPI();
    cy.login();
    cy.visit(DASHBOARD_CONFIGS_URL);
  })

  it("Переход на создание конфига", () => {
    cy.get("button.ant-btn-primary").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq(DASHBOARD_CONFIGS_CREATE_URL);
    });
  });

  it("Переход на редактирование конфига со страницы списка", () => {
    cy.get(".ant-dropdown-trigger").first().click();
    cy.get(".ant-dropdown-menu-title-content").contains("Редактировать").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.match(/^\/dashboard\/configs\/[0-9a-f\-]{36}\/edit$/);
    });
  });

  it("Переход на клонирование конфига со страницы списка", () => {
    cy.get(".ant-dropdown-trigger").first().click();
    cy.get(".ant-dropdown-menu-title-content").contains("Клонировать").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.match(/^\/dashboard\/configs\/[0-9a-f\-]{36}\/clone$/);
    });
  });

  it("Удаление конфига", () => {
    cy.get(".ant-dropdown-trigger").first().click();
    cy.get(".ant-dropdown-menu-title-content").contains("Удалить").click();
    cy.get(".ant-popover-buttons .ant-btn-dangerous").first().click();
    testConfigsLength(getConfigs().length);
  });

  it("Поиск по конфигу", () => {
    cy.contains("th", "Имя").find(".ant-input").first().type("config 2{Enter}");
    const testLength = () => {
      testConfigsLength(getConfigs({config: "config 2"}).length);
    }
    testLength();
    cy.reload();
    testLength();
  });

  it("Поиск по сервису", () => {
    cy.contains("th", "Сервис").find(".ant-input").first().type("default1{Enter}");
    const testLength = () => {
      testConfigsLength(getConfigs({service: "default1"}).length);
    }
    testLength();
    cy.reload();
    testLength();
  });

  it("Изменение размера страницы (пагинация)", () => {
    const targetLength = 20;
    cy.get(".ant-pagination-options .ant-select-selector").first().click();
    cy.contains(".ant-select-item-option-content", `${targetLength}`).click();
    cy.get(".ant-table-row").should("have.length", targetLength);
    cy.reload();
    cy.get(".ant-table-row").should("have.length", targetLength);
  });
});
