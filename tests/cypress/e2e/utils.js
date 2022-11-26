export const testFormReset = ({config}) => {
  it("Корректный сброс формы", () => {
    cy.contains("Cброс").click();
    cy.contains("OK").click();
    cy.get("#config_name")
      .should("have.value", config.config_name)
      .should("have.text", "")
    cy.get("#service_name")
      .should("have.value", config.service_name)
      .should("have.text", "");
    cy.get(".lines-content").first().should("have.text", config.config_value);
  });
}

export const testConfigsLength = (length) => {
  cy.get(".ant-pagination-total-text").should("have.text", `Всего: ${length}`);
}
