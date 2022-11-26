import {
  API_BASE_ADMIN_URL,
  API_CONFIGS_ENDPOINT
} from "../../../src/constants";
import {deleteConfig, getConfig, getConfigs} from "./configs.db";

describe("Страница списка конфигов", () => {
  beforeEach(() => {
    cy.stubConfigsAPI();
    cy.login();
    cy.visit("/dashboard/configs");
  })

  it("Переход на создание конфига", async () => {
    await cy.get("button.ant-btn-primary").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/dashboard/configs/create");
    });
  });

  it("Переход на редактирование конфига со страницы списка", async () => {
    await cy.get(".ant-dropdown-trigger").first().click();
    await cy.get(".ant-dropdown-menu-title-content").contains("Редактировать").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.match(/^\/dashboard\/configs\/[0-9a-f\-]{36}\/edit$/);
    });
  });

  it("Переход на клонирование конфига со страницы списка", async () => {
    await cy.get(".ant-dropdown-trigger").first().click();
    await cy.get(".ant-dropdown-menu-title-content").contains("Клонировать").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.match(/^\/dashboard\/configs\/[0-9a-f\-]{36}\/clone$/);
    });
  });

  it("Удаление конфига со страницы списка", async () => {
    await cy.get(".ant-dropdown-trigger").first().click();
    await cy.get(".ant-dropdown-menu-title-content").contains("Удалить").click();
    await cy.get(".ant-popover-buttons .ant-btn-dangerous").first().click();
    cy.get(".ant-table-row").should("have.length", getConfigs().length);
  });
});
