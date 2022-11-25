import {
  API_BASE_ADMIN_URL,
  API_CONFIGS_ENDPOINT
} from "../../../src/constants";
import {deleteConfig, getConfig, getConfigs} from "./configs.db";

describe("Страница списка конфигов", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: `${API_BASE_ADMIN_URL}${API_CONFIGS_ENDPOINT}*`,
      },
      (req) => {
        req.reply({statusCode: 200, body: {items: getConfigs()}});
      }
    ).as("getConfigs");
    cy.intercept(
      {
        method: "GET",
        url: `${API_BASE_ADMIN_URL}${API_CONFIGS_ENDPOINT}/*`,
      },
      (req) => {
        const match = req.url.match(/(.*)\/([0-9a-f\-]{36})\/?$/);
        if (!match) {
          return req.continue();
        }
        const config = getConfig(match[2]);
        req.reply({statusCode: 200, body: config});
      }
    ).as("getConfig");
    cy.login();
    cy.visit("/dashboard/configs");
  })

  it("Переход на создание конфига", () => {
    cy.get("button.ant-btn-primary").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/dashboard/configs/create");
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

  it("Удаление конфига со страницы списка", () => {

    cy.intercept(
      {
        method: "DELETE",
        url: `${API_BASE_ADMIN_URL}${API_CONFIGS_ENDPOINT}/*`
      },
      (req) => {
        deleteConfig(req.url.match(/(.*)\/([0-9a-f\-]{36})\/?$/)[2]);
        req.reply({statusCode: 204});
      }
    ).as("deleteConfig");

    cy.get(".ant-dropdown-trigger").first().click();
    cy.get(".ant-dropdown-menu-title-content").contains("Удалить").click();
    cy.get(".ant-popover-buttons .ant-btn-dangerous").first().click();
    cy.get(".ant-table-row").should("have.length", getConfigs().length);
  });
});
