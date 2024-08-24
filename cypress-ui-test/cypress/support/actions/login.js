const elementSlectors = require("../../config/selectors.json");

export function login(username, password) {
  cy.get(elementSlectors.username).type(username);
  cy.get(elementSlectors.password).type(password);
  cy.get(elementSlectors.loginButton).click();
}
