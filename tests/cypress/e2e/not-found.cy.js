/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" />
describe("Страница 404", () => {

  it("Показывается 404 при заходе на несуществующую страницу", () => {
    cy.visit("/this-page-does-not-exist");
    cy.get("p.h4").should("contain.text", "заблудились");
  });

  it("Показывается 404 при заходе в админку без авторизации", () => {
    cy.visit("/dashboard/configs");
    cy.get("p.h4").should("contain.text", "заблудились");
  });

});
