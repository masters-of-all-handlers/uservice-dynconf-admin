describe("Страница списка конфигов", () => {
  beforeEach(() => {
    cy.login();
    cy.visit("/dashboard/configs");
  })

  it("Переход на создание конфига со страницы списка", () => {
    cy.get("button.ant-btn-primary").click().then(() => {
      cy.location().should(loc => {
        expect(loc.pathname).to.eq("/dashboard/configs/create");
      });
    });
  });
});
