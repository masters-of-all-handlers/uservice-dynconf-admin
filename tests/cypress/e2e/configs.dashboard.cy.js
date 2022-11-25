describe("Страница списка конфигов", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard/configs");
  })

  it("Переход на создание конфига", () => {
    cy.get("button.ant-btn-primary").click().then(() => {
      cy.location().should(loc => {
        expect(loc.pathname).to.eq("/dashboard/configs/create");
      });
    });
  });

  it("Переход на редактирование конфига со страницы списка", () => {
    cy.get(".ant-dropdown-trigger").first().click().then(() => {
      cy.get(".ant-dropdown-menu-title-content").contains("Редактировать").click().then(() => {
        cy.location().should(loc => {
          expect(loc.pathname).to.match(/^\/dashboard\/configs\/[0-9a-f\-]{36}\/edit$/);
        });
      });
    });
  });

  it("Переход на клонирование конфига со страницы списка", () => {
    cy.get(".ant-dropdown-trigger").first().click().then(() => {
      cy.get(".ant-dropdown-menu-title-content").contains("Клонировать").click().then(() => {
        cy.location().should(loc => {
          expect(loc.pathname).to.match(/^\/dashboard\/configs\/[0-9a-f\-]{36}\/clone$/);
        });
      });
    });
  });

});
