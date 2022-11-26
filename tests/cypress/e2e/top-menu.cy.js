describe("Верхнее меню", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard/configs/create");
  })

  it("Переход на список конфигов", async () => {
    await cy
      .get(".ant-layout-header .ant-menu-title-content")
      .contains("Конфиги")
      .click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/dashboard/configs");
    });
  });

  it("Переход на создание пользователя", async () => {
    await cy
      .get(".ant-layout-header .ant-menu-title-content")
      .contains("Пользователи")
      .click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/dashboard/users/create");
    });
  });

  it("Выход из аккаунта", async () => {
    await cy
      .get(".ant-layout-header .ant-menu-title-content")
      .contains("Выход")
      .click();
    cy.location().should(loc => {
      expect(loc.pathname).to.eq("/");
    });
  });

});
