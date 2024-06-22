describe("Login form", () => {
  beforeEach(() => {
    // Visit the login page before each test
    cy.visit("http://localhost:3000/login");
  });

  it("email", () => {
    // Check if the email input is visible
    cy.get('[data-testid="cypress-email"]').should("be.visible");
  });

  it("allows the user to enter a password", () => {
    // Check if the password input is visible
    cy.get("input#password").should("be.visible");

    // Type text into the password input
    cy.get("input#password").type("parola123");
  });

  it("changes the user type and checks for the presence of the key field", () => {
    // Select the 'Admin' user type
    cy.get('input[type="radio"][value="admin"]').click();

    // Check if the key input field is visible
    cy.get("input#key").should("be.visible");
  });
});
