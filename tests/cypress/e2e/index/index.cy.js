/* eslint-disable testing-library/await-async-utils */
/// <reference types="cypress" />
describe('Главная страница', () => {
  beforeEach(() => {
    cy
      .visit('http://localhost:3000/')
  })

  it('Есть яркая кнопка входа', () => {
    cy.get('button.ant-btn-primary').contains('Войти');
    cy.get('button.ant-btn-primary').click().then(() => {
      cy.location().should(loc => {
        expect(loc.pathname).to.eq("/login");
      });

    });
  })

  it('Есть название сервиса', () => {
    cy.get(`h1`).contains("Динамические конфиги userver")
  })
});
