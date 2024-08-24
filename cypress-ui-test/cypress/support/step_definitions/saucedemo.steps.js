import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
const users = require("../../fixtures/user.json");
const elementSlectors = require("../../config/selectors.json");

Given("I open the SauceDemo login page", () => {
  cy.visit("https://www.saucedemo.com");
});

When("I login as {string} user", (userType) => {
  const user = users[userType];
  cy.login(user.username, user.password);
});

Then("I should be redirected to the products page", () => {
  cy.url().should("include", "/inventory.html");
  cy.get(".title").should("contain.text", "Products");
});

Then("I should see an error message", () => {
  cy.get(elementSlectors.errorMessage)
    .should("be.visible")
    .and(
      "contain.text",
      "Username and password do not match any user in this service"
    );
});

Then("Verify item sorting in alphabetical order", () => {
  cy.get(elementSlectors.inventoryItem).then(($items) => {
    const itemNames = $items.toArray().map((item) => item.innerText);
    const sortedItemNames = [...itemNames].sort();
    expect(itemNames).to.deep.equal(sortedItemNames);
  });
});

Then("Verify item sorting in reverse alphabetical order", () => {
  cy.get(elementSlectors.productSort).select("Name (Z to A)");
  cy.get(elementSlectors.inventoryItem).then(($items) => {
    const itemNames = $items.toArray().map((item) => item.innerText);
    const sortedItemNames = [...itemNames].sort().reverse();
    expect(itemNames).to.deep.equal(sortedItemNames);
  });
});
