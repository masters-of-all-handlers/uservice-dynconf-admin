import "cypress-localstorage-commands";
import {API_BASE_AUTH_URL} from "../../../src/constants";

console.log("loaded");
Cypress.Commands.add('login', () => {
  cy.request({
      method: 'POST',
      url: `${API_BASE_AUTH_URL}/login`,
      body: {
        login: Cypress.env("ADMIN_USERNAME"),
        password: Cypress.env("ADMIN_PASSWORD"),
      }
    })
    .its('body')
    .then(({ticket}) => {
      cy.setLocalStorage("uda_ticket", ticket);
    })
});
