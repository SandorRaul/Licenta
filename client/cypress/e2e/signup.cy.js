describe("SignUp Form Tests", () => {
  beforeEach(() => {
    // Set the viewport size before visiting the page
    cy.viewport(850, 600);
    // Start at the registration page before each test
    cy.visit("http://localhost:3000/register");
  });

  it("allows the user to fill all fields", () => {
    cy.get("input#fname").type("John Doe").should("have.value", "John Doe");
    cy.get("form").screenshot("filled-firstname");

    cy.get("input#email")
      .type("john@example.com")
      .should("have.value", "john@example.com");
    cy.get("form").screenshot("filled-email");

    cy.get("input#mobile")
      .type("1234567890")
      .should("have.value", "1234567890");
    cy.get("form").screenshot("filled-mobile");

    cy.get("input#password")
      .type("password123")
      .should("have.value", "password123");
    cy.get("form").screenshot("filled-password");

    cy.get("input#cpassword")
      .type("password123")
      .should("have.value", "password123");
    cy.get("form").screenshot("filled-cpassword");
  });

  it("checks for valid form submission and handles success response", () => {
    // Fill in the form correctly
    cy.get("input#fname").type("John Doe");
    cy.get("form").screenshot("valid-fname");

    cy.get("input#email").type("john@example.com");
    cy.get("form").screenshot("valid-email");

    cy.get("input#mobile").type("1234567890");
    cy.get("form").screenshot("valid-mobile");

    cy.get("input#password").type("password123");
    cy.get("form").screenshot("valid-password");

    cy.get("input#cpassword").type("password123");
    cy.get("form").screenshot("valid-cpassword");

    // Mock the fetch POST request to return a successful response
    cy.intercept("POST", "register", {
      statusCode: 200,
      body: {
        message: "data successfully added",
      },
    }).as("registerRequest");

    // Click the continue button to submit the form
    cy.get('[data-testid="cypress-button-signup"]').click();
    cy.get("form").screenshot("clicked-signup");

    // Wait for the 'registerRequest' to resolve
    cy.wait("@registerRequest");
    cy.get("form").screenshot("wait-registerRequest");

    // Check for the success toast message
    cy.get(".Toastify__toast--success")
      .should("be.visible")
      .contains("data succesfully added");
    cy.get("form").screenshot("success-toast");

    // Optionally, verify the form reset or redirect
    cy.get("input#fname").should("have.value", "");
    cy.get("form").screenshot("form-reset");
  });

  it("handles errors during form submission", () => {
    // Fill in the form with mismatching passwords
    cy.get("input#fname").type("John Doe");
    cy.get("form").screenshot("error-fname");

    cy.get("input#email").type("john@example.com");
    cy.get("form").screenshot("error-email");

    cy.get("input#mobile").type("1234567890");
    cy.get("form").screenshot("error-mobile");

    cy.get("input#password").type("password123");
    cy.get("form").screenshot("error-password");

    cy.get("input#cpassword").type("password123");
    cy.get("form").screenshot("error-cpassword");

    // Mock the fetch POST request to return an error response
    cy.intercept("POST", "register", {
      statusCode: 422,
      body: {
        message: "invalid details",
      },
    }).as("errorRequest");

    // Click the continue button to submit the form
    cy.get('[data-testid="cypress-button-signup"]').click();
    cy.get("form").screenshot("clicked-signup-error");

    // Wait for the 'errorRequest' to resolve
    cy.wait("@errorRequest");
    cy.get("form").screenshot("wait-errorRequest");
  });
});
