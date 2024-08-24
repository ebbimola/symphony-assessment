import { login } from "./actions/login";
Cypress.Commands.add("login", (username, password) => {
  login(username, password);
});
