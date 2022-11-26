/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" />
describe("Страница входа", () => {
  beforeEach(() => {
    cy
      .visit("/login")
  })

  it("При ошибке входа нет никакого перехода", async () => {
    await cy.get("input[placeholder='Имя пользователя']").type("error");
    await cy.get("input[placeholder='Пароль']").type("error");
    await cy.get("button.ant-btn-primary").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });
  });

  it("При успешном входе переход в админку", async () => {
    await cy.get("input[placeholder='Имя пользователя']").type(Cypress.env("ADMIN_USERNAME"));
    await cy.get("input[placeholder='Пароль']").type(Cypress.env("ADMIN_PASSWORD"));
    await cy.get("button.ant-btn-primary").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/dashboard/configs");
    });
  });

});
