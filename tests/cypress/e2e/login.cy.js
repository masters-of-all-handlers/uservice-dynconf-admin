/* eslint-disable testing-library/-async-utils */
/// <reference types="cypress" />
describe("Страница входа", () => {
  beforeEach(() => {
    cy
      .visit("/login")
  })

  it("При ошибке входа нет никакого перехода", () => {
    cy.get("input[placeholder='Имя пользователя']").type("error");
    cy.get("input[placeholder='Пароль']").type("error");
    cy.get("button.ant-btn-primary").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });
  });

  it("При успешном входе переход в админку", () => {
    cy.get("input[placeholder='Имя пользователя']").type(Cypress.env("ADMIN_USERNAME"));
    cy.get("input[placeholder='Пароль']").type(Cypress.env("ADMIN_PASSWORD"));
    cy.get("button.ant-btn-primary").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/dashboard/configs");
    });
  });

});
