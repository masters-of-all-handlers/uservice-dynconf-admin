/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" />
describe("Главная страница", () => {
  beforeEach(() => {
    cy
      .visit("/")
  })

  it("Переход на вход с главной страницы ", () => {
    cy.get("button.ant-btn-primary").click().then(() => {
      cy.location().should(loc => {
        expect(loc.pathname).to.eq("/login");
      });
    });
  });
});
