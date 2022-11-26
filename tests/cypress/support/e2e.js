import "cypress-localstorage-commands";
import {
  API_BASE_ADMIN_URL,
  API_BASE_AUTH_URL,
  API_CONFIGS_ENDPOINT, API_SERVICES_ENDPOINT
} from "../../../src/constants";
import {
  cloneConfig,
  createConfig, deleteConfig, editConfig,
  getConfig,
  getConfigs,
  getServices
} from "../e2e/configs.db";

Cypress.Commands.add("login", () => {
  cy.request({
      method: "POST",
      url: `${API_BASE_AUTH_URL}/login`,
      body: {
        login: Cypress.env("ADMIN_USERNAME"),
        password: Cypress.env("ADMIN_PASSWORD"),
      }
    })
    .its("body")
    .then(({ticket}) => {
      cy.setLocalStorage("uda_ticket", ticket);
    })
});

Cypress.Commands.add("stubConfigsAPI", () => {
  cy.intercept(
    {
      method: "GET",
      url: `${API_BASE_ADMIN_URL}${API_CONFIGS_ENDPOINT}*`,
    },
    (req) => {
      req.reply({statusCode: 200, body: {items: getConfigs(req.query)}});
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
  cy.intercept(
    {
      method: "GET",
      url: `${API_BASE_ADMIN_URL}${API_SERVICES_ENDPOINT}*`,
    },
    (req) => {
      req.reply({statusCode: 200, body: {items: getServices()}});
    }
  ).as("getServices");
  cy.intercept(
    {
      method: "POST",
      url: `${API_BASE_ADMIN_URL}${API_CONFIGS_ENDPOINT}*`
    },
    req => {
      createConfig(req.body);
      req.reply({statusCode: 201});
    }
  ).as("createConfig");
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
  cy.intercept(
    {
      method: "PATCH",
      url: `${API_BASE_ADMIN_URL}${API_CONFIGS_ENDPOINT}/*`
    },
    (req) => {
      editConfig({...req.body, uuid: req.url.match(/(.*)\/([0-9a-f\-]{36})\/?$/)[2]});
      req.reply({statusCode: 200});
    }
  ).as("editConfig");
  cy.intercept(
    {
      method: "POST",
      url: `${API_BASE_ADMIN_URL}${API_CONFIGS_ENDPOINT}/*/clone`
    },
    req => {
      cloneConfig({...req.body, uuid: req.url.match(/(.*)\/([0-9a-f\-]{36})\/clone\/?$/)[2]});
      req.reply({statusCode: 201});
    }
  ).as("cloneConfig");
});
