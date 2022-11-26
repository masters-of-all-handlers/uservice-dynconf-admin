/* eslint-disable testing-library/-async-utils */
/// <reference types="cypress" />
describe("Главная страница", () => {
  beforeEach(() => {
    cy
      .visit("/")
  })

  it("Переход на вход", () => {
    cy.get("button.ant-btn-primary").click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/login");
    });
  });
});
