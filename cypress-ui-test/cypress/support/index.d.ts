declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to login to the SauceDemo site
     * @example cy.login('standard_user', 'secret_sauce')
     */
    login(username: string, password: string): Chainable<void>;
  }
}
