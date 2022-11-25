/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" />
describe("Главная страница", () => {
  beforeEach(() => {
    cy
      .visit("/")
  })

  it("Есть яркая кнопка входа", () => {
    cy.get("button.ant-btn-primary").contains("Войти");
    cy.get("button.ant-btn-primary").click().then(() => {
      cy.location().should(loc => {
        expect(loc.pathname).to.eq("/login");
      });
    });
  });
});
