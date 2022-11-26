/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" />
describe("Главная страница", () => {
  beforeEach(() => {
    cy
      .visit("/")
  })

  it("Переход на вход", async () => {
    await cy.get("button.ant-btn-primary").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });
  });
});
