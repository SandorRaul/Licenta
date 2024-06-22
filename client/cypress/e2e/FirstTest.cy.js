describe("template spec", () => {
  it("passes", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-testid="cypress-comercial"]')
      .should("exist")
      .should("have.text", "Perfect Style");
  });

  it("logo verify", () => {
    cy.visit("http://localhost:3000/");

    cy.get('[data-testid="cypress-logosite"]').should("be.visible");
  });
});
