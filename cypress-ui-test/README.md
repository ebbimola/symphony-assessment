# Cypress Cucumber Framework for SauceDemo

This repository contains a testing framework built with Cypress and Cucumber for end-to-end testing of the SauceDemo website. The framework uses Cypress for browser automation and integrates Cucumber for writing test scenarios in Gherkin syntax.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Running the Tests](#running-the-tests)
- [Writing Tests](#writing-tests)
- [Custom Commands](#custom-commands)
- [Assertions](#assertions)
- [License](#license)

## Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js installed (version 12 or higher).
- npm (Node Package Manager) installed.

## Installation

To set up the project locally, follow these steps:

**Clone the repository**:

   ```bash
   git clone https://github.com/ebbimola/cypress-ui-test.git
   cd cypress-ui-test
```

## Project Structure

**Here is a brief overview of the project structure**:

```bash
cypress
├── config
│   └── selectors.json
├── downloads
├── e2e
│   ├── verify-ascending-order.feature
│   └── verify-descending-order.feature
├── fixtures
│   └── user.json
└── support
    ├── actions
    │   └── login.js
    ├── commands.js
    ├── e2e.js
    ├── index.d.ts
    └── step_definitions
        └── saucedemo.steps.js                        
```
## Configuration
Cypress Configuration
Cypress is configured using the cypress.config.js file. This file sets up the Cucumber preprocessor and specifies the location of the feature files.

```bash
const { defineConfig } = require("cypress");
const preprocessor = require("@badeball/cypress-cucumber-preprocessor");
const browserify = require("@badeball/cypress-cucumber-preprocessor/browserify");

async function setupNodeEvents(on, config) {
  await preprocessor.addCucumberPreprocessorPlugin(on, config);
  on("file:preprocessor", browserify.default(config));
  return on, config;
}

module.exports = defineConfig({
  e2e: {
    // baseUrl: "https://www.saucedemo.com",
    specPattern: "**/*.feature",
    stepDefinitions: "support/[step_definitons]/*.steps.{js}",
    setupNodeEvents,
    pageLoadTimeout: 30000,
    defaultCommandTimeout: 10000,
    video: true,
    chromeWebSecurity: false,
    blockHosts: [
      "events.backtrace.io",
      "events.backtrace.io/api/unique-events/submit",
    ],
  },
});
```

**JSON User Data**
```bash
{
  "standard": {
    "username": "standard_user",
    "password": "secret_sauce"
  }
}
```
## Running the Test

```bash
- Interractive Mode
npx cypress open

- Headless Mode
npx cypress run
```

## Writing Tests
```bash
Feature: SauceDemo Login and Assert Product Alphabetical Order

Note: Verify that the items are sorted by Name ( A -&gt; Z ).

  Scenario: Login successfully with valid credentials
    Given I open the SauceDemo login page
    When I login as "standard" user
    Then I should be redirected to the products page
    Then Verify item sorting in alphabetical order


Feature: SauceDemo Login and Assert Product Reverse Alphabetical Order

Note: Change the sorting to Name ( Z -&gt; A).

  Scenario: Verify Reverse/Descending Order
    Given I open the SauceDemo login page
    When I login as "standard" user
    Then I should be redirected to the products page
    Then Verify item sorting in reverse alphabetical order
```

## Custom Commands
```bash
import { login } from "./actions/login";
Cypress.Commands.add("login", (username, password) => {
  login(username, password);
});
```

## Assertion
```bash
Then("Verify item sorting in alphabetical order", () => {
  cy.get(elementSlectors.inventoryItem).then(($items) => {
    const itemNames = $items.toArray().map((item) => item.innerText);
    const sortedItemNames = [...itemNames].sort();
    expect(itemNames).to.deep.equal(sortedItemNames);
  });
});
```